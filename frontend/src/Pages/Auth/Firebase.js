// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBEo57bQ5iocvksfMLWkiGRiHaKiWfnrpg",
//   authDomain: "messangergpt.firebaseapp.com",
//   projectId: "messangergpt",
//   storageBucket: "messangergpt.appspot.com",
//   messagingSenderId: "1079401094909",
//   appId: "1:1079401094909:web:a5f4278b47516512e22894",
//   measurementId: "G-NQ0CGDQW0P",
//   databaseURL: "https://autoemailwarmup-default-rtdb.firebaseio.com/",
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyCPDCd6I4dsupHoqoOwXBpfKwr5Ue4SMic",
//   authDomain: "autoemailwarmup.firebaseapp.com",
//   databaseURL: "https://autoemailwarmup-default-rtdb.firebaseio.com",
//   projectId: "autoemailwarmup",
//   storageBucket: "autoemailwarmup.appspot.com",
//   messagingSenderId: "500392173422",
//   appId: "1:500392173422:web:0eecc4e98786f26b82eb7f",
//   measurementId: "G-38CDN4JLTF",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_API_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_API_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_API_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_API_FIREBASE_MEASUREMENT_ID,
};

// process.env.REACT_APP_API_BASE_URL

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// const microsoftProvider = new MicrosoftAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
  prompt: "consent",
  tenant: "f8cdef31-a31e-4b4a-93e4-5f571e91255a", // Replace with your tenant ID if necessary
});

const db = getFirestore(app);

// export { db };
export { auth, googleProvider, microsoftProvider, db };
