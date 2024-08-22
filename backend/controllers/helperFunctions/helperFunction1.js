const admin = require("../../db/dbSetup");
const db = admin.firestore();
const dbRealtime = admin.database();

const path = require("path");
const fs = require("fs");
const rollbar = require("../../trackers/rollbar");
const axios = require("axios");
const qs = require("querystring");

// const { addNewWarmUpEmailFunction } = require("../authController");


const mixpanel = require("../../trackers/mixpanel");
const facebook = require("../../trackers/facebook")
// Assuming 'db' is your Firestore database instance
const userCollectionName = "userCollection2";
// const userCollectionName = "userCollectiontest";
const reddit = require("../../trackers/reddit");
const schemaPath = path.resolve(__dirname, "../../db/schema/user.json");
const newUserCredits = 20; // Default credits for new users

const stripe = require("stripe")(
  "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"
); // Replace with your Stripe secret key

const checkAndUpdateUserStripePaymentStatus = async (email) => {
  // await processEmailsAdding(email)
  try {
    const stripePaymentCollection = db.collection("stripePaymentStatus");
    const snapshot = await stripePaymentCollection
      .where("email", "==", email)
      .get();
    const sanitizedEmail = sanitizeEmail(email);
    const userRefRealttime = dbRealtime.ref(`Users/${sanitizedEmail}`);

    if (snapshot.empty) {
      const paymentMethods =
        await retrievePaymentMethodsForCustomerWithChargesByEmail(email);

      const creditPaymentMethod = paymentMethods.find(
        (method) => method.funding === "credit"
      );

      if (creditPaymentMethod) {
        await stripePaymentCollection.add({
          email: email,
          paymentDetails: creditPaymentMethod,
          status: true,
        });
        await userRefRealttime.update({
          paymentDetails: {
            // cardType: cardType,
            status: true,
          },
        });
        console.log("Document created with credit payment method");
        if (process.env.NODE_ENV === "production") {
          mixpanel.track("UserType_1", {
            distinct_id: email, // Use email as the unique identifier
            email: email,
            // cardType: "credit",
          });
          await facebook.sendEventToFacebook("UserType_1", email)
          reddit.redditCustomPixelUpdate("UserType_1", email, "USD", 0);
        }
        // Adding emails using hunter
        console.log("Function Call");
        await processEmailsAdding(email);
      } else {
        let paymentSuccess = false;
        const eligiblePaymentMethod = paymentMethods.find(
          (method) => method.lastSuccessfulAmount >= 10
        );

        if (eligiblePaymentMethod) {
          await stripePaymentCollection.add({
            email: email,
            paymentDetails: eligiblePaymentMethod,
            status: true,
          });
          console.log("Document created with eligible payment method");
          paymentSuccess = true;

          if (process.env.NODE_ENV === "production") {
            mixpanel.track("UserType_1", {
              distinct_id: email, // Use email as the unique identifier
              email: email,
              // cardType: eligiblePaymentMethod.funding,
              // cardType:"Not-credit"
            });
            await facebook.sendEventToFacebook("UserType_1", email)

            reddit.redditCustomPixelUpdate("UserType_1", email, "USD", 0);
          }
          // Adding emails using hunter
          await processEmailsAdding(email);
        } else {
          for (let method of paymentMethods) {
            const chargeResult = await chargeCustomer(email, method.paymentId);
            if (chargeResult.success) {
              await stripePaymentCollection.add({
                email: email,
                paymentDetails: method,
                status: true,
              });

              await userRefRealttime.update({
                paymentDetails: {
                  // cardType: method.funding,
                  status: true,
                },
              });
              if (process.env.NODE_ENV === "production") {
                mixpanel.track("UserType_1", {
                  distinct_id: email, // Use email as the unique identifier
                  email: email,
                  // cardType: eligiblePaymentMethod.funding,
                });
                await facebook.sendEventToFacebook("UserType_1", email)

                reddit.redditCustomPixelUpdate("UserType_1", email, "USD", 0);
              }
              // Adding emails using hunter
              await processEmailsAdding(email);
              console.log("Document created with charged payment method");
              paymentSuccess = true;
              break;
            }
          }
        }

        if (!paymentSuccess) {
          await stripePaymentCollection.add({
            email: email,
            paymentDetails: null,
            status: false,
          });

          await userRefRealttime.update({
            paymentDetails: {
              // cardType: cardType,
              status: false,
            },
          });
          if (process.env.NODE_ENV === "production") {
            mixpanel.track("Card_Failed", {
              distinct_id: email, // Use email as the unique identifier
              email: email,
              // cardType: eligiblePaymentMethod.funding,
            });
          }

          console.log("User does not have valid payment details");
        }
      }
    } else {
      const userDoc = snapshot.docs[0];
      const paymentMethods =
        await retrievePaymentMethodsForCustomerWithChargesByEmail(email);
      const creditPaymentMethod = paymentMethods.find(
        (method) => method.funding === "credit"
      );

      if (creditPaymentMethod) {
        await userDoc.ref.update({
          paymentDetails: creditPaymentMethod,
          status: true,
        });
        await userRefRealttime.update({
          paymentDetails: {
            // cardType: cardType,
            status: true,
          },
        });
        console.log("Document updated with credit payment method");
      } else {
        let paymentSuccess = false;
        const eligiblePaymentMethod = paymentMethods.find(
          (method) => method.lastSuccessfulAmount >= 10
        );

        if (eligiblePaymentMethod) {
          await userDoc.ref.update({
            paymentDetails: eligiblePaymentMethod,
            status: true,
          });
          await userRefRealttime.update({
            paymentDetails: {
              // cardType: cardType,
              status: true,
            },
          });
          console.log("Document updated with eligible payment method");
          paymentSuccess = true;
        } else {
          for (let method of paymentMethods) {
            const chargeResult = await chargeCustomer(email, method.paymentId);
            if (chargeResult.success) {
              await userDoc.ref.update({
                paymentDetails: method,
                status: true,
              });
              await userRefRealttime.update({
                paymentDetails: {
                  // cardType: cardType,
                  status: true,
                },
              });
              console.log("Document updated with charged payment method");
              paymentSuccess = true;
              break;
            }
          }
        }

        if (!paymentSuccess) {
          await userDoc.ref.update({
            paymentDetails: null,
            status: false,
          });
          await userRefRealttime.update({
            paymentDetails: {
              // cardType: cardType,
              status: false,
            },
          });
          console.log("User does not have valid payment details");
        }
      }
    }
  } catch (error) {
    console.error(
      "helperFunction/checkAndUpdateUserStripePaymentStatus : ",
      error
    );
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "helperFunction/checkAndUpdateUserStripePaymentStatus : " + error
      );
    }
  }
};

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
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "helperFunction/checkAndUpdateUserStripePaymentStatus : " + error
      );
    }
    return [];
  }
}

