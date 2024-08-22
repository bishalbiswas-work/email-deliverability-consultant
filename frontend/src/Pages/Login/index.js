import React, { useEffect } from "react";
import { Button, Img, Input, Line, Text } from "components";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import DataContext from "ContextAPI/DataState";

export default function Login() {
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  const [email, setEmail] = React.useState("");
  const [login, setLogin] = React.useState(false);
  const [error, setError] = React.useState(false);
  async function handleLogin() {
    console.log("email", email);
    //write a funciton which can check if the email is correct format
    const res = validateEmail(email);
    console.log("res", res);
    if (res) {
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
    } else {
      setError(true);
    }
  }
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

          navigate("/dashboard");
        } else {
          localStorage.setItem("loginEmail", "");
        }
      }
    }

    main();
  }, []);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <div>
      <div
        className="bg-gradient1  flex flex-col font-inter sm:gap-10 md:gap-10 gap-[132px] items-center justify-start mx-auto p-8 sm:px-5 w-full"
        style={{ height: "100vh", background: "white" }}
      >
        <header className="bg-white-A700 flex md:gap-10 items-center justify-between p-5 md:px-5 rounded-[20px] shadow-bs1 w-full">
          <div className="flex flex-row font-dmserifdisplay gap-1.5 items-center justify-center w-auto">
            <Img
              className="h-6 md:h-auto object-fit "
              src="images2/img_.png"
              alt="Three"
            />
            <Text
              className="bg-clip-text capitalize text-transparent text-xl w-auto"
              size="txtDMSerifDisplayRegular20"
              style={{ color: "#f68714" }}
            >
              Email warmup
            </Text>
          </div>

          {/* <Button
              className="cursor-pointer flex items-center justify-center min-w-[130px]"
              rightIcon={
                <Img
                  className="h-4 ml-1 my-px"
                  src="images/img_icfluentarrowdown24filled_1.svg"
                  alt="ic_fluent_arrow_down_24_filled 1"
                />
              }
              shape="round"
              color="purple_A700_amber_400"
            >
              <div className="font-poppins font-semibold text-center text-xs">
                Get Started
              </div>
            </Button> */}
        </header>

        <div className="w-[400px]">
          <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md ">
            <div className="px-6 py-4">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="images2/img_.png"
                  alt=""
                />
              </div>

              <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">
                Welcome Back
              </h3>

              {/* <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                Login or create account
              </p> */}
              {error && (
                <p className="mt-1 text-center text-red-300 ">
                  Please enter correct email!
                </p>
              )}

              {/* <form> */}
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* <div className="w-full mt-4">
                  <input
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                  />
                </div> */}

              <div className="flex items-center justify-between mt-4">
                {/* <a
                    href="#"
                    className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                  >
                    Forget Password?
                  </a> */}
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-500"
                >
                  {/* Contact Us */}
                </a>

                <button
                  className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  style={{
                    background: "#F0C419",
                    color: "white",
                  }}
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </button>
              </div>
              {/* </form> */}
            </div>

            {/* <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-200">
                Don't have an account?{" "}
              </span>

              <a
                href="#"
                className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
              >
                Register
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
