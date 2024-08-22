const admin = require("../db/dbSetup");
const db = admin.firestore();
const path = require("path");
const fs = require("fs");
const rollbar = require("../trackers/rollbar");
const mixpanel = require("../trackers/mixpanel");
// const userCollectionName = "userCollectiontest";
const userCollectionName = "userCollection2";

const schemaPath = path.resolve(__dirname, "../db/schema/user.json");

const getUserAccountDetails = async (req, res) => {
  try {
    const { email } = req.body;
    const usersRef = db.collection(userCollectionName);
    const snapshot = await usersRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      // User already exists
      const userDoc = snapshot.docs[0].data(); // Assuming the first document is the existing user
      console.log("User already exists.");
      res.status(200).send({ status: true, userDoc: userDoc }); // Return success status and the user document
    } else {
      // No existing user found
      console.log("No existing user found with the provided email.");
      res.status(200).send({ status: false, userExists: false });
    }
  } catch (error) {
    console.error("userController/getUserAccountDetails : ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("userController/getUserAccountDetails : " + err);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const updateUserAccountDetails = async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.email) {
      console.log("Email is required for identifying user document.");
      res.status(200).send({ status: false, message: "Email is required." });
    }

    // Load and parse the schema
    let schemaTemplate;
    try {
      schemaTemplate = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
    } catch (error) {
      console.error("Error reading schema file:", error);
      if (process.env.NODE_ENV === "production") {
        rollbar.error("userController/updateUserAccountDetails : " + err);
      }
      res
        .status(200)
        .send({ status: false, message: "Failed to read user schema." });
    }

    const userEmail = data.email;
    const usersRef = db.collection(userCollectionName);
    const snapshot = await usersRef.where("email", "==", userEmail).get();

    if (!snapshot.empty) {
      // User exists, filter and prepare data for update
      const updateData = {};
      // Exclude 'email', 'createdAt', and 'updatedAt' from update data
      // Ensure only fields defined in the schema are updated
      Object.keys(data).forEach((key) => {
        if (
          !["email", "createdAt", "updatedAt"].includes(key) &&
          schemaTemplate.properties.hasOwnProperty(key)
        ) {
          updateData[key] = data[key];
        }
      });

      // Automatically update 'updatedAt' to the current timestamp
      updateData["updatedAt"] = admin.firestore.FieldValue.serverTimestamp();

      if (Object.keys(updateData).length === 0) {
        console.log("No valid fields provided for update.");
        res.status(200).send({
          status: false,
          message: "No valid fields provided for update.",
        });
      }

      const userDocRef = snapshot.docs[0].ref; // Get the reference to the document
      await userDocRef.update(updateData); // Update the document
      console.log("User details updated.");
      res.status(200).send({ status: true, message: "User details updated." });
    } else {
      // No existing user found
      console.log("No existing user found with the provided email.");
      res
        .status(200)
        .send({ status: false, message: "No existing user found." });
    }
  } catch (error) {
    console.error("userController/getUserAccountDetails : ", error);
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const updateUserSpecificEmailWarmupStatus = async (req, res) => {
  try {
    const { mainEmail, warmupEmail, newWarmupStatus } = req.body;

    if (!mainEmail || !warmupEmail || !newWarmupStatus) {
      console.log(
        "All parameters (mainEmail, warmupEmail, newWarmupStatus) are required."
      );
      return { status: false, message: "Missing required parameters." };
    }

    const usersRef = db.collection(userCollectionName); // Assuming 'users' is the name of your collection
    const snapshot = await usersRef.where("email", "==", mainEmail).get();

    if (snapshot.empty) {
      console.log("No user found with the main email provided.");
      res.status(200).send({ status: false, message: "No user found." });
    }

    const userDoc = snapshot.docs[0];
    const warmupEmails = [...userDoc.data().warmupEmails]; // Make a copy of the warmupEmails array

    const foundIndex = warmupEmails.findIndex(
      (item) => item.email === warmupEmail
    );
    if (foundIndex === -1) {
      console.log("Warmup email not found in the user's warmupEmails array.");
      res
        .status(200)
        .send({ status: false, message: "Warmup email not found." });
    }

    // Update only the warmupStatus of the specific warmup email object
    warmupEmails[foundIndex].warmupStatus = newWarmupStatus;

    // Prepare the update object for Firestore
    const updateObject = {
      warmupEmails: warmupEmails,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(), // Update the updatedAt timestamp
    };

    await userDoc.ref.update(updateObject);
    console.log("Warmup status updated successfully for the specified email.");
    res
      .status(200)
      .send({ status: true, message: "Warmup status updated successfully." });
  } catch (error) {
    console.error(
      "userController/updateUserSpecificEmailWarmupStatus : ",
      error
    );
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "userController/updateUserSpecificEmailWarmupStatus : " + err
      );
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};
const updateUserDetails = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).send({ status: false, message: "Email is missing" });
    } else {
      // Load and parse the schema

      let schemaTemplate;
      try {
        schemaTemplate = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
      } catch (error) {
        console.error("Error reading schema file:", error);
        if (process.env.NODE_ENV === "production") {
          rollbar.error(
            "userController/updateUserDetails schemaTemplate : " + err
          );
        }
        return { status: false, message: "Failed to read user schema." };
      }

      const userEmail = email;
      const usersRef = db.collection(userCollectionName);
      const snapshot = await usersRef.where("email", "==", userEmail).get();

      if (!snapshot.empty) {
        // User exists, filter and prepare data for update
        const updateData = {};
        // Exclude 'email', 'createdAt', and 'updatedAt' from update data
        // Ensure only fields defined in the schema are updated
        Object.keys(data).forEach((key) => {
          if (
            !["email", "createdAt", "updatedAt"].includes(key) &&
            schemaTemplate.properties.hasOwnProperty(key)
          ) {
            updateData[key] = data[key];
          }
        });

        // Automatically update 'updatedAt' to the current timestamp
        updateData["updatedAt"] = admin.firestore.FieldValue.serverTimestamp();

        if (Object.keys(updateData).length === 0) {
          console.log("No valid fields provided for update.");
          res.status(200).send({
            status: false,
            message: "No valid fields provided for update.",
          });
        }

        const userDocRef = snapshot.docs[0].ref; // Get the reference to the document
        await userDocRef.update(updateData); // Update the document
        console.log("User details updated.");
        res
          .status(200)
          .send({ status: true, message: "User details updated." });
      } else {
        // No existing user found
        console.log("No existing user found with the provided email.");
        res
          .status(200)
          .send({ status: false, message: "No existing user found." });
      }
    }
  } catch (error) {
    console.error("userController/updateUserDetails: ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("userController/updateUserDetails  : " + err);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const getEmailSetupDetails = async (req, res) => {
  try {
    const { userEmail } = req.body;
    if (!userEmail) {
      console.error("Email cannot be empty.");
      res
        .status(200)
        .send({ status: false, message: "Email cannot be empty.", data: null });
    }

    const detailsRef = db.collection("emailSetupDetails");
    const snapshot = await detailsRef.where("email", "==", userEmail).get();

    if (snapshot.empty) {
      console.log("No details found for the provided email.");
      res.status(200).send({
        status: false,
        message: "No details found.",
        data: null,
      });
    } else {
      const userDetails = snapshot.docs[0].data(); // Assuming the first document is the one we need
      console.log("User details retrieved successfully.");
      res.status(200).send({
        status: true,
        message: "User details retrieved successfully.",
        data: userDetails,
      });
    }
  } catch (error) {
    console.error("userController/getEmailSetupDetails: ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("userController/getEmailSetupDetails  : " + err);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};
const setEmailDetails = async (req, res) => {
  try {
    const {
      userEmail,
      imapServer,
      imapPort,
      smtpServer,
      smtpPort,
      password,
      definedProvider,
    } = req.body;
    if (!userEmail) {
      console.error("Email cannot be empty.");
      return res
        .status(200)
        .send({ status: false, message: "Email cannot be empty.", data: null });
    }

    const detailsRef = db.collection("emailSetupDetails");
    const snapshot = await detailsRef.where("email", "==", userEmail).get();

    if (snapshot.empty) {
      console.log(
        "No details found for the provided email. Creating new document."
      );
      const newDocRef = detailsRef.doc(); // Generate a new document ID
      const newDocData = {
        accessToken: "", // Default value or generate a new one if needed
        apiKey: "",
        email: userEmail,
        expiresIn: "", // Default value or generate a new one if needed
        name: "", // Default value or get it from req.body if provided
        password,
        refreshToken: "", // Default value or generate a new one if needed
        serverDomain: smtpServer,
        imapServer,
        imapPort,
        smtpServer,
        smtpPort,
        tokenCreationAndUpdateTime: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      await newDocRef.set(newDocData);
      if (process.env.NODE_ENV === "production") {
        // Determine the server domain type
        // let serverDomainType = "other";
        // if (serverDomain.includes("google") || serverDomain.includes("gmail")) {
        //   serverDomainType = "gmail";
        // }

        mixpanel.track(`Connected_${definedProvider}`, {
          distinct_id: userEmail, // Use email as the unique identifier
          email: userEmail,
        });
      }

      res.status(200).send({
        status: true,
        message: "New document created successfully.",
        data: newDocData,
      });
    } else {
      const docRef = snapshot.docs[0].ref;
      const updatedData = {
        serverDomain: smtpServer,
        imapServer,
        imapPort,
        smtpServer,
        smtpPort,
        updatedAt: new Date().toISOString(),
      };
      await docRef.update(updatedData);
      const updatedDoc = await docRef.get();
      console.log("User details updated successfully.");
      res.status(200).send({
        status: true,
        message: "User details updated successfully.",
        data: updatedDoc.data(),
      });
    }
  } catch (error) {
    console.error("userController/setEmailDetails: ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("userController/setEmailDetails  : " + error);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

module.exports = {
  getUserAccountDetails,
  updateUserAccountDetails,
  updateUserSpecificEmailWarmupStatus,
  updateUserDetails,
  getEmailSetupDetails,
  setEmailDetails,
};
