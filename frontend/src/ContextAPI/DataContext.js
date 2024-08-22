import React from "react";
import DataContext from "./DataState";
import { useState, useEffect } from "react";
import axios from "axios";

// Firebase
import { db } from "../Pages/Auth/Firebase";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getDatabase, ref, onValue, off, get, remove } from "firebase/database";

// End Firebase
const DataState = (props) => {
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";
  const APP_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
  // const APP_ID = "834715744964121";
  // const APP_SECRET = "2582a389247cbe3902699eea25594d1d";
  const [appID, setAppID] = useState("834715744964121");

  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const [uid, setUid] = useState("");
  const [docId, setDocId] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setIsLoggedIn(true);
      console.log("User Logged In");
    }
  }, []);
  const setonboardingUserDetails = ({ email, name }) => {
    setUserDetails({
      email: email,
      name: name,
    });
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const setAuthTokenFunction = ({ data }) => {
    setAuthToken(data);
    setIsLoggedIn(true);
  };
  const setUidFunction = ({ data }) => {
    setUid(data);
  };
  const setEmailFunction = ({ data }) => {
    console.log("email updated: ", data);
    setEmail(data);
  };

  async function postEmail(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("response", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function getUserDetails(email) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user/get-user-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      const data = await response.json();
      console.log("response", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function updateUserDetails(dataVal) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/update-user-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataVal),
      });

      const data = await response.json();
      console.log("response", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function updateUserEmailWarmupStatus(dataVal) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user/update-user-warmupstatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataVal),
        }
      );

      const data = await response.json();
      console.log("response", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function emailSignup(email) {
    const endpoint = `${API_BASE_URL}/api/auth/signup-new`;
    const data = {
      email: email, // Assuming the API expects an object with an email property
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type in the header
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a string
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw an error if response is not ok
      }

      const result = await response.json(); // Assuming the server responds with JSON
      console.log("Email sent successfully:", result);
      return result; // Return the result for further processing
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  async function newWarmupEmail(data) {
    const endpoint = `${API_BASE_URL}/api/auth/add-warmup-email`;

    try {
      const response = await fetch(endpoint, {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type in the header
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a string
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw an error if response is not ok
      }

      const result = await response.json(); // Assuming the server responds with JSON
      console.log("Email sent successfully:", result);
      return result; // Return the result for further processing
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async function removeWarmupEmail(data) {
    const endpoint = `${API_BASE_URL}/api/auth/delete-warmup-email`;

    try {
      const response = await fetch(endpoint, {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type in the header
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a string
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw an error if response is not ok
      }

      const result = await response.json(); // Assuming the server responds with JSON
      console.log("Email sent successfully:", result);
      return result; // Return the result for further processing
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  // async function newWarmupEmailSetup(data) {
  //   const endpoint = `${API_BASE_URL}/api/create-new-email-warmup-setup`;

  //   try {
  //     const response = await fetch(endpoint, {
  //       method: "POST", // Specify the request method
  //       headers: {
  //         "Content-Type": "application/json", // Specify the content type in the header
  //       },
  //       body: JSON.stringify(data), // Convert the JavaScript object to a string
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`); // Throw an error if response is not ok
  //     }

  //     const result = await response.json(); // Assuming the server responds with JSON
  //     console.log("Email sent successfully:", result);
  //     return result; // Return the result for further processing
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     throw error; // Rethrow the error to be handled by the caller
  //   }
  // }
  async function getWarmupEmailSetup(data) {
    const endpoint = `${API_BASE_URL}/api/user/get-email-warmup-setup`;

    try {
      const response = await fetch(endpoint, {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type in the header
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a string
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw an error if response is not ok
      }

      const result = await response.json(); // Assuming the server responds with JSON
      console.log("Email sent successfully:", result);
      return result; // Return the result for further processing
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  async function checkEmailProvider(data) {
    const endpoint = `${API_BASE_URL}/api/auth/check-email-provider`;

    try {
      const response = await fetch(endpoint, {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type in the header
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a string
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw an error if response is not ok
      }

      const result = await response.json(); // Assuming the server responds with JSON
      console.log("Email sent successfully:", result);
      return result; // Return the result for further processing
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  // async function setEmailDetailsNow(data) {
  //   const endpoint = `${API_BASE_URL}/api/user/set-email-keys`;

  //   try {
  //     const response = await fetch(endpoint, {
  //       method: "POST", // Specify the request method
  //       headers: {
  //         "Content-Type": "application/json", // Specify the content type in the header
  //       },
  //       body: JSON.stringify(data), // Convert the JavaScript object to a string
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status}`); // Throw an error if response is not ok
  //     }

  //     const result = await response.json(); // Assuming the server responds with JSON
  //     console.log("Email sent successfully:", result);
  //     return result; // Return the result for further processing
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     throw error; // Rethrow the error to be handled by the caller
  //   }
  // }

  async function setEmailDetailsNow(data) {
    const endpoint = `${API_BASE_URL}/api/user/set-email-keys`;

    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "application/json", // Specify the content type in the header
        },
      });

      console.log("Email sent successfully:", response.data);
      return response.data; // Return the result for further processing
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  async function verifyEmailCredentials(data) {
    const endpoint = `${API_BASE_URL}/api/auth/verify-email-credential`;

    try {
      const response = await fetch(endpoint, {
        method: "POST", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type in the header
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a string
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Throw an error if response is not ok
      }

      const result = await response.json(); // Assuming the server responds with JSON
      console.log("Email sent successfully:", result);
      return result; // Return the result for further processing
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  // async function openPaymentPage() {
  //   window.location.href = `${API_BASE_URL}/payment`;
  // }
  async function openPaymentPage() {
    // Check if the email is provided, if not, just navigate to the payment page without parameters
    // console.log("Email X: ", email);
    const email = localStorage.getItem("loginEmail") || "";
    const url = email
      ? `${API_BASE_URL}/api/payment?email=${email}`
      : `${API_BASE_URL}/api/payment`;
    window.location.href = url;
  }
  async function openPaymentDebitCardPage() {
    // Check if the email is provided, if not, just navigate to the payment page without parameters
    // console.log("Email X: ", email);
    const email = localStorage.getItem("loginEmail") || "";
    const url = email
      ? `${API_BASE_URL}/api/payment/debit-card?email=${email}`
      : `${API_BASE_URL}/api/payment/debit-card`;
    window.location.href = url;
  }
  // async function checkPaymentStatus() {}
  async function checkPaymentStatus() {
    const db = getDatabase(); // Get the Firebase Database instance
    // const dbRef = ref(db, `AutoSEO-Blogs/${uid}`); // Create a reference to the user-specific path in the database

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
    var email = localStorage.getItem("loginEmail");

    if (email) {
      email = sanitizeEmail(email);
      console.log("Sanitized Email: ", email);
      const dbRef = ref(db, `Users/${email}`);
      // Function to handle data change events
      const unsubscribe = onValue(
        dbRef,
        (snapshot) => {
          const dbData = snapshot.val(); // Extract data from snapshot
          console.log("Realtime DB: ", dbData); // Log the data from the database

          if (dbData) {
            // setData(dbData); // Set the blogs state with the new data
            // setDataLoaded(true); // Set data loaded state to true
            console.log("Realtime Data: ", dbData);
            if (!dbData.paymentDetails?.status) {
              setShowPaymentPopup(true);
              console.log("User do not have valid payment method attacted");
            } else {
              setShowPaymentPopup(false);
            }
          }
        },
        {
          onlyOnce: false, // Keep listening to changes, not just once
        }
      );

      // Cleanup function to unsubscribe from the database changes when the component unmounts
      return () => unsubscribe();
    }
  }
  useEffect(() => {
    checkPaymentStatus();
  }, []); // This effect runs whenever the `uid` state changes
  useEffect(() => {
    checkPaymentStatus();
  }, [isLoggedIn]);

  return (
    <DataContext.Provider
      value={{
        APP_URL,
        API_BASE_URL,
        appID,
        authToken,
        uid,
        name,
        email,
        setEmail,

        setonboardingUserDetails,

        docId,

        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,

        setAuthTokenFunction,
        setUidFunction,
        setEmailFunction,
        showPaymentPopup,
        setShowPaymentPopup,
        postEmail,
        emailSignup,
        newWarmupEmail,
        getUserDetails,
        updateUserDetails,
        updateUserEmailWarmupStatus,
        openPaymentPage,
        openPaymentDebitCardPage,
        // newWarmupEmailSetup,
        getWarmupEmailSetup,
        checkPaymentStatus,
        checkEmailProvider,
        setEmailDetailsNow,
        removeWarmupEmail,
        verifyEmailCredentials,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export default DataState;
