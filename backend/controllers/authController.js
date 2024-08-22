const admin = require("../db/dbSetup");
const db = admin.firestore();
const path = require("path");
const fs = require("fs");
const mixpanel = require("../trackers/mixpanel");
const dns = require("dns");
const axios = require("axios");
const qs = require("querystring");
const Imap = require("imap");
const nodemailer = require("nodemailer");
// Import Components

const rollbar = require("../trackers/rollbar");
const {
  checkAndUpdateUserStripePaymentStatus,
  getCustomerSubscriptionsByEmail,
} = require("./helperFunctions/helperFunction1");
const helperFunctionAdditionalEmails = require("./helperFunctions/helperFunctionAdditionalEmails");

// const userCollectionName = "userCollectiontest";
const userCollectionName = "userCollection2";

const schemaPath = path.resolve(__dirname, "../db/schema/user.json");
const newUserCredits = 20; // Default credits for new users
const OauthFunctions = require("./OauthFunctions/OauthFunctions");
const emailSetupCollectionName = "emailSetupDetails";

const stripe = require("stripe")(
  "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"
); // Replace with your Stripe secret key

const getUserLogin = async (req, res) => {
  try {
    console.log("Login");
    const { email } = req.body;

    // Check if user exists in Firebase
    const userCollection = db.collection(userCollectionName);
    const snapshot = await userCollection.where("email", "==", email).get();

    if (snapshot.empty) {
      console.log("User does not exist in database");

      res.status(200).send({ status: false, message: "User Not Found" });
    } else {
      // Check the payment details

      checkAndUpdateUserStripePaymentStatus(email);
      const response = await getCustomerSubscriptionsByEmail(email);
      if (response.status) {
        res.status(200).send({
          status: true,
          message: "User Found",
        });
      } else {
        res.status(200).send({
          status: false,
          message: "User Found",
        });
      }
    }
  } catch (error) {
    console.error("authController/getUserLogin : ", error);

    if (process.env.NODE_ENV === "production") {
      rollbar.error("authController/getUserLogin : " + err, req);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { email } = req.body;
    let schemaTemplate = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
    const currentTime = Date.now();
    let userData = {};

    for (const key in schemaTemplate.properties) {
      if (
        schemaTemplate.properties[key].type === "array" &&
        key === "warmupEmails"
      ) {
        // Special handling for `warmupEmails`
        userData[key] = [
          {
            email: email, // Set the email from the provided email
            lastWarmup:
              schemaTemplate.properties[key].items.properties.lastWarmup
                .default || null,
            warmupStatus:
              schemaTemplate.properties[key].items.properties.warmupStatus
                .default || null,
            creditsAvailable: newUserCredits,
            createdAt: currentTime,
            deliverability: 20,
          },
        ];
      } else if (key === "createdAt" || key === "updatedAt") {
        // Use server timestamp for creation and update times
        userData[key] = admin.firestore.FieldValue.serverTimestamp();
      } else {
        // Use default values from the schema or null if not specified
        userData[key] = schemaTemplate.properties[key].default || null;
      }
    }
    userData.email = email; // Ensure the email is set to the provided userEmail
    userData.creditsAvailable = newUserCredits; // Set `creditsAvailable` to 100 by default for new users

    const usersRef = db.collection(userCollectionName);
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      // No existing user found, create a new user
      const newUserRef = await usersRef.add(userData);

      if (process.env.NODE_ENV === "production") {
        mixpanel.track("Entered_Email_Address", {
          distinct_id: email, // Use email as the unique identifier
          email: email,
        });
      }

      console.log(`New user created with ID: ${newUserRef.id}`);
      res
        .status(200)
        .send({ status: true, userExists: false, userId: newUserRef.id }); // Return success status and new user ID
    } else {
      // User already exists
      const userId = snapshot.docs[0].id; // Assuming the first document is the existing user
      console.log("User already exists.");

      res.status(200).send({ status: false, userExists: true, userId: userId }); // Return existing user status and ID
    }
  } catch (error) {
    console.error("authController/createNewUser : ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("authController/createNewUser : " + err, req);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const addNewWarmUpEmail = async (req, res) => {
  try {
    const { mainEmail, newWarmupEmail } = req.body;

    let schemaTemplate = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
    const warmupEmailSchema =
      schemaTemplate.properties.warmupEmails.items.properties;

    // Ensure newWarmupEmail is an array
    const newWarmupEmails = Array.isArray(newWarmupEmail)
      ? newWarmupEmail
      : [newWarmupEmail];

    // Find the user by their main email
    // const usersRef = db.collection("userCollectiontest");
    const usersRef = db.collection(userCollectionName);
    const snapshot = await usersRef.where("email", "==", mainEmail).get();
    const currentTime = Date.now();

    if (snapshot.empty) {
      console.log("No existing user found.");
      res.status(200).send({ status: false, message: "User not found" });
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
          creditsAvailable: newUserCredits, // Assuming it's always set to 100 as per schema
          deliverability: 20,
          createdAt: currentTime, // Set the creation timestamp
        }));

        // Add the new warmup emails to the existing array
        userData.warmupEmails.push(...newWarmupEmailObjs);

        // Update the document
        await userDoc.ref.update(userData);
        console.log("Warmup emails added successfully.");
        res.status(200).send({
          status: true,
          message: `Warmup emails added successfully: ${emailsToAdd.join(
            ", "
          )}`,
        });
      } else {
        res.status(200).send({
          status: false,
          message: `All provided warmup emails already exist: ${duplicateEmails.join(
            ", "
          )}`,
        });
      }
    }
  } catch (error) {
    console.error("authController/addNewWarmUpEmail : ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("authController/addNewWarmUpEmail : " + err, req);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const removeWarmUpEmail = async (req, res) => {
  try {
    const { mainEmail, warmupEmailToRemove } = req.body;

    // Find the user by their main email
    const usersRef = db.collection(userCollectionName);
    // const usersRef = db.collection("userCollectiontest");

    const snapshot = await usersRef.where("email", "==", mainEmail).get();
    const currentTime = Date.now();

    if (snapshot.empty) {
      console.log("No existing user found.");
      res.status(200).send({ status: false, message: "User not found" });
    } else {
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();

      // Check if warmupEmailToRemove exists in warmupEmails
      const existingEmails = userData.warmupEmails || [];
      const emailIndex = existingEmails.findIndex(
        (emailObj) => emailObj.email === warmupEmailToRemove
      );

      if (emailIndex === -1) {
        console.log("Warmup email not found.");
        res
          .status(200)
          .send({ status: false, message: "Warmup email not found" });
      } else {
        // Remove the warmup email from the array
        userData.warmupEmails.splice(emailIndex, 1);

        // Update the document
        await userDoc.ref.update(userData);
        console.log("Warmup email removed successfully.");
        res
          .status(200)
          .send({ status: true, message: "Warmup email removed successfully" });
      }
    }
  } catch (error) {
    console.error("authController/removeWarmUpEmail : ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("authController/removeWarmUpEmail : " + err, req);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const redirectToGoogleAuth = async (req, res) => {
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` +
    `response_type=code&` +
    `scope=email profile  https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.send&` +
    `access_type=offline&` +
    `include_granted_scopes=true&` +
    `state=${generateRandomString(16)}`; // Function to generate a random string for state parameter

  res.redirect(url);
};

const redirectToGooglNylaseAuth = async (req, res) => {
  //
  var redirect_uri;
  if (process.env.NODE_ENV === "production") {
    redirect_uri = `https://${process.env.APP_BASE_URL}/${process.env.GOOGLE_NYLAS_REDIRECT_URI_PATH}`;
  } else {
    redirect_uri = `http://localhost:5001/${process.env.GOOGLE_NYLAS_REDIRECT_URI_PATH}`;
  }

  const url =
    `https://api.eu.nylas.com/v3/connect/auth?` +
    `client_id=${process.env.NYLAS_CLIENT_ID}&` +
    `redirect_uri=${redirect_uri}&` +
    `response_type=code&` +
    // `scope=email profile  https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.send&` +
    `access_type=offline&` +
    `provider=google&` +
    `state=${generateRandomString(16)}`; // Function to generate a random string for state parameter

  res.redirect(url);
};
const redirectToMicrosoftAuth = async (req, res) => {
  var redirect_uri;
  if (process.env.NODE_ENV === "production") {
    redirect_uri = `https://${process.env.APP_BASE_URL}/${process.env.MICROSOFT_REDIRECT_URI_PATH}`;
  } else {
    redirect_uri = `http://localhost:5001/${process.env.MICROSOFT_REDIRECT_URI_PATH}`;
  }
  const url =
    `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
    `client_id=${process.env.MICROSOFT_CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${redirect_uri}&` +
    `response_mode=query&` +
    `scope=user.read mail.send Mail.ReadWrite Mail.ReadWrite.Shared offline_access&` + // Updated scope with additional permissions
    `state=${generateRandomString(16)}`;

  res.redirect(url);
};

const redirectToMicrosoftAuthLogin = async (req, res) => {
  var redirect_uri;

  if (process.env.NODE_ENV === "production") {
    redirect_uri = `https://${process.env.APP_BASE_URL}/${process.env.MICROSOFT_REDIRECT_URI_LOGIN_PATH}`;
  } else {
    redirect_uri = `http://localhost:5001/${process.env.MICROSOFT_REDIRECT_URI_LOGIN_PATH}`;
  }
  const url =
    `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
    `client_id=${process.env.MICROSOFT_CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${redirect_uri}&` +
    `response_mode=query&` +
    `scope=User.Read&` + // Scope limited to basic user profile access
    `state=${generateRandomString(16)}`;

  res.redirect(url);
};
const redirectToMicrosoftAuthLogout = async (req, res) => {
  // var redirect_uri;

  // if (process.env.NODE_ENV === "production") {
  //   redirect_uri = process.env.MICROSOFT_REDIRECT_URI_LOGIN;
  // } else {
  //   redirect_uri = process.env.MICROSOFT_REDIRECT_URI_LOGIN_LOCAL;
  // }

  var redirect_uri;

  if (process.env.NODE_ENV === "production") {
    redirect_uri = `https://${process.env.APP_BASE_URL}/${process.env.MICROSOFT_REDIRECT_URI_LOGIN_PATH}`;
  } else {
    redirect_uri = `http://localhost:5001/${process.env.MICROSOFT_REDIRECT_URI_LOGIN_PATH}`;
  }
  const logoutUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${redirect_uri}&client_id=${process.env.CLIENT_ID}`;

  // Redirect the user to the logout URL
  res.redirect(logoutUrl);
};

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// Function to handle the OAuth callback
async function handleGoogleOAuthCallback(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Error: No code received");
  }

  try {
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Store the tokens securely, for example in a session or database
    // console.log("Access Token:", data);
    if (response.data.access_token) {
      console.log("We got access token for a user");
    }
    if (response.data.refresh_token) {
      console.log("We got refresh token for a user");
    }
    // console.log("Access Token:", data.access_token);
    // console.log("Refresh Token:", data.refresh_token);
    const userinfo = await OauthFunctions.getGmailProfileInfo(
      data.access_token
    );
    const firebaseRes = await storeEmailSetupDetails_v2(
      userinfo.email,
      "",
      userinfo.name,
      "smtp.gmail.com",
      "",
      data.access_token,
      data.refresh_token,
      data.expires_in
    );
    if (process.env.NODE_ENV === "production") {
      mixpanel.track("Connected_Gmail", {
        distinct_id: userinfo.email, // Use email as the unique identifier
        email: userinfo.email,
        // cardType: eligiblePaymentMethod.funding,
      });
    }
    // res.send(
    //   `Authentication successful! You can close this window. Refresh Token`
    // );
    // res.redirect(
    //   `https://automatedemailwarmup.com/email-onboard?status=failed&email=${encodeURIComponent(
    //     userinfo.email
    //   )}&provider=google`
    // );
    // res.redirect(
    //   `http://localhost:3000/email-onboard?status=success&email=${encodeURIComponent(
    //     userinfo.email
    //   )}&provider=google`
    // );
    if (process.env.NODE_ENV === "production") {
      res.redirect(
        `https://${process.env.APP_BASE_URL
        }/email-onboard?status=success&email=${encodeURIComponent(
          userinfo.email
        )}&provider=google`
      );
    } else {
      res.redirect(
        `http://localhost:3000/email-onboard?status=success&email=${encodeURIComponent(
          userinfo.email
        )}&provider=google`
      );
    }
    // res.redirect(
    //   `https://automatedemailwarmup.com/email-onboard?status=success&email=${encodeURIComponent(
    //     userinfo.email
    //   )}&provider=google`
    // );
  } catch (error) {
    console.error("Failed to exchange token:", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("authController/handleGoogleOAuthCallback : " + err, req);
    }
    res.status(500).send("Authentication failed");
  }
}
async function handleGoogleNylasOAuthCallback(req, res) {
  const { code } = req.query;

  var redirect_uri;
  if (process.env.NODE_ENV === "production") {
    redirect_uri = `https://${process.env.APP_BASE_URL}/${process.env.GOOGLE_NYLAS_REDIRECT_URI_PATH}`;
  } else {
    redirect_uri = `http://localhost:5001/${process.env.GOOGLE_NYLAS_REDIRECT_URI_PATH}`;
  }

  if (!code) {
    return res.status(400).send("Error: No code received");
  }
  // console.log("ClientID: ", process.env.NYLAS_CLIENT_ID);
  console.log("Code: ", code);
  try {
    const { data } = await axios.post(
      "https://api.eu.nylas.com/v3/connect/token",
      new URLSearchParams({
        code: code,
        client_id: process.env.NYLAS_CLIENT_ID,
        client_secret: process.env.NYLAS_API_KEY,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
        // code_verifier: "nylas",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(data);

    // Store the tokens securely, for example in a session or database
    // console.log("Access Token:", data);
    if (data.access_token) {
      console.log("We got access token for a user");
    }
    if (data.refresh_token) {
      console.log("We got refresh token for a user");
    }
    console.log("Access Token:", data.access_token);
    console.log("Refresh Token:", data.refresh_token);
    // const userinfo = await OauthFunctions.getGmailProfileInfo(
    //   data.access_token
    // );
    const firebaseRes = await storeEmailSetupDetails_v2(
      data.email,
      "",
      "",
      "smtp.nylas_gmail.com",
      data.grant_id,
      data.access_token,
      data.refresh_token,
      data.expires_in
    );
    if (process.env.NODE_ENV === "production") {
      mixpanel.track("Connected_Gmail", {
        distinct_id: data.email, // Use email as the unique identifier
        email: data.email,
        // cardType: eligiblePaymentMethod.funding,
      });
    }
    // res.send(
    //   `Authentication successful! You can close this window. Refresh Token`
    // );

    if (process.env.NODE_ENV === "production") {
      res.redirect(
        `https://${process.env.APP_BASE_URL
        }/email-onboard?status=success&email=${encodeURIComponent(
          data.email
        )}&provider=google`
      );
    } else {
      res.redirect(
        `http://localhost:3000/email-onboard?status=success&email=${encodeURIComponent(
          data.email
        )}&provider=google`
      );
    }
  } catch (error) {
    console.error("Failed to exchange token:", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "authController/handleGoogleNylasOAuthCallback : " + err,
        req
      );
    }
    res.status(500).send("Authentication failed");
  }
}

async function handleMicrosoftOAuthCallback(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Error: No code received");
  }

  var redirect_uri;

  if (process.env.NODE_ENV === "production") {
    redirect_uri = `https://${process.env.APP_BASE_URL}/${process.env.MICROSOFT_REDIRECT_URI_PATH}`;
  } else {
    redirect_uri = `http://localhost:5001/${process.env.MICROSOFT_REDIRECT_URI_PATH}`;
  }

  const requestBody = qs.stringify({
    code,
    client_id: process.env.MICROSOFT_CLIENT_ID,
    client_secret: process.env.MICROSOFT_CLIENT_SECRET,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      requestBody,
      config
    );

    // Store the tokens securely, for example in a session or database

    // console.log("Response: ", response.data);
    if (response.data.access_token) {
      console.log("We got access token for a user");
    }
    if (response.data.refresh_token) {
      console.log("We got refresh token for a user");
    }
    // console.log("Access Token:", response.data.access_token);
    // console.log("Refresh Token:", response.data.refresh_token);
    const userinfo = await OauthFunctions.getMicrosoftProfileInfo(
      response.data.access_token
    );
    const firebaseRes = await storeEmailSetupDetails_v2(
      userinfo.email,
      "",
      userinfo.name,
      "smtp.office365.com",
      "",
      response.data.access_token,
      response.data.refresh_token,
      response.data.expires_in
    );
    if (process.env.NODE_ENV === "production") {
      mixpanel.track("Connected_Outlook", {
        distinct_id: userinfo.email, // Use email as the unique identifier
        email: userinfo.email,
        // cardType: eligiblePaymentMethod.funding,
      });
    }
    helperFunctionAdditionalEmails.microsoftFetchAssociatedEmail(
      response.data.access_token,
      userinfo.email
    );
    // res.send("Authentication successful! You can close this window.");
    // res.redirect(
    //   `https://automatedemailwarmup.com/email-onboard?status=failed&email=${encodeURIComponent(
    //     userinfo.email
    //   )}&provider=google`
    // );
    // res.redirect(
    //   `http://localhost:3000/email-onboard?status=success&email=${encodeURIComponent(
    //     userinfo.email
    //   )}&provider=google`
    // );

    if (process.env.NODE_ENV === "production") {
      res.redirect(
        `https://${process.env.APP_BASE_URL
        }/email-onboard?status=success&email=${encodeURIComponent(
          userinfo.email
        )}&provider=microsoft`
      );
    } else {
      res.redirect(
        `http://localhost:3000/email-onboard?status=success&email=${encodeURIComponent(
          userinfo.email
        )}&provider=microsoft`
      );
    }
    // res.redirect(
    //   `https://automatedemailwarmup.com/email-onboard?status=success&email=${encodeURIComponent(
    //     userinfo.email
    //   )}&provider=microsoft`
    // );
  } catch (error) {
    console.error("Failed to exchange token:", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "authController/handleMicrosoftOAuthCallback : " + err,
        req
      );
    }
    res.status(500).send("Authentication failed");
  }
}
async function handleMicrosoftOAuthCallbackLogin(req, res) {
  const { code } = req.query;
  console.log("This is called");
  if (!code) {
    return res.status(400).send("Error: No code received");
  }

  // if (process.env.NODE_ENV === "production") {
  //   redirect_uri = process.env.MICROSOFT_REDIRECT_URI_LOGIN;
  //   console.log("Production");
  // } else {
  //   redirect_uri = process.env.MICROSOFT_REDIRECT_URI_LOGIN_LOCAL;
  // }

  var redirect_uri;

  if (process.env.NODE_ENV === "production") {
    redirect_uri = `https://${process.env.APP_BASE_URL}/${process.env.MICROSOFT_REDIRECT_URI_LOGIN_PATH}`;
  } else {
    redirect_uri = `http://localhost:5001/${process.env.MICROSOFT_REDIRECT_URI_LOGIN_PATH}`;
  }
  const requestBody = qs.stringify({
    code,
    client_id: process.env.MICROSOFT_CLIENT_ID,
    client_secret: process.env.MICROSOFT_CLIENT_SECRET,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      requestBody,
      config
    );
    // console.log("Microsoft Res: ", response);
    // Store the tokens securely, for example in a session or database

    // console.log("Response: ", response.data);
    if (response.data.access_token) {
      console.log("We got access token for a user");
    }
    if (response.data.refresh_token) {
      console.log("We got refresh token for a user");
    }
    // console.log("Access Token:", response.data.access_token);
    // console.log("Refresh Token:", response.data.refresh_token);
    const userinfo = await OauthFunctions.getMicrosoftProfileInfo(
      response.data.access_token
    );
    //
    if (process.env.NODE_ENV === "production") {
      res.redirect(
        `https://${process.env.APP_BASE_URL
        }/login?status=success&email=${encodeURIComponent(
          userinfo.email
        )}&provider=microsoft`
      );
    } else {
      res.redirect(
        `http://localhost:3000/login?status=success&email=${encodeURIComponent(
          userinfo.email
        )}&provider=microsoft`
      );
    }

    // res.status(200).send("Success");
  } catch (error) {
    console.error("Failed to exchange token:", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "authController/handleMicrosoftOAuthCallbackLogin : " + err,
        req
      );
    }

    res.status(500).send("Authentication failed");
  }
}