async function chargeCustomer(email, paymentId) {
  try {
    let { data } = await stripe.customers.list({ email: email, limit: 1 });
    let customer = data[0];
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50, // Amount in cents (50 cents)
      currency: "usd",
      payment_method: paymentId,
      customer: customer.id,
      off_session: true,
      confirm: true,
      description: "One-time test charge for 0.5 USD",
    });

    // Check if the payment was successful
    if (paymentIntent.status === "succeeded") {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Payment failed:", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("helperFunction/chargeCustomer : " + error);
    }
    return { success: false };
  }
}

function sanitizeEmail(email) {
  return email.replace(/[.#$[\]]/g, (char) => {
    switch (char) {
      case ".":
        return ",";
      case "#":
        return "-";
      case "$":
        return "+";
      case "[":
        return "(";
      case "]":
        return ")";
      default:
        return char;
    }
  });
}

async function getCustomerSubscriptionsByEmail(customerEmail) {
  try {
    // Fetch the customer using their email
    const userCollection = db.collection(userCollectionName);
    const snapshot = await userCollection
      .where("email", "==", customerEmail.toLowerCase())
      .get();

    if (snapshot.empty) {
      console.log("User does not exist in database");
      return { status: false }; // Return status when user is not found in database
    } else {
      console.log("User exists in database");

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();
      // console.log(userData);
      if (userData.paymentStatus && userData.paymentStatus !== "unpaid") {
        return { status: true }; // Return status when user payment status is valid
      } else {
        const customers = await stripe.customers.list({
          email: customerEmail,
          limit: 1,
        });

        if (customers.data.length === 0) {
          console.log("Customer not found");
          return { status: false }; // Return status when Stripe customer is not found
        }

        const userPaymentStatus = await customerPaymentStatus(
          customers.data[0].id
        );
        if (userPaymentStatus) {
          console.log("Updating the payment status...", userPaymentStatus);
          if (userPaymentStatus.paymentStatus !== "unpaid") {
            await userDoc.ref.update({
              paymentStatus: userPaymentStatus.paymentStatus,
            });
            return { status: true }; // Return status when payment status is updated and valid
          } else {
            return { status: false }; // Return status when payment status is updated but unpaid
          }
        } else {
          return { status: false }; // Return status when userPaymentStatus is falsy
        }
      }
    }
  } catch (error) {
    console.error("helperFunction1/getCustomerSubscriptionsByEmail:", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "helperFunction/getCustomerSubscriptionsByEmail : " + error,
        req
      );
    }
    return { status: false }; // Return status in case of error
  }
}

