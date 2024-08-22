const { google } = require("googleapis");
const admin = require("../db/dbSetup");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const { Client } = require("@microsoft/microsoft-graph-client");
const axios = require("axios");
const qs = require("querystring");
require("isomorphic-fetch");

require("dotenv").config(); // Load environment variables from .env file

const db = admin.firestore();

async function labelEmailsGoogle(accessToken) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({ access_token: accessToken });
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  try {
    // Check if the label exists or create it if it doesn't
    const existingLabels = await gmail.users.labels.list({ userId: "me" });
    let label = existingLabels.data.labels.find(
      (l) => l.name === "Emailwarmup"
    );
    if (!label) {
      const labelData = {
        name: "Emailwarmup",
        labelListVisibility: "labelShow",
        messageListVisibility: "show",
      };
      const createLabelResponse = await gmail.users.labels.create({
        userId: "me",
        resource: labelData,
      });
      label = createLabelResponse.data;
    }

    // Search for emails that do not already have the label
    const searchResponse = await gmail.users.messages.list({
      userId: "me",
      q: `subject:of-Emailwarmup -label:${label.id}`,
    });

    if (
      searchResponse.data.messages &&
      searchResponse.data.messages.length > 0
    ) {
      // Apply the label and remove from INBOX
      const batchModify = {
        ids: searchResponse.data.messages.map((message) => message.id),
        addLabelIds: [label.id],
        removeLabelIds: ["INBOX"],
      };

      await gmail.users.messages.batchModify({
        userId: "me",
        resource: batchModify,
      });
      console.log("Label applied and inbox label removed from messages");
    } else {
      console.log("No messages found to label or modify");
    }
  } catch (error) {
    console.error("Failed to process emails:", error);
  }
}
// ######### Nylas Gmail Move Email ###########

async function getNylasGmailMessages(grant_id) {
  const url = `https://api.eu.nylas.com/v3/grants/${grant_id}/messages?limit=5`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NYLAS_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Extract the messages data
    const messages = response.data.data;
    // console.log(messages);
    // Filter messages with subject containing "of-Emailwarmup"
    const filteredMessages = messages.filter((message) =>
      message.subject.includes("of-Emailwarmup")
    );

    // Get the IDs of the filtered messages
    const messageIds = filteredMessages.map((message) => message.id);

    // Print and return the list of IDs
    console.log("Filtered Message IDs:", messageIds);
    return messageIds;
  } catch (error) {
    console.error(
      "Error fetching messages:",
      error.response ? error.response.data : error.message
    );
  }
}

async function getNylasGmailFolders(grant_id) {
  const url = `https://api.eu.nylas.com/v3/grants/${grant_id}/folders`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NYLAS_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Extract the folders data
    const folders = response.data.data;

    // Check if folders is an array
    if (Array.isArray(folders)) {
      // Find the folder with the name "Emailwarmup"
      const folder = folders.find(
        (folder) => folder.name === "Emailwarmup"
      );

      if (folder) {
        // Return the ID of the folder
        // console.log("ID:", folder.id);
        return folder.id;
      } else {
        // Log "not found" if the folder is not present and create a new one
        console.log("Label not found, creating new label");
        return await createNylaGmailsFolder(grant_id);
      }
    } else {
      console.error(
        "Error: Invalid response format, expected an array of folders."
      );
    }
  } catch (error) {
    console.error(
      "Error fetching folders:",
      error.response ? error.response.data : error.message
    );
  }
}

