const admin = require("../db/dbSetup");
const db = admin.firestore();

const stripe = require("stripe")(
  "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"
); // Replace with your Stripe secret key

const mixpanel = require("../trackers/mixpanel");
const reddit = require("../trackers/reddit");
const facebook = require("../trackers/facebook");

// const userCollectionName = "userCollectiontest";
const userCollectionName = "userCollection2";

const dailEmailCount = 5;
const renewCreditsCount = 150;
const priceId = "price_1OO25SJCMgay6huUfBJf0J3U";
const {
  sendEmailIndividually,
  sendEmailIndividuallyByUser,
} = require("./emailSender");

const { handleEmailSending } = require("./emailFunctions");

async function backgroundTask() {
  console.log("Running background task...");
  try {
    const userCollectionRef = db.collection(userCollectionName);
    const today = new Date().toISOString().slice(0, 10); // Format: 'YYYY-MM-DD'
    const snapshot = await userCollectionRef.get();
    console.log("Total Docs:", snapshot.size); // Correctly logs the total number of documents
    if (!snapshot.empty) {
      for (const item of snapshot.docs) {
        const docId = item.id;
        var docData = item.data();
        if (docData.paymentStatus !== "unpaid") {
          if (docData.paymentStatus) {
            const { email, warmupEmails } = docData;
            // console.log(docData);

            // console.log("Warmup Email: ", warmupEmails);
            // console.log(docId);
            if (warmupEmails && warmupEmails.length >= 1) {
              console.log("Warmup Emails more than one start =====");

              for (const warmupEmailItem of warmupEmails) {
                // console.log("Email : ", warmupEmailItem);

                // Ensure that each asynchronous operation completes before proceeding to the next one
                await handleEmailWarmupAndPayment(
                  docId,
                  email,
                  warmupEmailItem
                );
              }
              console.log("Warmup Emails more than one end =====");
            } else {
              console.error(
                `backgroundTasks/backgroundTasks, there is not warmup email on the account : ${email} & docId ${docId}`
              );
            }
          }
        } else {
          console.log("unpaid user : ", docData.email);
        }
      }
    } else {
      console.log(`There is no user in ${userCollectionName}`);
    }
  } catch (error) {
    console.error("backgroundTask/backgroundTask : ", error);
  }
}

