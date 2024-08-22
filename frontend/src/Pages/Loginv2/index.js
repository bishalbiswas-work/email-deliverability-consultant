import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider, microsoftProvider } from "../Auth/Firebase";
import { signInWithPopup } from "firebase/auth";

import DataContext from "ContextAPI/DataState";

export default function Loginv2() {
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  const [email, setEmail] = React.useState("");
  const [login, setLogin] = React.useState(false);
  const [error, setError] = React.useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status"); // 'success' or 'failed'
  const emailUrl = queryParams.get("email");
  const provider = queryParams.get("provider");
  const isSuccess = status === "success";

  //
  //
  useEffect(() => {
    async function main() {
      const loginEmail = localStorage.getItem("loginEmail") || "";

      if (!loginEmail) {
        return;
      } else {
        const data = await dataContext.postEmail(loginEmail);
        console.log("data in login ", data, loginEmail);
        if (data && data.status === true) {
          // Continue with your code here
          console.log("Email is valid");

          setEmail(email);
          setLogin(true);
          setError(false);
          console.log("Navigating user to login page");
          navigate("/dashboard");
        } else {
          setError(true);
          localStorage.setItem("loginEmail", "");
        }
      }
    }

    main();
  }, []);
  async function handleLogin(email) {
    console.log("email", email);
    //write a funciton which can check if the email is correct format
    try {
      const data = await dataContext.postEmail(email);
      console.log("data in login ", data);
      if (data && data.status === true) {
        // Continue with your code here
        console.log("Email is valid");
        dataContext.setIsLoggedIn(true);
        setEmail(email);
        setLogin(true);
        setError(false);
        localStorage.setItem("loginEmail", email);

        navigate("/dashboard");
      } else {
        // Execute else code here
        console.log("Email is invalid");
        setError(true);
      }
    } catch (error) {
      console.error("Login_v2 Error: ", error);
    }
  }
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      console.log(result.user.email);
      await handleLogin(result.user.email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMicrosoftLogin = async () => {
    // try {
    //   const result = await signInWithPopup(auth, microsoftProvider);
    //   console.log(result.user);
    //   console.log(result.user.email);
    //   await handleLogin(result.user.email);
    // } catch (error) {
    //   console.error(error);
    // }
    window.location.href = `${dataContext.API_BASE_URL}/api/auth/microsoft/login`;
  };

  useEffect(() => {
    async function main() {
      if (isSuccess) {
        // console.log("GOt email: ", emailUrl);
        await handleLogin(emailUrl);
      } else {
        // setError(true);
      }
    }
    main();
  }, [isSuccess]);
  return (
    <div>
      {/* <div className="flex h-screen">
        <div className="w-1/2 bg-blue-500 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-8">
            <div className="bg-blue-300 w-3/4 p-4 text-center">
              Left Section 1
            </div>
            <div className="bg-blue-400 w-3/4 p-4 text-center">
              Left Section 2
            </div>
            <div className="bg-blue-500 w-3/4 p-4 text-center">
              Left Section 3
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-green-500 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-8">
            <div className="bg-green-300 w-3/2 p-4 text-center">
              <div className="flex flex-direction-columns">
                <div>Right Section 1</div>
                <div>Right Section 1</div>
              </div>
            </div>

            <div className="bg-green-400 w-3/4 p-4 text-center">
              Right Section 2
            </div>
            <div className="bg-green-500 w-3/4 p-4 text-center">
              Right Section 3
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="w-1/2 ">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-orange-500">
              🔥 Email Warmup
            </h1>
          </div>

          <div className="flex items-center justify-center p-8 bg-white ">
            <div className="flex flex-col items-center space-y-4  p-6 rounded-md">
              <p className="text-lg text-gray-600 mb-12">
                Sign in to your EmailWarmup account
              </p>
              {error && (
                <p className="mt-1 text-center text-red-300 ">
                  An Account with this Email Address Does Not Exist
                </p>
              )}
              <button
                className="flex items-center justify-center w-full p-2  rounded-md shadow-md bg-white text-black"
                onClick={handleGoogleLogin}
              >
                <FcGoogle style={{ marginRight: "10px" }} />
                Sign In with Google
              </button>
              <button
                className="flex items-center justify-center w-full p-2 border rounded-md shadow-md bg-white text-black"
                onClick={handleMicrosoftLogin}
              >
                <img
                  src="/images/outlook_logo.png"
                  alt="Outlook"
                  className="h-6 mr-2"
                />
                Sign In with Outlook
              </button>
              <div style={{ height: "50px" }}></div>
              <p className="text-xs text-gray-500 ">
                By signing up, you are agreeing to our{" "}
                <a href="/privacy-policy" className="text-blue-500 underline">
                  Terms of Service and Privacy Policy.
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Right Section */}

        <div className="w-1/2 flex flex-col items-center justify-center space-y-4 p-8 bg-gradient-to-r from-orange-100 to-yellow-100">
          <div className="flex justify-center space-x-8">
            <div>
              <img src="/images/g2_crowd.png" />
            </div>
            <div>
              <img src="/images/trustpilot.png" />
            </div>
          </div>
          <div style={{ height: "100px" }}></div>

          <div className="flex justify-center">
            <img src="/images/autoemail_review_1.png" />
          </div>
          <div style={{ height: "30px" }}></div>

          <div className="flex flex-col items-center p-4 rounded-md">
            <p className="text-xl">Join thousands of users who trust</p>
            <p className="text-xl">
              <span className="text-orange-500">Autoemailwarmup</span> to boost
              their business
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