async function createNylaGmailsFolder(grant_id) {
  const url = `https://api.eu.nylas.com/v3/grants/${grant_id}/folders`;
  const data = {
    name: "Emailwarmup",
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NYLAS_API_KEY}`,
      },
    });

    // Print and return the folder ID from the response data
    // console.log("Folder created:", response.data);
    return response.data.data.id;
  } catch (error) {
    console.error(
      "Error creating folder:",
      error.response ? error.response.data : error.message
    );
  }
}

async function updateNylasGmailMessageFolder(grant_id, message_id, folder_id) {
  const url = `https://api.eu.nylas.com/v3/grants/${grant_id}/messages/${message_id}`;
  const data = {
    folders: [folder_id],
  };

  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NYLAS_API_KEY}`,
      },
    });

    // Print the response data or handle it as needed
    // console.log("Message updated:", response.data);
    console.log("Email moved successfully");
  } catch (error) {
    console.error(
      "Error updating message:",
      error.response ? error.response.data : error.message
    );
  }
}

async function moveEmailToFolderNylasGmail(grant_id) {
  try {
    const messageIds = await getNylasGmailMessages(grant_id);
    const folderId = await getNylasGmailFolders(grant_id);

    for (const messageId of messageIds) {
      await updateNylasGmailMessageFolder(grant_id, messageId, folderId);
    }
  } catch (error) {
    console.error("Error processing messages:", error.message);
  }
}

// ############## Nylas Gmail Move Email End#############
async function moveEmailToFolderMicrosoft(accessToken) {
  const folderName = "Emailwarmup";
  const keyword = "of-Emailwarmup";
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken); // Use the provided access token for authentication
    },
  });

  async function getOrCreateFolder() {
    try {
      const folders = await client.api("/me/mailFolders").get();
      const existingFolder = folders.value.find(
        (folder) => folder.displayName === folderName
      );
      if (existingFolder) {
        return existingFolder;
      } else {
        return await client
          .api("/me/mailFolders")
          .post({ displayName: folderName });
      }
    } catch (error) {
      console.error("Error fetching or creating folder:", error);
      throw error; // Rethrow to handle it in the calling function
    }
  }

  async function moveEmailsToFolder(folderId) {
    try {
      const emails = await client
        .api("/me/messages")
        .select("id,subject")
        .top(50) // Adjust number of emails fetched as needed
        .get();

      for (const email of emails.value) {
        if (email.subject.includes(keyword)) {
          await client
            .api(`/me/messages/${email.id}/move`)
            .post({ destinationId: folderId });
          console.log(`Moved email: ${email.subject}`);
        }
      }
    } catch (error) {
      console.error("Error moving emails:", error);
      throw error; // Rethrow to handle it in the calling function
    }
  }

  try {
    const folder = await getOrCreateFolder();
    await moveEmailsToFolder(folder.id);
  } catch (error) {
    console.error("Error processing emails:", error);
  }
}
async function refreshMicrosoftAccessToken(refreshToken) {
  var redirect_uri;
  if (process.env.NODE_ENV === "production") {
    redirect_uri = `https://${process.env.APP_BASE_URL}/${process.env.MICROSOFT_REDIRECT_URI_PATH}`;
  } else {
    redirect_uri = `http://localhost:5001/${process.env.MICROSOFT_REDIRECT_URI_PATH}`;
  }
  const requestBody = qs.stringify({
    client_id: process.env.MICROSOFT_CLIENT_ID,
    client_secret: process.env.MICROSOFT_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
    redirect_uri: redirect_uri, // Required if it was included in the original auth request
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
    // console.log("New Access Token:", response.data.access_token);
    console.log("Token refreshed");
    return response.data; // This includes the new access token and possibly a new refresh token
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw new Error("Failed to refresh token");
  }
}

async function refreshGoogleAccessToken(refreshToken) {
  const requestBody = qs.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      requestBody,
      config
    );
    // console.log("New Google Access Token:", response.data.access_token);
    console.log("Token refreshed");

    return response.data; // This includes the new access token, scope, expiry time, and potentially a new refresh token
  } catch (error) {
    console.error("Failed to refresh Google token:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw new Error("Failed to refresh Google token");
  }
}
async function sendEmailGmail(accessToken, to, subject, body) {
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({
    access_token: accessToken,
  });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  // Create email
  const email = [
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject} of-Emailwarmup`,
    "",
    body,
  ].join("\n");

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("Email sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

async function sendEmailGmailNylas(grantId, to, subject, body) {
  console.log(process.env.NYLAS_API_KEY);

  const data = {
    subject: subject + " of-Emailwarmup",
    body: body,
    to: [{ name: to, email: to }],
    tracking_options: {
      opens: true,
      links: true,
      thread_replies: true,
      label: "of-Emailwarmup",
    },
  };

  try {
    const response = await axios.post(
      `https://api.eu.nylas.com/v3/grants/${grantId}/messages/send`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${process.env.NYLAS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    // console.error("Error sending email:", error);
    console.error(
      "Error sending email:",
      error.response ? error.response.data : error.message
    );
  }
}
async function sendEmailMicrosoft(
  accessToken,
  recipient,
  subject,
  content,
  warmupStatus = true
) {
  // Initialize a Microsoft Graph client.
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken); // Pass the access token directly to the Microsoft Graph API client.
    },
  });

  // Prepare the email message that you want to send.
  const sendMail = {
    message: {
      subject: `${subject} ${warmupStatus ? " of-Emailwarmup" : ""}`,
      body: {
        contentType: "Text",
        content: content,
      },
      toRecipients: [
        {
          emailAddress: {
            address: recipient,
          },
        },
      ],
    },
    saveToSentItems: "true", // Specify whether you want to save this email to the Sent Items folder.
  };

  // Make a call to the Microsoft Graph API to send the email.
  try {
    const response = await client.api("/me/sendMail").post(sendMail); // Corrected to pass sendMail directly
    console.log("Email sent successfully!", response);
    return response;
  } catch (error) {
    console.error("Error sending email through Microsoft Graph API", error);
    throw error;
  }
}