async function customerPaymentStatus(customerId) {
  let result = {
    paymentStatus: "unpaid", // Default status
    status: false,
    message: "",
  };

  try {
    if (!customerId || typeof customerId !== "string") {
      result.message = "Invalid customer ID";
      return result;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Fetching subscriptions for the customer
    const response = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
    });

    if (response.data.length === 0) {
      result.message = "Customer does not have any subscriptions.";
      result.paymentStatus = "unpaid";
      return result;
    }

    // Check for past_due subscriptions and consider them as unpaid
    if (response.data.some((sub) => sub.status === "past_due")) {
      result.message = "Customer has past due subscriptions.";
      result.paymentStatus = "unpaid";
      return result;
    }

    // Filter subscriptions that are either active or trialing
    const relevantSubscriptions = response.data.filter((sub) =>
      ["active", "trialing"].includes(sub.status)
    );

    if (relevantSubscriptions.length > 0) {
      const hasPaidSubscription = relevantSubscriptions.some((sub) =>
        sub.items.data.some((item) => item.price.unit_amount > 0)
      );

      if (hasPaidSubscription) {
        // Customer is considered paid if they have at least one subscription with a non-zero amount
        result.paymentStatus = "paid";
        result.status = true;
        result.message = "Customer is subscribed with a paid plan.";
      } else {
        // Customer has zero-dollar subscriptions
        result.paymentStatus = "trial";
        result.status = true;
        result.message = "Customer is on a trial or zero-dollar plan.";
      }
    } else {
      // No active or trialing subscriptions found
      result.message =
        "Customer does not have active or trialing subscriptions.";
    }
  } catch (error) {
    console.error("Error checking customer subscription status:", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("helperFunction/customerPaymentStatus : " + error);
    }
    result.message = "An error occurred while determining subscription status.";
  }

  return result;
}