// const checkEmailProvider = async (req, res) => {
//   const email = req.body.email;

//   if (!email) {
//     return res
//       .status(400)
//       .send({ status: false, message: "Email is required" });
//   }

//   const domain = email.split("@")[1]; // Get domain from email

//   try {
//     dns.resolveMx(domain, (error, addresses) => {
//       if (error) {
//         console.error("Failed to resolve MX records:", error);
//         return res
//           .status(500)
//           .json({ provider: "Unknown", error: "Failed to resolve MX records" });
//       }

//       const mxRecords = addresses.map((record) => record.exchange);

//       // console.log(mxRecords); // Output the MX records for debugging

//       if (mxRecords.some((mx) => mx.includes("outlook.com"))) {
//         // console.log("Outlook Email");

//         return res.status(200).send({
//           status: true,
//           provider: "Outlook",
//           message: "Email provider is Outlook",
//         });
//       } else if (
//         mxRecords.some((mx) => mx.includes("gmail.com")) ||
//         mxRecords.some((mx) => mx.includes("google.com"))
//       ) {
//         // console.log("Gmail Email");

//         return res.status(200).send({
//           status: true,
//           provider: "Gmail",
//           message: "Email provider is Gmail",
//         });
//       } else {
//         return res.status(200).send({
//           status: false,
//           provider: "Other",
//           message: "Email provider is Other",
//         });
//       }
//     });
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return res
//       .status(500)
//       .json({ provider: "Unknown", error: "Unexpected error occurred" });
//   }
// };