async function sendOAuthEmail(
  email,
  receiverEmail,
  subject,
  body,
  warmupStatus = true
) {
  if (!email) {
    console.error("Sender email cannot be empty.");
    return { status: false, message: "Sender email cannot be empty." };
  }

  const detailsRef = db.collection("emailSetupDetails");
  const snapshot = await detailsRef.where("email", "==", email).get();

  if (snapshot.empty) {
    console.log("No user details found for this email.");
    return { status: false, message: "User not found." };
  } else {
    const userDoc = snapshot.docs[0];
    const userDetails = userDoc.data();
    var {
      accessToken,
      apiKey,
      refreshToken,
      serverDomain,
      tokenCreationAndUpdateTime,
      expiresIn,
    } = userDetails;

    if (!accessToken || !serverDomain) {
      console.log("Access token or server domain is missing.");
      return { status: false, message: "Incomplete setup details." };
    }

    // Assume token needs refresh if tokenCreationAndUpdateTime is not available
    let shouldRefreshToken = true;
    if (tokenCreationAndUpdateTime) {
      const timeDifference = Date.now() - tokenCreationAndUpdateTime.toMillis();
      shouldRefreshToken = timeDifference > 2700000; // 45 minutes in milliseconds
    }

    if (shouldRefreshToken) {
      console.log(
        "Access token is older than 45 minutes or update time is missing. Refreshing token..."
      );

      if (serverDomain === "smtp.gmail.com") {
        const newTokenDetails = await refreshGoogleAccessToken(refreshToken);
        accessToken = newTokenDetails.access_token;
        expiresIn = newTokenDetails.expires_in;
      } else if (serverDomain === "smtp.office365.com") {
        const newTokenDetails = await refreshMicrosoftAccessToken(refreshToken);
        accessToken = newTokenDetails.access_token;
        expiresIn = newTokenDetails.expires_in;
      } else if (serverDomain === "smtp.nylas_gmail.com") {
        // do nothing
      } else {
        console.log("Unsupported email service for token refresh.");
        return {
          status: false,
          message: "Unsupported email service provider.",
        };
      }

      // Update the access token and the update timestamp in the database
      if (serverDomain === "smtp.nylas_gmail.com") {
        // Do nothing
      } else {
        await userDoc.ref.update({
          expiresIn: expiresIn,
          accessToken: accessToken,
          tokenCreationAndUpdateTime:
            admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }

    switch (serverDomain) {
      case "smtp.gmail.com":
        console.log("Sending email via Gmail.");
        const gmailResult = sendEmailGmail(
          accessToken,
          receiverEmail,
          subject,
          body
        );
        setTimeout(() => {
          labelEmailsGoogle(accessToken); // Assume you'll add necessary parameters if needed
          console.log("Email labeled in Gmail.");
        }, 5000);
        return gmailResult;

      case "smtp.office365.com":
        console.log("Sending email via Microsoft.");
        const microsoftResult = sendEmailMicrosoft(
          accessToken,
          receiverEmail,
          subject,
          body,
          warmupStatus
        );
        setTimeout(() => {
          moveEmailToFolderMicrosoft(accessToken); // Assume you'll add necessary parameters if needed
          console.log("Email moved to folder in Microsoft.");
        }, 5000);
        return microsoftResult;
      case "smtp.nylas_gmail.com":
        console.log("Sending email via Microsoft.");
        const nylasGmailResult = sendEmailGmailNylas(
          apiKey,
          receiverEmail,
          subject,
          body,
          warmupStatus
        );
        setTimeout(() => {
          moveEmailToFolderNylasGmail(apiKey); // Assume you'll add necessary parameters if needed
          console.log("Email moved to folder in Microsoft.");
        }, 5000);
        return nylasGmailResult;

      default:
        console.log("Unsupported email service.");
        return {
          status: false,
          message: "Unsupported email service provider.",
        };
    }
  }
}

async function handleEmailSending(ownerEmail) {
  // Reference to the collection where email setup details are stored
  const detailsRef = db.collection("emailSetupDetails");

  // Read email accounts and templates from JSON files
  const emailAccounts = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "emailAccounts", "emailAccounts.json"),
      "utf8"
    )
  );
  const emailTemplates = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "emailAccounts", "emailTemplates.json"),
      "utf8"
    )
  );

  // Randomly select an account and a template
  const accountIndex = Math.floor(Math.random() * emailAccounts.length);
  const templateIndex = Math.floor(Math.random() * emailTemplates.length);

  const account = emailAccounts[accountIndex];
  const template = emailTemplates[templateIndex];
  const personalizedContent = template.body.replace("{{name}}", account.name);

  // Check if a document exists for the given email
  const snapshot = await detailsRef.where("email", "==", ownerEmail).get();

  if (!snapshot.empty) {
    console.log("Email found");
    // If the document exists, use OAuth email sender
    const userDocRef = snapshot.docs[0];
    const userDoc = userDocRef.data();
    // console.log(userDoc);
    if (userDoc.serverDomain === "smtp.office365.com") {
      await sendOAuthEmail(
        ownerEmail,
        account.email,
        template.subject,
        personalizedContent
      );
    } else if (userDoc.serverDomain === "smtp.nylas_gmail.com") {
      await sendOAuthEmail(
        ownerEmail,
        account.email,
        template.subject,
        personalizedContent
      );
    } else if (userDoc.password !== "") {
      // console.log(userDoc);
      const smtpPort = userDoc.smtpPort ? userDoc.smtpPort : "";
      await sendSmtpEmail(
        ownerEmail,
        userDoc.password,
        userDoc.serverDomain,
        smtpPort,
        account.email,
        template.subject,
        personalizedContent
      );
    } else {
      console.log("Email details not present!");
    }
  } else {
    console.log("Email not found to send : ", ownerEmail);
    // If no document exists, use normal email sender
    // sendEmail(
    //   account, // Assumed to be an object containing the email address
    //   ownerEmail,
    //   template.subject,
    //   personalizedContent
    // );
  }
}
async function sendEmail(details, target, heading, body) {
  const emailServerSettings = {
    host: new Buffer("bWFpbC5wcml2YXRlZW1haWwuY29t", "base64").toString(
      "ascii"
    ),
    port: parseInt("587"),
    secure: false, // Note: secure is set to false as port is 587
    auth: {
      user: details.email,
      pass: (() => {
        let result = "";
        for (let i = 0; i < details.appPassword.length; i++) {
          result += details.appPassword.charAt(i);
        }
        return result;
      })(),
    },
  };

  const emailClient =
    require("nodemailer").createTransport(emailServerSettings);

  let modifiedBody = (() => {
    let result = "";
    for (let i = 0; i < body.length; i++) {
      if (body.charAt(i) === "\n") {
        result += "<br>";
      } else {
        result += body.charAt(i);
      }
    }
    return result;
  })();

  let emailSpecifications = {
    from: `"${details.email}" <${details.email}>`,
    to: target,
    subject: (() => {
      const additionalText = " of-Emailwarmup";
      let newSubject = heading.concat(additionalText);
      return newSubject;
    })(),
    text: body,
    html: modifiedBody,
  };

  const sendProcess = async (client, mailDetails) => {
    try {
      let transmissionOutcome = await client.sendMail(mailDetails);
      console.log(
        `Message sent from ${details.email}: %s`,
        transmissionOutcome.messageId
      );
    } catch (error) {
      console.error(`Error occurred in ${details.email}:`, error);
    }
  };

  await sendProcess(emailClient, emailSpecifications);
}

