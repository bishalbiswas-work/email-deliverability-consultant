const emailFunctions = require("./emailFunctions");
const admin = require("../db/dbSetup");

// labelEmailsGoogle,
// moveEmailToFolderMicrosoft,
// refreshMicrosoftAccessToken,
// refreshGoogleAccessToken,
async function moveEmail() {
  try {
    const db = admin.firestore();

    const emailSetupDetailsCollection = db.collection("emailSetupDetails");
    const snapshot = await emailSetupDetailsCollection.get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    const docs = snapshot.docs;
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i].data();
      //   console.log(doc.id, "=>", doc.data());

      if (doc.accessToken && doc.refreshToken) {
        if (doc.serverDomain === "smtp.office365.com") {
          console.log("Moving emails for microsoft account: ", doc.email);

          const accessToken = await emailFunctions.refreshMicrosoftAccessToken(
            doc.refreshToken
          );
          await emailFunctions.moveEmailToFolderMicrosoft(
            accessToken.access_token
          );
        } else if (doc.serverDomain === "smtp.gmail.com") {
          console.log("Moving emails for gmail account: ", doc.email);

          const accessToken = await emailFunctions.refreshGoogleAccessToken(
            doc.refreshToken
          );
          await emailFunctions.refreshGoogleAccessToken(
            accessToken.access_token
          );
        } else if (doc.serverDomain === "smtp.nylas_gmail.com") {
          console.log("Moving emails for nylas gmail account: ", doc.email);

          await emailFunctions.moveEmailToFolderNylasGmail(doc.apiKey);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
}
// moveEmail();
module.exports = {
  moveEmail,
};