// const checkEmailProvider = async (req, res) => {
//   const email = req.body.email;

//   if (!email) {
//     return res
//       .status(400)
//       .send({ status: false, message: "Email is required" });
//   }

//   const domain = email.split("@")[1]; // Get domain from email

//   try {
//     dns.resolveMx(domain, (error, addresses) => {
//       if (error) {
//         console.error("Failed to resolve MX records:", error);
//         return res
//           .status(500)
//           .json({ provider: "Unknown", error: "Failed to resolve MX records" });
//       }

//       const mxRecords = addresses.map((record) => record.exchange);
//       // console.log(mxRecords);

//       // Determine the email provider based on known MX records
//       if (mxRecords.some((mx) => mx.includes("outlook.com"))) {
//         return res.status(200).send({
//           status: true,
//           provider: "Outlook",
//           smtpServer: "smtp.office365.com",
//           message: "Email provider is Outlook",
//         });
//       } else if (
//         mxRecords.some((mx) => mx.includes("gmail.com")) ||
//         mxRecords.some((mx) => mx.includes("google.com"))
//       ) {
//         return res.status(200).send({
//           status: true,
//           provider: "Gmail",
//           smtpServer: "smtp.gmail.com",
//           message: "Email provider is Gmail",
//         });
//       } else if (mxRecords.some((mx) => mx.includes("yahoo.com"))) {
//         return res.status(200).send({
//           status: true,
//           provider: "Yahoo",
//           smtpServer: "smtp.mail.yahoo.com",
//           message: "Email provider is Yahoo",
//         });
//       } else {
//         // Attempt to infer the SMTP server from the domain of the MX record
//         const guessedSmtpServer =
//           mxRecords[0].split(".").length > 2
//             ? `smtp.${mxRecords[0].split(".").slice(-2).join(".")}`
//             : "Unknown";
//         return res.status(200).send({
//           status: true,
//           provider: "Other",
//           smtpServer: guessedSmtpServer,
//           message: "Inferred SMTP server based on MX records",
//         });
//       }
//     });
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return res
//       .status(500)
//       .json({ provider: "Unknown", error: "Unexpected error occurred" });
//   }
// };