async function sendSmtpEmail(
  email,
  password,
  server,
  smtpPort,
  target,
  subject,
  body
) {
  smtpPort = smtpPort ? smtpPort : 587;

  const emailServerSettings = {
    host: server,
    port: smtpPort,
    secure: false, // Note: secure is set to false as port is 587
    auth: {
      user: email,
      pass: password,
    },
  };

  const emailClient = nodemailer.createTransport(emailServerSettings);

  const modifiedBody = body.replace(/\n/g, "<br>");

  const emailSpecifications = {
    from: `"${email}" <${email}>`,
    to: target,
    subject: "[Mail Warmup] " + subject + " of-Emailwarmup",
    text: body,
    html: modifiedBody,
  };

  try {
    const transmissionOutcome = await emailClient.sendMail(emailSpecifications);
    console.log(
      `Message sent from ${email}: %s`,
      transmissionOutcome.messageId
    );
  } catch (error) {
    console.error(`Error occurred in ${email}:`, error);
  }
}
// Usage
// sendEmail(
//   "ya29.a0AXooCgvajyH2Ha44TR94aTzA1HcHja2Scvzqr3GHjSRqzTsProRyfKCNJAVKwyUj0T6yVcc2UHod8qbgR9PAgYmfGTf1tkVFVsDFIlTM_xG-RnRoSeoRmZsG1kONw2jqUOpQdoeupdorkaijpWTeyUYEqHT7SvvXlwaCgYKATwSAQ4SFQHGX2MiPiNa_rRY5e7dsmqQrYkCpA0169",
//   "bishalbiswas.work@gmail.com",
//   "Hello!",
//   "<p>This is a test email</p>"
// );

