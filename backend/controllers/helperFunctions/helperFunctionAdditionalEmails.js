const axios = require("axios");
const path = require("path");
const fs = require("fs");

const admin = require("../../db/dbSetup");
const db = admin.firestore();
const rollbar = require("../../trackers/rollbar");
require("dotenv").config();
const { Client } = require("@microsoft/microsoft-graph-client");

const schemaPath = path.resolve(__dirname, "../../db/schema/user.json");
const newUserCredits = 20; // Default credits for new users

async function microsoftFetchAssociatedEmail(accessToken, mainEmail) {
  const client = Client.initWithMiddleware({
    authProvider: {
      getAccessToken: () => Promise.resolve(accessToken),
    },
  });

  try {
    // First, check permissions by trying to fetch a minimal dataset
    await client.api("/users").select("id").get();
    console.log("Permission check passed. Token has required scope.");

    // If permission check passes, fetch and log all user emails
    const result = await client.api("/users").get();
    console.log("Email accounts in the organization:");
    for (let i = 0; i < result.value.length; i++) {
      const user = result.value[i];
      if (user.mail && mainEmail) {
        // Ensuring only users with an email are logged
        console.log(`${user.displayName}: ${user.mail}`);

        const newWarmupEmail = user.mail;

        let schemaTemplate = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
        const warmupEmailSchema =
          schemaTemplate.properties.warmupEmails.items.properties;

        // Find the user by their main email
        const usersRef = db.collection(userCollectionName);
        const snapshot = await usersRef.where("email", "==", mainEmail).get();
        const currentTime = Date.now();

        if (snapshot.empty) {
          console.log("No existing user found.");
          res.status(200).send({ status: false, message: "User not found" });
        } else {
          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();

          // Check if newWarmupEmail already exists in warmupEmails
          const existingEmails = userData.warmupEmails || [];
          if (
            existingEmails.some((emailObj) => emailObj.email === newWarmupEmail)
          ) {
            console.log("Warmup email already exists.");
            res
              .status(200)
              .send({ status: false, message: "Warmup email already exists" });
          } else {
            // Prepare the new warmup email object
            const newWarmupEmailObj = {
              email: newWarmupEmail,
              lastWarmup: warmupEmailSchema.lastWarmup.default || null,
              warmupStatus: "paused",
              creditsAvailable: newUserCredits, // Assuming it's always set to 100 as per schema
              deliverability: 20,
              createdAt: currentTime, // Set the creation timestamp
            };

            // Add the new warmup email to the existing array
            userData.warmupEmails.push(newWarmupEmailObj);

            // Update the document
            await userDoc.ref.update(userData);
            console.log("Warmup email added successfully from admin email.");
          }
        }
      }
    }
  } catch (err) {
    console.error("Failed operation: ", err.message);
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "helperFunctionAdditionalEmails/microsoftFetchAssociatedEmail : " + err
      );
    }
    if (err.statusCode === 403) {
      console.error(
        "Access denied. The token does not have the required permissions."
      );
    }
  }
}

// const accessToken =
//   "eyJ0eXAiOiJKV1QiLCJub25jZSI6Imdxck1wU21rdUdYc1JZazBjV0tfdW9iSElWN2ctcm5RVi1zSlpTa3NMeWciLCJhbGciOiJSUzI1NiIsIng1dCI6InE3UDFOdnh1R1F3RE4yVGFpTW92alo4YVp3cyIsImtpZCI6InE3UDFOdnh1R1F3RE4yVGFpTW92alo4YVp3cyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mZDBkNzA1MS1mMjA0LTQ0NDEtODQ2My1kMzAzMGY0OTg5MDYvIiwiaWF0IjoxNzE4NzgzNDk5LCJuYmYiOjE3MTg3ODM0OTksImV4cCI6MTcxODc4NzkxMywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQWN3MW55SW9TczVpc0tNTGY3WVdIU0ptSVdjODBMWFR3elJQL2xZbG1sa2M2RVNYK2xFS2Yya2Z2R2NzOUtSY3oiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkF1dG9tYXRlZEVtYWlsV2FybXVwIiwiYXBwaWQiOiJmNThmNzYzZC1jZWE5LTQ3ZjItYjY3Ny1lOTIxYjhkYWE2OTkiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6ImF1dG9tYXRlZGVtYWlsd2FybXVwLmNvbSIsImdpdmVuX25hbWUiOiJoZWxsb0AiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyNDA1OjIwMTo4MDA5OmU4MGQ6MjEyNDo2MjgxOjQ1ZDU6N2FlNCIsIm5hbWUiOiJoZWxsb0AgYXV0b21hdGVkZW1haWx3YXJtdXAuY29tIiwib2lkIjoiOTAxYTk2YjQtZTQ3OS00NzU0LWFkZmUtMTAwNmU1ZTMzNzMyIiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAzNTdGOTk1QkQiLCJyaCI6IjAuQWFnQVVYQU5fUVR5UVVTRVk5TUREMG1KQmdNQUFBQUFBQUFBd0FBQUFBQUFBQUR6QUdBLiIsInNjcCI6Ik1haWwuUmVhZFdyaXRlIE1haWwuUmVhZFdyaXRlLlNoYXJlZCBNYWlsLlNlbmQgVXNlci5SZWFkIHByb2ZpbGUgb3BlbmlkIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoid2gyUDNLdTAyRWF0THB0UjFjMmhLVlNxWEJncEMxQ3pOZEFGVUpLZTFFUSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6ImZkMGQ3MDUxLWYyMDQtNDQ0MS04NDYzLWQzMDMwZjQ5ODkwNiIsInVuaXF1ZV9uYW1lIjoiaGVsbG9AYXV0b21hdGVkZW1haWx3YXJtdXAuY29tIiwidXBuIjoiaGVsbG9AYXV0b21hdGVkZW1haWx3YXJtdXAuY29tIiwidXRpIjoiRkU0R0h2UHpjRXlVb0ZvMlVkTXdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjI0IDEiLCJ4bXNfc3QiOnsic3ViIjoiZ25QaHh0NEJqbW1wckc2MHpjOS1mc3pWUHBZM0szWElEU3NZOE9nS0s3dyJ9LCJ4bXNfdGNkdCI6MTcwODQ2ODExMn0.3ij3Gx18S5dk-mTRGgH1f_th_oude_UrXrYjS9pIfd14K4w1FJU-EPfB8a_j5iBwT8DQIz9sCbb9SA4KcNQXah6J5IidBKDu5T2OyWQyHrBBSJymmcyDGl7vyJQPzofd97XjRKysrfEhCzU83nJc3bzGoHXNIbdy0yGO4vivUv6bwjwBB6RwrgddNawRkY1E86_vIw0S9qgYSiR4eb-fxOUgg0KYr7J7JxA4TN1OWOpSpl8z-jTpHAhKPw5U6b2yRUu-Uqjg_iyPB80JopHIexkbWZs2HXXdKo94VS3M2GMECGh0lk4CsXf0jjEmrHtapbI7irMTHy-5VK0lUpRSIg";
// Setup the axios headers
// Example usage
// revokeAccessToken(accessToken);

// fetchAndLogUserEmails(accessToken);
// listUsers(accessToken);

// https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https%3A%2F%2Flocalhost%2Fmyapp%2Flogout%2F%3F&client_id=

module.exports = {
  microsoftFetchAssociatedEmail,
};