const checkEmailProvider = async (req, res) => {
  const email = req.body.email;

  if (!email || !email.includes("@")) {
    return res
      .status(400)
      .send({ status: false, message: "Invalid email format" });
  }

  const domain = email.split("@")[1];
  if (!domain) {
    return res
      .status(400)
      .send({ status: false, message: "Invalid email format" });
  }

  try {
    dns.resolveMx(domain, (error, addresses) => {
      if (error || addresses.length === 0) {
        const smtpServer = `smtp.${domain}`;
        return res.status(200).send({
          status: true,
          provider: "Other",
          smtpServer: smtpServer,
          message: "No MX records found, inferred SMTP server based on domain",
        });
      }

      const mxRecords = addresses.map((record) => record.exchange);
      if (mxRecords.some((mx) => mx.includes("outlook.com"))) {
        return res.status(200).send({
          status: true,
          provider: "Outlook",
          smtpServer: "smtp.office365.com",
          message: "Email provider is Outlook",
        });
      } else if (
        mxRecords.some((mx) => mx.includes("gmail.com")) ||
        mxRecords.some((mx) => mx.includes("google.com"))
      ) {
        return res.status(200).send({
          status: true,
          provider: "Gmail",
          smtpServer: "smtp.gmail.com",
          message: "Email provider is Gmail",
        });
      } else if (mxRecords.some((mx) => mx.includes("yahoo.com"))) {
        return res.status(200).send({
          status: true,
          provider: "Yahoo",
          smtpServer: "smtp.mail.yahoo.com",
          message: "Email provider is Yahoo",
        });
      } else {
        const guessedSmtpServer =
          mxRecords[0].split(".").length > 2
            ? `smtp.${mxRecords[0].split(".").slice(-2).join(".")}`
            : `smtp.${domain}`;
        return res.status(200).send({
          status: true,
          provider: "Other",
          smtpServer: guessedSmtpServer,
          message: "Inferred SMTP server based on MX records",
        });
      }
    });
  } catch (err) {
    console.error("Unexpected error authcontroller/checkEmailProvider:", err);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("authController/checkEmailProvider : " + err, req);
    }
    return res
      .status(500)
      .json({ provider: "Unknown", error: "Unexpected error occurred" });
  }
};