async function getEmailsFromHunder(email) {
  // Function to extract domain from email
  function extractDomain(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "";
    }
    return email.split("@")[1];
  }

  const domain = extractDomain(email);
  if (!domain) {
    return [];
  }

  const apiKey = process.env.HUNTER_API_KEY;
  const url = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    // Extract emails from the response data
    const emails = response.data.data.emails.map((item) => item.value);

    // Return the list of email addresses
    return emails;
  } catch (error) {
    console.error(
      "Error fetching emails:",
      error.response ? error.response.data : error.message
    );
    if (process.env.NODE_ENV === "production") {
      rollbar.error("helperFunction/getEmailsFromHunder : " + error);
    }
    return [];
  }
}
async function processEmailsAdding(email) {
  try {
    const emailList = await getEmailsFromHunder(email);
    mixpanel.track("Hunter_Provided_Emails", {
      distinct_id: email, // Use email as the unique identifier
      email: email,
      emailCount: emailList.length,
    });
    console.log("Emails: ", emailList)
    for (const singleEmail of emailList) {
      await addNewWarmUpEmailFunction(email, singleEmail);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      rollbar.error("helperFunction/processEmailsAdding : " + error);
    }
    console.error("Error processing emails:", error);
  }
}
async function addNewWarmUpEmailFunction(mainEmail, newWarmupEmails) {
  try {
    let schemaTemplate = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
    const warmupEmailSchema =
      schemaTemplate.properties.warmupEmails.items.properties;

    // Ensure newWarmupEmails is an array
    newWarmupEmails = Array.isArray(newWarmupEmails)
      ? newWarmupEmails
      : [newWarmupEmails];

    // Find the user by their main email
    const usersRef = db.collection(userCollectionName);
    const snapshot = await usersRef.where("email", "==", mainEmail).get();
    const currentTime = Date.now();

    if (snapshot.empty) {
      console.log("No existing user found.");
      return { status: false, message: "User not found" };
    } else {
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();

      // Check which newWarmupEmails already exist in warmupEmails
      const existingEmails = userData.warmupEmails || [];
      const duplicateEmails = newWarmupEmails.filter((email) =>
        existingEmails.some((emailObj) => emailObj.email === email)
      );

      if (duplicateEmails.length > 0) {
        console.log("Some warmup emails already exist:", duplicateEmails);
      }

      // Filter out duplicate emails from the newWarmupEmails
      const emailsToAdd = newWarmupEmails.filter(
        (email) => !duplicateEmails.includes(email)
      );

      if (emailsToAdd.length > 0) {
        // Prepare the new warmup email objects
        const newWarmupEmailObjs = emailsToAdd.map((email) => ({
          email: email,
          lastWarmup: warmupEmailSchema.lastWarmup.default || null,
          warmupStatus: warmupEmailSchema.warmupStatus.default || null,
          creditsAvailable: newUserCredits, // Assuming it's always set to newUserCredits as per schema
          deliverability: 20,
          createdAt: currentTime, // Set the creation timestamp
        }));

        // Add the new warmup emails to the existing array
        userData.warmupEmails.push(...newWarmupEmailObjs);

        // Update the document
        await userDoc.ref.update(userData);
        console.log("Warmup emails added successfully.");
        return {
          status: true,
          message: `Warmup emails added successfully: ${emailsToAdd.join(
            ", "
          )}`,
        };
      } else {
        return {
          status: false,
          message: `All provided warmup emails already exist: ${duplicateEmails.join(
            ", "
          )}`,
        };
      }
    }
  } catch (error) {
    console.error("authController/addNewWarmUpEmail : ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("authController/addNewWarmUpEmail : " + error);
    }
    return {
      status: false,
      message: "Internal Server Error. Please try again later.",
    };
  }
};
// Example usage
// checkStripePaymentStatus("user@example.com").then((status) =>
//   console.log(status)
// );

// retrievePaymentMethodsForCustomerWithChargesByEmail(
//   "Daniyaldehlehff@gmail.com"
// ).then((status) => console.log(status));
// getCustomerSubscriptionsByEmail("bishalbiswas.work@gmail.com").then((status) =>
//   console.log(status)
// );

// checkAndUpdateUserStripePaymentStatus("Daniyaldehleh@gmail.com").then(
//   (status) => console.log(status)
// );

// chargeCustomer("Daniyaldehleh@gmail.com", "pm_1NufxBJCMgay6huUBK1sQOhz").then(
//   (status) => console.log(status)
// );
async function main() {
  // checkAndUpdateUserStripePaymentStatus("gsessa@bladeair.com");
  // const email = "bishalbiswas.work@gmail.com";
  // mixpanel.track("Hunter_Provided_Emails", {
  //   distinct_id: email, // Use email as the unique identifier
  //   email: email,
  //   emailCount: 5,
  // });
  // await addNewWarmUpEmailFunction("daniyal@betimeful.com", "bishalbiswas.work@gmail.com");
  // autot : sameerrtf2@gmail.com, asi@liran.co.il, santosh@breal.ai, jenny@wqwf.org, m@mymousecard.io

  // 'stevie@wqwf.org',
  //   'liz@wqwf.org',
  //   'info@wqwf.org',
  //   'volunteers@wqwf.org',
  //   'wqwalumnicouncil@wqwf.org',
  //   'ellis@wqwf.org'

  // email : liam@data.vizio.ai
  // await processEmailsAdding("m@mymousecard.io");
  // await addNewWarmUpEmailFunction("m@mymousecard.io", "m@mymousecard.io");
}
// main();
module.exports = {
  checkAndUpdateUserStripePaymentStatus,
  getCustomerSubscriptionsByEmail,
};