async function handleEmailWarmupAndPayment(docId, email, warmupEmailItem) {
  const today = new Date().toISOString().slice(0, 10); // Format: 'YYYY-MM-DD'
  const currentTime = Date.now();

  console.log("handleEmailWarmupAndPayment called", warmupEmailItem.email);
  let newCreditsAvailable;
  try {
    if (warmupEmailItem.creditsAvailable > 0) {
      if (
        warmupEmailItem.warmupStatus === "active" ||
        warmupEmailItem.warmupStatus === "paused"
      ) {
        if (warmupEmailItem.lastWarmup) {
          const { date, count } = warmupEmailItem.lastWarmup;
          // Check if createdAt exists, if not, set it with the current timestamp

          // deliverability...... start
          if (!warmupEmailItem.createdAt) {
            warmupEmailItem.createdAt = currentTime;
          }
          if (!warmupEmailItem.deliverability) {
            warmupEmailItem.deliverability = 20;
          }
          if (!warmupEmailItem.updatedAt) {
            warmupEmailItem.updatedAt = currentTime;
          }

          // Calculate the number of weeks since createdAt and updatedAt
          const weeksSinceCreated = Math.floor(
            (Date.now() - new Date(warmupEmailItem.createdAt).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          );
          const weeksSinceUpdated = Math.floor(
            (Date.now() - new Date(warmupEmailItem.updatedAt).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          );

          if (weeksSinceUpdated >= 1) {
            // Only update if at least a week has passed
            if (weeksSinceCreated <= 4) {
              // For the first four weeks, add 10% each week
              warmupEmailItem.deliverability += 10;
            } else {
              // After the first four weeks, add 3% each week but cap at 73%
              if (warmupEmailItem.deliverability < 73) {
                const potentialDeliverability =
                  warmupEmailItem.deliverability + 3;
                warmupEmailItem.deliverability = Math.min(
                  potentialDeliverability,
                  73
                );
              }
            }
            warmupEmailItem.updatedAt = currentTime; // Update the updatedAt time
          }
          // deliverability...... end

          if (date !== today || (date === today && count < dailEmailCount)) {
            // Warmup Email
            const newLastWarmup = {
              date: today,
              count: date === today ? count + 1 : 1,
            };
            newCreditsAvailable = warmupEmailItem.creditsAvailable - 1;
            if (newCreditsAvailable < 0) {
              newCreditsAvailable = 0;
            }

            warmupEmailItem.lastWarmup = newLastWarmup;
            warmupEmailItem.creditsAvailable = newCreditsAvailable;
            await handleEmailSending(warmupEmailItem.email); // sending emails
            await updateWarmupEmailDetails(docId, warmupEmailItem);
          } else {
            // Don't warmup email as done for today
            console.log(
              `backgroundTasks/handleEmailWarmupAndPayment Daily Warmup limit reached for user : ${email}  warmup email: ${warmupEmailItem.email}`
            );
          }
        } else {
          //
          newCreditsAvailable = warmupEmailItem.creditsAvailable - 1;
          if (newCreditsAvailable < 0) {
            newCreditsAvailable = 0;
          }

          warmupEmailItem.creditsAvailable = newCreditsAvailable;
          warmupEmailItem.lastWarmup = { date: today, count: 1 };

          await updateWarmupEmailDetails(docId, warmupEmailItem);
          await handleEmailSending(warmupEmailItem.email);
        }
        console.log(
          `backgroundTasks/handleEmailWarmupAndPayment Warming Up Email : ${email}  warmup email: ${warmupEmailItem.email}`
        );
      } else if (warmupEmailItem.warmupStatus === "paused") {
      }
    } else {
      console.log(
        `backgroundTasks/handleEmailWarmupAndPayment credits are expired : ${email}  warmup email: ${warmupEmailItem.email}`
      );

      if (
        warmupEmailItem.warmupStatus === "active" ||
        warmupEmailItem.warmupStatus === "paused"
      ) {
        if (
          warmupEmailItem.subscription &&
          warmupEmailItem.subscription.subscriptionId
        ) {
          try {
            const subStatus = await getSubscriptionStatus(
              warmupEmailItem.subscription.subscriptionId
            );
            console.log("Sub : ", subStatus, typeof subStatus);
            if (subStatus === "active") {
              // Renew credits
              console.log(
                `Subscription is [active] renewing credits : Email: ${email} SubEmail: ${warmupEmailItem.email}`
              );

              await updateWarmupEmailDetails(docId, {
                lastWarmup: warmupEmailItem.lastWarmup ?? null,
                email: warmupEmailItem.email,
                creditsAvailable: renewCreditsCount,
                warmupStatus: warmupEmailItem.warmupStatus,
                subscription: warmupEmailItem.subscription ?? null,
              });
            } else if (
              subStatus === "canceled" ||
              subStatus === "incomplete_expired" ||
              subStatus === "unpaid"
            ) {
              // Pause the warmup
              console.log(
                `Subscription is [Canceled - Unpaid - Denied multiple times] Pausing warmup : Email: ${email} SubEmail: ${warmupEmailItem.email}`
              );
              await updateWarmupEmailDetails(docId, {
                lastWarmup: warmupEmailItem.lastWarmup ?? null,
                email: warmupEmailItem.email,
                creditsAvailable: warmupEmailItem.creditsAvailable,
                warmupStatus: "paused",
                subscription: warmupEmailItem.subscription ?? null,
              });
            } else if (subStatus === "invalid") {
              // Reinitate the subscription
              const res = await addNewSubscription_v2(
                email,
                warmupEmailItem.email
              );
              if (
                res &&
                res.subscriptionStatus &&
                res.subscriptionStatus === "active"
              ) {
                await updateWarmupEmailDetails(docId, {
                  lastWarmup: warmupEmailItem.lastWarmup ?? null,
                  email: warmupEmailItem.email,
                  creditsAvailable: renewCreditsCount,
                  warmupStatus: warmupEmailItem.warmupStatus,
                  //  //     subscription: warmupEmailItem.subscription ?? null,
                  subscription: {
                    subscriptionId: res.subscriptionId,
                    subscriptionStatus: res.subscriptionStatus,
                  },
                });
              }
              console.log(
                `Subscription is [invalid] re-initiate subscription: Email: ${email} SubEmail: ${warmupEmailItem.email}`
              );
            } else if (subStatus === "paused") {
              // re-activating subscription
              console.log(
                `Subscription is [paused] re-activating subscription as warmup status is still active ( code not written ): Email: ${email} SubEmail: ${warmupEmailItem.email}`
              );
              await updateWarmupEmailDetails(docId, {
                lastWarmup: warmupEmailItem.lastWarmup ?? null,
                email: warmupEmailItem.email,
                creditsAvailable: warmupEmailItem.creditsAvailable,
                warmupStatus: "paused",
                subscription: warmupEmailItem.subscription ?? null,
              });
            } else {
              console.log(
                `Payment on processing warmup status not changed and credits not renewed : ${email} SubEmail: ${warmupEmailItem.email}`
              );
            }
          } catch (error) {
            console.error(
              "backgroundTasks/handleEmailWarmupAndPayment subscription status Error: ",
              error
            );
          }
        } else {
          // Initate the subscription
          console.log(
            `Initiate subscription: Email: ${email} SubEmail: ${warmupEmailItem.email}`
          );

          const res = await addNewSubscription_v2(email, warmupEmailItem.email);
          if (
            res &&
            res.subscriptionStatus &&
            res.subscriptionStatus === "active"
          ) {
            await updateWarmupEmailDetails(docId, {
              lastWarmup: warmupEmailItem.lastWarmup ?? null,
              email: warmupEmailItem.email,
              creditsAvailable: renewCreditsCount,
              warmupStatus: warmupEmailItem.warmupStatus,
              // subscription: warmupEmailItem.subscription ?? null,
              subscription: {
                subscriptionId: res.subscriptionId,
                subscriptionStatus: res.subscriptionStatus,
              },
            });
          }
        }
      } else if (warmupEmailItem.warmupStatus === "paused") {
        console.log(
          `Warmup status is paused, pausing the subscription ( code not written ) : ${email} SubEmail: ${warmupEmailItem.email}`
        );
      }
    }
  } catch (error) {
    console.error("backgroundTasks/handleEmailWarmupAndPayment", error);
  }
}

async function updateWarmupEmailDetails(docId, warmupEmailNewData) {
  try {
    const usersRef = db.collection(userCollectionName);

    const docRef = usersRef.doc(docId);
    const doc = await docRef.get();
    const docData = doc.data();
    if (doc.exists) {
      // console.log("Document data:", docData);
      var warmupEmailsData = docData.warmupEmails;
      // console.log("Old: ", warmupEmailsData);

      for (let i = 0; i < docData.warmupEmails.length; i++) {
        const warmupEmailItem = docData.warmupEmails[i];

        if (warmupEmailItem.email === warmupEmailNewData.email) {
          console.log("Selected Email Item: ", warmupEmailItem);
          warmupEmailsData[i] = warmupEmailNewData;
          break; // Stop the loop if you only need the first match
        }
      }
      docRef.update({
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        warmupEmails: warmupEmailsData,
      });
      // ;
      // console.log("New: ", warmupEmailsData);
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

async function addNewSubscription_v2(mainEmail, userEmail) {
  const detailsRef = db.collection("stripeUpgradeEmails");
  const priceId = "price_1OO25SJCMgay6huUfBJf0J3U";
  try {
    // Check for upgrade eligibility
    const snapshot = await detailsRef.where("subEmail", "==", userEmail).get();
    if (!snapshot.empty) {
      const currentTime = new Date().getTime();
      for (let doc of snapshot.docs) {
        const data = doc.data();
        const lastUpgradeTime = data.timestamp?.toMillis() ?? null;
        if (
          lastUpgradeTime &&
          currentTime - lastUpgradeTime < 24 * 60 * 60 * 1000
        ) {
          console.log(
            `Less than 24 hours since last upgrade attempt for ${userEmail}.`
          );
          return {
            message: "Upgrade attempt too soon.",
            subscriptionId: null,
            subscriptionStatus: null,
          };
        }
      }
    }

    // Ensure customer exists or create new one
    let { data } = await stripe.customers.list({ email: mainEmail, limit: 1 });
    let customer = data[0];
    if (!customer) {
      customer = await stripe.customers.create({ email: mainEmail });
      console.log(`New customer created with email: ${mainEmail}`);
    }

    // Create subscription
    const paymentMethods =
      await retrievePaymentMethodsForCustomerWithChargesByEmail(mainEmail);
    if (!paymentMethods || paymentMethods.length === 0) {
      throw new Error("No payment methods available for the customer");
    }

    const selectedPaymentMethod = selectThePaymentMethod(paymentMethods);
    if (!selectedPaymentMethod) {
      throw new Error("No suitable payment method found");
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"],
      default_payment_method: selectedPaymentMethod.paymentId,
    });

    await updateSubscriptionStatus(
      mainEmail,
      userEmail,
      subscription.id,
      subscription.status === "active" || subscription.status === "trialing"
        ? "active"
        : "incomplete"
    );
    if (
      subscription.status === "active" ||
      subscription.status === "trialing"
    ) {
      if (process.env.NODE_ENV === "production") {
        mixpanel.track("Charged", {
          distinct_id: mainEmail, // Use email as the unique identifier
          email: mainEmail,
          // cardType: eligiblePaymentMethod.funding,
        });
        mixpanel.track("subscribed", {
          distinct_id: mainEmail, // Use email as the unique identifier
          email: mainEmail,
          // cardType: eligiblePaymentMethod.funding,
        });
        await facebook.sendEventToFacebook("Purchase", mainEmail)
        reddit.redditPixelUpdate("Purchase", mainEmail, "USD", 29);
      }
    }

    console.log(
      `Subscription successfully created for ${userEmail} with status: ${subscription.status}`
    );

    // Log the upgrade attempt
    await detailsRef.add({
      mainEmail: mainEmail,
      subEmail: userEmail,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
    };
  } catch (error) {
    console.error(
      `Failed to create subscription for ${userEmail}: ${error.message}`
    );
    return {
      message: error.message,
      subscriptionId: null,
      subscriptionStatus: null,
    };
  }
}

async function retrievePaymentMethodsForCustomerWithChargesByEmail(email) {
  try {
    // Find customer by email
    const customers = await stripe.customers.list({ email: email });
    if (customers.data.length === 0) {
      return []; // Return empty list if no customer found
    }

    // Assuming the first match is the customer we want
    const customerId = customers.data[0].id;

    // List all payment methods attached to the customer
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
    });

    const results = [];

    // Check if there are any payment methods
    if (paymentMethods.data.length === 0) {
      return results;
    }

    // Loop through each payment method
    for (const paymentMethod of paymentMethods.data) {
      const paymentType = paymentMethod.type;
      const paymentId = paymentMethod.id;
      const cardDetails = paymentMethod.card || {}; // Use or operator to avoid undefined values
      const paymentBrand = cardDetails.brand || "Unknown"; // Provide default if missing
      const lastFour = cardDetails.last4 || "Unknown"; // Provide default if missing
      const funding = cardDetails.funding || "Unknown"; // Provide default if missing

      // List charges specific to each payment method that have succeeded
      const charges = await stripe.charges.list({ customer: customerId });
      const succeededCharges = charges.data.filter(
        (charge) => charge.status === "succeeded"
      );

      // If there are successful charges, get the amount of the last one
      const lastSuccessfulAmount =
        succeededCharges.length > 0 ? succeededCharges[0].amount : null;

      // Always append the payment details; include last successful amount if there was a successful charge
      const paymentInfo = {
        paymentId,
        paymentType,
        paymentBrand,
        lastFour,
        funding,
        lastSuccessfulAmount: lastSuccessfulAmount || 0,
      };

      results.push(paymentInfo);
    }

    return results;
  } catch (error) {
    console.error("Failed to retrieve payment methods:", error);
    return [];
  }
}
function selectThePaymentMethod(paymentMethods) {
  // If the input is an object (not an array), convert it to an array with one element
  console.log("Value : ", typeof paymentMethods);
  if (!Array.isArray(paymentMethods)) {
    if (typeof paymentMethods === "object" && paymentMethods !== null) {
      paymentMethods = [paymentMethods]; // Wrap the object into an array
    } else {
      console.error(
        "Invalid input: paymentMethods is neither an array nor a valid object"
      );
      return null;
    }
  }

  // Log the paymentMethods to check the actual input received
  console.log("Received paymentMethods:", JSON.stringify(paymentMethods));

  // Filter out credit cards and ensure 'funding' key exists and is 'credit'
  const creditCards = paymentMethods.filter((pm) => pm.funding === "credit");

  // If there are credit cards, return the one with the highest lastSuccessfulAmount
  if (creditCards.length > 0) {
    return creditCards.reduce((prev, current) =>
      prev.lastSuccessfulAmount > current.lastSuccessfulAmount ? prev : current
    );
  }

  // If there are no credit cards, filter out debit cards, ensure 'funding' key exists and is 'debit'
  const debitCards = paymentMethods.filter((pm) => pm.funding === "debit");

  // Return the debit card with the highest lastSuccessfulAmount, if there are any
  if (debitCards.length > 0) {
    return debitCards.reduce((prev, current) =>
      prev.lastSuccessfulAmount > current.lastSuccessfulAmount ? prev : current
    );
  }

  // If no suitable credit or debit cards, check for any available payment method
  if (paymentMethods.length > 0) {
    // Fallback to any payment method, prioritized by lastSuccessfulAmount if available
    return paymentMethods.reduce((prev, current) =>
      prev.lastSuccessfulAmount > current.lastSuccessfulAmount ? prev : current
    );
  }

  // Return null if there are no payment methods at all
  return null;
}
async function updateSubscriptionStatus(
  mainEmail,
  warmupEmail,
  subscriptionId,
  subscriptionStatus
) {
  if (!mainEmail || !warmupEmail || !subscriptionId || !subscriptionStatus) {
    console.log(
      "All parameters (mainEmail, warmupEmail, subscriptionId, subscriptionStatus) are required."
    );
    return { status: false, message: "Missing required parameters." };
  }

  const usersRef = db.collection(userCollectionName); // Replace 'userCollection' with the actual name of your user collection
  const snapshot = await usersRef.where("email", "==", mainEmail).get();

  if (snapshot.empty) {
    console.log("No user found with the main email provided.");
    return { status: false, message: "No user found." };
  }

  const userDoc = snapshot.docs[0];
  const warmupEmails = [...userDoc.data().warmupEmails]; // Copy the warmupEmails array

  const foundIndex = warmupEmails.findIndex(
    (item) => item.email === warmupEmail
  );
  if (foundIndex === -1) {
    console.log("Warmup email not found in the user's warmupEmails array.");
    return { status: false, message: "Warmup email not found." };
  }

  // Update or add subscription details
  warmupEmails[foundIndex].subscription = {
    subscriptionId: subscriptionId,
    subscriptionStatus: subscriptionStatus,
  };

  // Prepare the update object for Firestore
  const updateObject = {
    warmupEmails: warmupEmails,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(), // Update the updatedAt timestamp
  };

  await userDoc.ref.update(updateObject);
  console.log("Subscription updated successfully for the specified email.");
  return { status: true, message: "Subscription updated successfully." };
}

async function getSubscriptionStatus(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log("Subscription Status:", subscription.status);
    return subscription.status;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    // Check if the error code indicates that the subscription was not found
    if (error.code === "resource_missing") {
      // console.log("Subscription Status: invalid");
      return "invalid"; // Return "invalid" if the subscription does not exist
    }
    return null; // Return null for other types of errors
  }
}

// Example usage
// const subscriptionId = "sub_1PLwZqJCMgay6huUCZBaSN8Jxxx"; // Replace with your actual subscription ID
// getSubscriptionStatus(subscriptionId);

// backgroundTask();

// (async function () {
// await handleEmailSending("bishalbiswas.work@gmail.com");
// await updateSubscriptionStatus(
//   "bishalbiswas.work@gmail.com",
//   "bishalbiswas.work@gmail.com",
//   "asdf",
//   "active"
// );
// })();
module.exports = { backgroundTask, addNewSubscription_v2 };