// Single function to handle email credentials verification
// async function verifyEmailCredentials(req, res) {
//   const { userEmail, password, imapServer, imapPort, smtpServer, smtpPort } =
//     req.body;

//   // Function to verify IMAP credentials
//   const verifyImap = () => {
//     return new Promise((resolve, reject) => {
//       const imap = new Imap({
//         user: userEmail,
//         password: password,
//         host: imapServer,
//         port: imapPort,
//         tls: true,
//       });

//       imap.once("ready", () => {
//         console.log("IMAP connection successful");
//         imap.end();
//         resolve(true);
//       });

//       imap.once("error", (err) => {
//         console.log(`IMAP connection failed: ${err.message}`);
//         resolve(false);
//       });

//       imap.connect();
//     });
//   };

//   // Function to verify SMTP credentials
//   const verifySmtp = () => {
//     return new Promise((resolve, reject) => {
//       const transporter = nodemailer.createTransport({
//         host: smtpServer,
//         port: smtpPort,
//         secure: smtpPort === 465, // true for 465, false for other ports
//         auth: {
//           user: userEmail,
//           pass: password,
//         },
//       });

//       transporter.verify((error, success) => {
//         if (error) {
//           console.log(`SMTP connection failed: ${error.message}`);
//           resolve(false);
//         } else {
//           console.log("SMTP connection successful");
//           resolve(true);
//         }
//       });
//     });
//   };