// (async function () {
//   const newTokenDetails = await refreshMicrosoftAccessToken(
//     "0.AagAUXAN_QTyQUSEY9MDD0mJBj12j_WpzvJHtnfpIbjappnzAGA.AgABAwEAAAApTwJmzXqdR4BN2miheQMYAgDs_wUA9P-dO9_KYcFN7CIIbTUgOj7YjPjpvp8zbM29l45aZrBRCpqDbEFC38hHhgBC59J_m0xFKo9io2cGw9OJPI1-nW_JeNTR5wJiR_AJ5P8VT8opbNhrF5B1Cy6QUes7jm8cTnxkBHyZmAFHYAwNIfQs_VLqXuRIwZlUzPtuOfDaL-qX0IphdELAjn8khp9jqGufHP_NO4d2j7o8G32dZf5nOmbVOPBxutJrm8TrfbbJrZICKFyGAN_WeS5SvEpYOLsOw3xDMCX_XfZ5-Zo0FjBNuFT_niScaf1K_GMtJ0vsw1RSfw6r54NIoxTZwWebHGFzSljL1je2AsoPbyOIv4In6kyuiVCl3nGIqVYgU_TIHkR4tzBQhU_O1US7g9H46_4nYuIeyDy364jGAvrOsO1K-GkFVLzQ9W0r7H3xFYuDYFx9p6B3pElyLRS31I2-Gg3ybO0XjpN9ui9qNJzY5qABvMa-gDoDzKN9ucGirSjnqN2Y2AjOP11Lube3grpYWev86jMOb1J0jTG0z0sQmQPSw-wprZr_J_vw6zQe5h4Q5NJtONogRrGPAD2MuemQCEY8ZOX72ZRLhrZy7yBorQ2v2RQoQnta6NTdHEIu_mM4cLFmQnrM0_D801BFE5szw5JUtcPn_q7Q7E5Ri84o94k3QXsUUYuhVMkEK-aL9Hj_NfA7fdptrdzHcVaJbLdSufnoPmfZ1x5kbxr-ZuxVwUqBN8kvccr-gnswDE1QYkiwwe0K1HoOsJyJirBp8VtWbnFXojMw5xR_yZM5HML3S3IAsjNiLAO3JUoYf6AWBc-p1gDRNnH2P_sus5flXvBqxt01pmeB7uRqJMFy64645GoBYMxiKJhAM_jLlC1sJjMzTlElcRiGs9AogDfBJdce7kww39kbDMGPN0ihjA4-j2LDmpuTiWfFUC2kX6OcBQwMAz1GtP-FVmBr74O1YEuoyHRe9pStuyr2R8XHE8ennEJrnv35XetG6PkSH1FTXj7V1pXqpSPS0mZ_tFafldkBCGJzlGJ-ZoWGpb6wGUqETgPXuqWpkYnYnjsuHO4dJVISLIafI8rDg-SLgg"
//   );

//   await moveEmailToFolderMicrosoft(newTokenDetails.access_token);
// })();

async function main() {
  // await handleEmailSending("bishalbiswas.bb@gmail.com");

  await sendEmailGmailNylas(
    "076e47ff-60ba-49a2-a3df-af2123851d98",
    "bishalbiswas.bb@gmail.com",
    "Hey Reaching Out with Nylas",
    "Hey I would like to track this link <a href=https://espn.com>My Example Link</a>"
  );
  // await sendEmailGmailNylas()
}
// main();
module.exports = {
  sendEmailGmail,
  sendOAuthEmail,
  handleEmailSending,
  labelEmailsGoogle,
  moveEmailToFolderNylasGmail,
  moveEmailToFolderMicrosoft,
  refreshMicrosoftAccessToken,
  refreshGoogleAccessToken,
};

// handleEmailSending("bishalbiswas.work@outlook.com");