//   try {
//     const imapStatus = await verifyImap();
//     const smtpStatus = await verifySmtp();

//     res.status(200).json({
//       imapConnection: imapStatus,
//       smtpConnection: smtpStatus,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// Single function to handle email credentials verification
// Single function to handle email credentials verification
async function verifyEmailCredentials(req, res) {
  const { userEmail, password, imapServer, imapPort, smtpServer, smtpPort } =
    req.body;
  let passwordCorrect = true; // Start assuming the password is correct

  // Function to verify IMAP credentials
  const verifyImap = () => {
    return new Promise((resolve, reject) => {
      const imap = new Imap({
        user: userEmail,
        password: password,
        host: imapServer,
        port: imapPort,
        tls: true,
      });

      imap.once("ready", () => {
        console.log("IMAP connection successful");
        imap.end();
        resolve(true);
      });

      imap.once("error", (err) => {
        console.log(`IMAP connection failed: ${err.message}`);
        if (err.message.includes("Authentication failed")) {
          passwordCorrect = false; // Set passwordCorrect to false on auth error
        }
        resolve(false);
      });

      imap.connect();
    });
  };

  // Function to verify SMTP credentials
  const verifySmtp = () => {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        host: smtpServer,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: userEmail,
          pass: password,
        },
      });

      transporter.verify((error, success) => {
        if (error) {
          console.log(`SMTP connection failed: ${error.message}`);
          if (error.message.includes("Authentication failed")) {
            passwordCorrect = false; // Set passwordCorrect to false on auth error
          }
          resolve(false);
        } else {
          console.log("SMTP connection successful");
          resolve(true);
        }
      });
    });
  };

  try {
    const imapStatus = await verifyImap();
    const smtpStatus = await verifySmtp();

    // Adjust response to handle passwordCorrect more accurately
    res.status(200).json({
      imapConnection: imapStatus,
      smtpConnection: smtpStatus,
      passwordCorrect: passwordCorrect, // Reflect password verification status
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUserPaymentStatus(email, paymentStatus) {
  // Reference to the userCollection
  const userCollectionRef = db.collection(userCollection);

  try {
    // Query for the user by email
    const snapshot = await userCollectionRef.where("email", "==", email).get();

    if (snapshot.empty) {
      console.log("No matching user found.");
      return;
    }

    // Assuming each email is unique and only one document will match
    snapshot.forEach((doc) => {
      let updates = { paymentStatus: paymentStatus };

      // Optionally, adjust credits or other properties based on the payment status
      if (paymentStatus === "paid") {
        // Example: Increment credits when the user pays
        updates["credits"] = admin.firestore.FieldValue.increment(10); // Example increment, adjust as needed
      } else if (paymentStatus === "unpaid") {
        // Handle unpaid status, e.g., reset credits or leave them unchanged
        // updates['credits'] = ...; // Adjust according to your business logic
      }

      // Update the document
      doc.ref
        .update(updates)
        .then(() =>
          console.log(`Updated payment status for ${email} to ${paymentStatus}`)
        );
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      rollbar.error("authController/updateUserPaymentStatus : " + err);
    }
    console.error("Error updating user payment status:", error);
  }
}
async function storeEmailSetupDetails_v2(
  userEmail,
  password,
  name,
  serverDomain,
  apiKey,
  accessToken,
  refreshToken,
  expiresIn
) {
  if (!userEmail) {
    console.error("Email cannot be empty.");
    return { status: false, message: "Email cannot be empty." };
  }

  const userDetails = {
    email: userEmail,
    password: password, // Ensure password is hashed before calling this function
    name: name,
    serverDomain: serverDomain,
    apiKey: apiKey,
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: expiresIn,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    tokenCreationAndUpdateTime: admin.firestore.FieldValue.serverTimestamp(),
  };

  const detailsRef = db.collection(emailSetupCollectionName);
  const snapshot = await detailsRef.where("email", "==", userEmail).get();

  if (snapshot.empty) {
    // No existing user details found, create new entry
    userDetails.createdAt = admin.firestore.FieldValue.serverTimestamp(); // Set createdAt only for new entries
    const newDetailsRef = await detailsRef.add(userDetails);
    console.log(`New user details created with ID: ${newDetailsRef.id}`);
    return { status: true, userExists: false, documentId: newDetailsRef.id };
  } else {
    // User details already exist, update the existing document
    const documentId = snapshot.docs[0].id; // Assuming the first document is the existing user details
    await detailsRef.doc(documentId).update(userDetails);
    console.log("User details updated for this email.");
    return { status: true, userExists: true, documentId: documentId };
  }
}

// async function addNewWarmUpEmailFunction(mainEmail, newWarmupEmails) {
//   try {
//     let schemaTemplate = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
//     const warmupEmailSchema =
//       schemaTemplate.properties.warmupEmails.items.properties;

//     // Ensure newWarmupEmails is an array
//     newWarmupEmails = Array.isArray(newWarmupEmails)
//       ? newWarmupEmails
//       : [newWarmupEmails];

//     // Find the user by their main email
//     const usersRef = db.collection(userCollectionName);
//     const snapshot = await usersRef.where("email", "==", mainEmail).get();
//     const currentTime = Date.now();

//     if (snapshot.empty) {
//       console.log("No existing user found.");
//       return { status: false, message: "User not found" };
//     } else {
//       const userDoc = snapshot.docs[0];
//       const userData = userDoc.data();

//       // Check which newWarmupEmails already exist in warmupEmails
//       const existingEmails = userData.warmupEmails || [];
//       const duplicateEmails = newWarmupEmails.filter((email) =>
//         existingEmails.some((emailObj) => emailObj.email === email)
//       );

//       if (duplicateEmails.length > 0) {
//         console.log("Some warmup emails already exist:", duplicateEmails);
//       }

//       // Filter out duplicate emails from the newWarmupEmails
//       const emailsToAdd = newWarmupEmails.filter(
//         (email) => !duplicateEmails.includes(email)
//       );

//       if (emailsToAdd.length > 0) {
//         // Prepare the new warmup email objects
//         const newWarmupEmailObjs = emailsToAdd.map((email) => ({
//           email: email,
//           lastWarmup: warmupEmailSchema.lastWarmup.default || null,
//           warmupStatus: warmupEmailSchema.warmupStatus.default || null,
//           creditsAvailable: newUserCredits, // Assuming it's always set to newUserCredits as per schema
//           deliverability: 20,
//           createdAt: currentTime, // Set the creation timestamp
//         }));

//         // Add the new warmup emails to the existing array
//         userData.warmupEmails.push(...newWarmupEmailObjs);

//         // Update the document
//         await userDoc.ref.update(userData);
//         console.log("Warmup emails added successfully.");
//         return {
//           status: true,
//           message: `Warmup emails added successfully: ${emailsToAdd.join(
//             ", "
//           )}`,
//         };
//       } else {
//         return {
//           status: false,
//           message: `All provided warmup emails already exist: ${duplicateEmails.join(
//             ", "
//           )}`,
//         };
//       }
//     }
//   } catch (error) {
//     console.error("authController/addNewWarmUpEmail : ", error);
//     if (process.env.NODE_ENV === "production") {
//       rollbar.error("authController/addNewWarmUpEmail : " + err);
//     }
//     return {
//       status: false,
//       message: "Internal Server Error. Please try again later.",
//     };
//   }
// };
module.exports = {
  getUserLogin,
  createNewUser,
  addNewWarmUpEmail,
  redirectToGoogleAuth,
  redirectToGooglNylaseAuth,
  redirectToMicrosoftAuth,
  redirectToMicrosoftAuthLogout,
  handleGoogleOAuthCallback,
  handleGoogleNylasOAuthCallback,
  handleMicrosoftOAuthCallback,
  redirectToMicrosoftAuthLogin,
  handleMicrosoftOAuthCallbackLogin,
  checkEmailProvider,
  removeWarmUpEmail,

  verifyEmailCredentials,
};
