import * as React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CircularProgress from "@mui/material/CircularProgress";

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Img,
  Text,
  Button,
  Heading,
  Input,
  Radio,
  RadioGroup,
} from "../../components";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";

// Import Context
import { useContext } from "react";
import DataContext from "../../ContextAPI/DataState";
import LinearProgress from '@mui/material/LinearProgress';

// Import Components
import GmailAccountAccess from "Pages/Auth/GoogleAccountAccess";
const emailProvidersList = [
  // {
  //   text: "Salesforce ( Comming Soon )",
  //   logo: "/images2/emailproviders/salesforce.png",
  //   imapHost: "",
  //   imapPort: 0,
  //   smtpHost: "",
  //   smtpPort: 0,
  // },
  {
    text: "Gmail",
    logo: "/images2/emailproviders/gmail.png",
    imapHost: "",
    imapPort: 0,
    smtpHost: "",
    smtpPort: 0,
  },
  {
    text: "Outlook",
    logo: "/images2/emailproviders/outlook.png",
    imapHost: "",
    imapPort: 0,
    smtpHost: "",
    smtpPort: 0,
  },
  {
    text: "Zoho",
    logo: "/images2/emailproviders/zoho.png",
    imapHost: "imap.zoho.com",
    imapPort: 993,
    smtpHost: "smtp.zoho.com",
    smtpPort: 587,
  },
  {
    text: "Zoho Custom Domain",
    logo: "/images2/emailproviders/zoho.png",
    imapHost: "imappro.zoho.com",
    imapPort: 993,
    smtpHost: "smtppro.zoho.com",
    smtpPort: 587,
  },

  {
    text: "Zoho EU",
    logo: "/images2/emailproviders/zoho.png",
    imapHost: "imappro.zoho.eu",
    imapPort: 993,
    smtpHost: "smtppro.zoho.eu",
    smtpPort: 587,
  },
  {
    text: "Aol",
    logo: "/images2/emailproviders/aol.png",
    imapHost: "imap.aol.com",
    imapPort: 993,
    smtpHost: "smtp.aol.com",
    smtpPort: 587,
  },
  {
    text: "Smpt",
    logo: "/images2/emailproviders/smtp.png",
    imapHost: "",
    imapPort: 0,
    smtpHost: "",
    smtpPort: 0,
  },
  {
    text: "Other",
    logo: "",
    imapHost: "",
    imapPort: 0,
    smtpHost: "",
    smtpPort: 0,
  },
  // {
  //   text: "Select your email provider",
  //   logo: "",
  //   imapHost: "",
  //   imapPort: 0,
  //   smtpHost: "",
  //   smtpPort: 0,
  // },
];
export default function AppPasswordv2({ email, leftProp, setLeftProp }) {
  const dataContext = useContext(DataContext);

  const [isOpen, setIsOpen] = React.useState(leftProp);
  const [providerType, setProviderType] = React.useState("");
  const [emailServer, setEmailServer] = React.useState("");

  const [appPassword, setAppPassword] = React.useState(""); // State to hold the input value
  const [error, setError] = React.useState(false); // State to hold the error message
  const [accessToken, setAccessToken] = React.useState(null);
  const [openPopUpVideoPlay, setOpenPopUpVideoPlay] = React.useState(false);
  const [errorImap, setErrorImap] = React.useState(false);
  const [errorSmtp, setErrorSmtp] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [emailCredLoader, setEmailCredLoader] = useState(false);
  const [isVisibleServerDetails, setIsVisibleServerDetails] =
    React.useState(true);
  const [progress, setProgress] = React.useState(0);

  // Function to close the drawer
  const closeDrawer = () => {
    setIsOpen(false);
    setLeftProp(false);
  };

  useEffect(() => {
    async function fetch() {
      const data = { email: email };

      console.log("Email Provider Data : ", data);
      const response = await dataContext.checkEmailProvider(data);
      console.log("Email Provider: ", response);
      setProviderType(response.provider);
      setEmailServer(response.smtpServer);
      if (response.provider === "Outlook") {
        handleMicrosoftLogin();
      } else if (response.provider === "Gmail") {
        // handleNylasGoogleLogin();
      }
    }
    if (email) {
      fetch();
    }
    console.log("Email GOt", email);
  }, [email]);

  const handleSubmit = async () => {
    console.log("Submitted App Password:", appPassword); // Log the submitted password
    const data = {
      userEmail: email,
      password: appPassword,
      serverDomain: emailServer,
      apiKey: "",
    };
    if (!appPassword) {
      setError(true);
      return;
    }
    try {
      const res = await dataContext.setEmailDetails(data);
      if (res.status) {
        setError(false);
        closeDrawer(); // Assuming closeDrawer is a method to close a modal or similar component
      } else {
        setError(true);
        console.error("Error: The API call was unsuccessful."); // Optional: log the error message
      }
      if (emailServer === "smtp.gmail.com") {
        setOpenPopUpVideoPlay(true);
        // closeDrawer();
      }
    } catch (error) {
      setError(true);
      console.error("Error during newWarmupEmailSetup: ", error); // Log the error
    }

    setAppPassword(""); // Clear the input value after submission
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const handleSubmit_ImpaandSmtp = async (
    email,
    password,
    imapServer,
    imapPort,
    smtpServer,
    smtpPort,
    definedProvider
  ) => {
    const data = {
      userEmail: email,
      password: password,
      imapServer: imapServer,
      imapPort: imapPort,
      smtpServer: smtpServer,
      smtpPort: smtpPort,
      definedProvider: definedProvider,
    };

    try {
      console.log("Data: ", data);
      setProgress(0)
      setEmailCredLoader(true);
      const res = await dataContext.verifyEmailCredentials(data);
      console.log("Res: ", res);
      if (res.imapConnection && res.smtpConnection) {
        setError(false);
        setErrorPassword(false);
        setErrorImap(false);
        setErrorSmtp(false);

        const res2 = await dataContext.setEmailDetailsNow(data);
        console.log("Saving email cred: ", res2);
        if (res2.status) {
          setProgress(100)
          await delay(2000)
          setEmailCredLoader(false);
          closeDrawer();
          window.location.reload();
        } else {
          setError(true);
          setProgress(100)
          await delay(2000)
          setEmailCredLoader(false);
        }
      } else if (!res.imapConnection && !res.smtpConnection) {
        setErrorPassword(true);

        setErrorImap(true);
        setErrorSmtp(true);
        setProgress(100)
        await delay(2000)
        setEmailCredLoader(false);
      } else if (res.imapConnection && !res.smtpConnection) {
        setErrorPassword(true);

        setErrorImap(false);
        setErrorSmtp(true);
        setProgress(100)
        await delay(2000)
        setEmailCredLoader(false);
      } else if (!res.imapConnection && res.smtpConnection) {
        setErrorPassword(true);

        setErrorImap(true);
        setErrorSmtp(false);
        setProgress(100)
        await delay(2000)
        setEmailCredLoader(false);
      } else if (!res.passwordCorrect) {
        setErrorPassword(true);
        setProgress(100)
        await delay(2000)
        setEmailCredLoader(false);
      } else {
        setError(true);
        setProgress(100)
        await delay(2000)
        setEmailCredLoader(false);

        console.error("Error: The API call was unsuccessful."); // Optional: log the error message
      }
    } catch (error) {
      setError(true);
      setProgress(100)
      setEmailCredLoader(false);
      console.error("Error during newWarmupEmailSetup: ", error); // Log the error
    }
  };
  const handleClosePopVideoPlay = () => {
    setOpenPopUpVideoPlay(false); // Close dialog
  };

  // Function to handle drawer toggle
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return; // Do nothing if the event is a Tab or Shift keydown event
    }
    if (event) {
      event.stopPropagation(); // Stop event propagation
    }
    setIsOpen(open); // Set the open state based on the argument
  };

  React.useEffect(() => {
    setIsOpen(leftProp); // Update isOpen when leftProp changes
  }, [leftProp]);

  const handleGoogleLogin = () => {
    // Open a new window with the provided URL
    window.open(
      `${dataContext.API_BASE_URL}/api/auth/google`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const handleNylasGoogleLogin = () => {
    // Open a new window with the provided URL
    window.open(
      `${dataContext.API_BASE_URL}/api/auth/google-nylas`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const handleMicrosoftLogin = () => {
    // Open a new window with the provided URL
    window.open(
      `${dataContext.API_BASE_URL}/api/auth/microsoft`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const [isDropdownOpenEmailProvider, setIsDropdownOpenEmailProvider] =
    useState(false);
  const [selectedEmailProvider, setSelectedEmailProvider] = useState({
    text: "",
    logo: "",
    imapHost: "",
    imapPort: 0,
    smtpHost: "",
    smtpPort: 0,
  });

  const handleToggleEmailProvider = () =>
    setIsDropdownOpenEmailProvider(!isDropdownOpenEmailProvider);

  const handleSelectEmailProvider = (emailProvider) => {
    setSelectedEmailProvider(emailProvider);
    setIsDropdownOpenEmailProvider(false);
  };
  // useEffect(() => {
  //   console.log("selectedEmailProvider : ", selectedEmailProvider);
  // }, [selectedEmailProvider]);

  const handleGetAccessToken = () => {
    if (providerType === "Outlook") {
      handleMicrosoftLogin();
    } else if (providerType === "Gmail") {
      handleNylasGoogleLogin();
    } else {
      const { text, imapHost, imapPort, smtpHost, smtpPort } =
        selectedEmailProvider;

      if (!imapHost || !imapPort || !smtpHost || !smtpPort) {
        // At least one field is empty
        setError(true);
        setIsVisibleServerDetails(true);
        console.log("One or more fields are empty");
      } else {
        // All fields are filled
        console.log("All fields are filled");
        handleSubmit_ImpaandSmtp(
          email,
          appPassword,
          imapHost,
          imapPort,
          smtpHost,
          smtpPort,
          text
        );
      }
    }
  };

  // // Constants for state management
  // const STATES = {
  //   LOADING: "loading",
  //   ERROR: "error",
  //   SUCCESS: "success",
  //   NONE: "none",
  // };

  // // Error types for specific troubleshooting
  // const ERROR_TYPES = {
  //   PASSWORD: "password",
  //   IMAP: "imap",
  //   SMTP: "smtp",
  //   GENERAL: "general",
  // };

  // // Utility to set loading state
  // const setLoadingState = (state) => {
  //   setEmailCredLoader(state === STATES.LOADING);
  // };

  // // Utility to handle errors
  // const handleError = (type, isImap = false, isSmtp = false) => {
  //   setError(type === ERROR_TYPES.GENERAL);
  //   setErrorPassword(type === ERROR_TYPES.PASSWORD);
  //   setErrorImap(isImap);
  //   setErrorSmtp(isSmtp);
  //   setLoadingState(STATES.NONE);
  // };

  // // Function to update email credentials
  // async function updateEmailCredentials(data) {
  //   try {
  //     setLoadingState(STATES.LOADING);
  //     console.log("Data: ", data);
  //     const res = await dataContext.verifyEmailCredentials(data);
  //     console.log("Res: ", res);
  //     handleResponse(res, data);
  //   } catch (error) {
  //     handleError(ERROR_TYPES.GENERAL);
  //     console.error("Error during newWarmupEmailSetup: ", error);
  //   }
  // }

  // // Function to handle response from email credential verification
  // async function handleResponse(res, data) {
  //   if (res.imapConnection && res.smtpConnection) {
  //     console.log("Saving email cred: ", res);
  //     const res2 = await dataContext.setEmailDetailsNow(data);
  //     if (res2.status) {
  //       setLoadingState(STATES.NONE);
  //       closeDrawer();
  //     } else {
  //       handleError(ERROR_TYPES.GENERAL);
  //     }
  //   } else {
  //     analyzeConnectionIssues(res);
  //   }
  // }

  // // Function to analyze connection issues
  // function analyzeConnectionIssues(res) {
  //   if (!res.imapConnection && !res.smtpConnection) {
  //     handleError(ERROR_TYPES.PASSWORD, true, true);
  //   } else if (res.imapConnection && !res.smtpConnection) {
  //     handleError(ERROR_TYPES.PASSWORD, false, true);
  //   } else if (!res.imapConnection && res.smtpConnection) {
  //     handleError(ERROR_TYPES.PASSWORD, true, false);
  //   } else if (!res.passwordCorrect) {
  //     handleError(ERROR_TYPES.PASSWORD);
  //   }
  // }

  // // Function to handle token access based on provider
  // const handleGetAccessToken = () => {
  //   switch (providerType) {
  //     case "Outlook":
  //       handleMicrosoftLogin();
  //       break;
  //     case "Gmail":
  //       handleNylasGoogleLogin();
  //       break;
  //     default:
  //       verifyServerDetails(selectedEmailProvider);
  //       break;
  //   }
  // };

  // // Function to verify server details before submission
  // const verifyServerDetails = ({
  //   text,
  //   imapHost,
  //   imapPort,
  //   smtpHost,
  //   smtpPort,
  // }) => {
  //   if (!imapHost || !imapPort || !smtpHost || !smtpPort) {
  //     setError(true);
  //     setIsVisibleServerDetails(true);
  //     console.log("One or more fields are empty");
  //   } else {
  //     console.log("All fields are filled");
  //     handleSubmit_ImpaandSmtp(
  //       email,
  //       appPassword,
  //       imapHost,
  //       imapPort,
  //       smtpHost,
  //       smtpPort,
  //       text
  //     );
  //   }
  // };


  useEffect(() => {
    if (selectedEmailProvider.text === "Gmail") {
      // handleNylasGoogleLogin();
    }
    else if (selectedEmailProvider.text === "Outlook") {
      handleMicrosoftLogin();
    }
  }, [selectedEmailProvider])

  return (
    <div className="" style={{ background: "white" }}>
      <React.Fragment>
        <SwipeableDrawer
          anchor="right"
          open={isOpen}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
          style={{ zIndex: 1200 }} // Ensure the drawer has a suitable z-index
        >
          {/* Assuming AppPasswordSection is a component you've defined elsewhere */}
          {/* Pass closeDrawer function so the child component can close the drawer if needed */}
          <div style={{ maxWidth: "800px" }}>
            {/* access grant section */}
            {!emailCredLoader &&
              <div className="w-full bg-white-A700">
                {/* access grant header section */}
                <div
                  className="flex items-center justify-center bg-yellow-900_0c p-6 sm:flex-col sm:p-5"
                  style={{ background: "#fef4e8" }}
                >
                  {/* close button row section */}
                  <div className="flex flex-1 items-center justify-center gap-3 sm:self-stretch">
                    <Button
                      variant="outline"
                      shape="circle"
                      // color="amber_A400_deep_orange_500"
                      className="!rounded-[18px] w-[36px]"
                    >
                      {/* <Img src="images/img_close.svg" /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </Button>

                    {/* access grant title section */}
                    <div className="flex">
                      <Text
                        as="p"
                        className="tracking-[0.18px] self-end !text-gray-900"
                      >
                        Grant access to your mail
                      </Text>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      console.log("close button clicked");
                      // toggleDrawer("right", false);
                      closeDrawer();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>

                {/* email connect section */}
                <div className="flex flex-col items-start gap-7 border-b border-solid border-gray-200 bg-white-A700 p-6 sm:p-5">
                  <div
                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                    role="alert"
                  >
                    <span className="font-medium">{email}</span> added
                    successfully, connect email now!
                  </div>

                  {/* email input section */}
                  <div className="flex flex-col gap-5 self-stretch">
                    {/* service provider selection section */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-start">

                      </div>

                      <RadioGroup name="selectservice1" className="flex">
                        {providerType === "Gmail" && (
                          <Radio
                            // defaultChecked={providerType === "Gmail" ? true : false}
                            defaultChecked={true}
                            value="Gmail1"
                            label="Gmail"
                            // checked={providerType === "Gmail"}
                            checked={true}
                            className="rounded-[10px] py-[18px] gap-[35px] pr-[35px] w-full border border-deep_purple-500 bg-deep_purple-A200_0c bg-gradient5 bg-clip-text text-sm font-bold  sm:pr-5 px-2"
                            onClick={() => {
                              // handleGoogleLogin();
                              setProviderType("Gmail");
                            }}
                            style={{
                              background:
                                providerType === "Gmail" ? "purple" : "",
                            }}
                          />
                        )}
                        {providerType === "Other" && (
                          <div className="flex space-x-4">
                            <div
                              className="flex-1 relative inline-block text-left bg-white"
                              style={{ width: "450px" }}
                            >
                              <Text size="xs" as="p">
                                Select service provider{" "}
                                <span style={{ color: "red" }}>*</span>{" "}
                              </Text>
                              <button
                                onClick={handleToggleEmailProvider}
                                className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-700 flex items-center justify-between w-full py-4 mt-2"
                              >
                                {selectedEmailProvider ? (
                                  <div className="flex justify-between w-full">
                                    <span
                                      className={
                                        !selectedEmailProvider.text
                                          ? "text-gray-400"
                                          : "text-black"
                                      }
                                    >
                                      {selectedEmailProvider.text || "Select a provider"}
                                    </span>
                                    {selectedEmailProvider.logo && (
                                      <img
                                        src={selectedEmailProvider.logo}
                                        alt={selectedEmailProvider.text}
                                        className="w-5 h-5"
                                      />
                                    )}
                                  </div>
                                ) : (
                                  "Select your email provider"
                                )}
                                <svg
                                  className="ml-2 w-5 h-5 fill-current text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 10l5 5 5-5H7z"
                                  />
                                </svg>
                              </button>
                              {isDropdownOpenEmailProvider && (
                                <div>
                                  <div
                                    className="absolute right-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
                                    style={{
                                      // width: "450px",
                                      background: "white",
                                    }}
                                  >
                                    {emailProvidersList.map(
                                      (emailProvider, index) => (
                                        <button
                                          key={index}
                                          onClick={() =>
                                            handleSelectEmailProvider(
                                              emailProvider
                                            )
                                          }
                                          className="flex justify-between items-center px-4 py-3 w-full text-gray-700 hover:bg-gray-100"
                                        >
                                          <span>{emailProvider.text}</span>
                                          {emailProvider.logo && (
                                            <img
                                              src={emailProvider.logo}
                                              alt={emailProvider.text}
                                              className=" h-5"
                                            />
                                          )}
                                        </button>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            {selectedEmailProvider.text != "Gmail" && <div className="flex-1">
                              <div className="flex flex-col items-start gap-3" style={{ background: "white" }}>
                                <div className="flex flex-wrap items-start">
                                  <Text size="xs" as="p">
                                    {providerType === "Other" && "Email password"}
                                    <span style={{ color: "red" }}>*</span>{" "}
                                  </Text>
                                </div>

                                <input
                                  type="text"
                                  placeholder="Enter your password"
                                  className={`input input-bordered border-gray-300 w-full py-3 px-4 rounded-xl ${!selectedEmailProvider.text ? "bg-gray-200 cursor-not-allowed" : "bg-white"
                                    }`}
                                  value={appPassword} // Bind input value to state
                                  onChange={(e) => {
                                    setAppPassword(e.target.value);
                                  }} // Update state on input change
                                  disabled={!selectedEmailProvider.text} // Disable input if selectedEmailProvider.text is empty
                                />
                              </div>
                              {errorPassword && (
                                <p
                                  as="p"
                                  className="my-2"
                                  style={{ color: "red", fontSize: "12px" }}
                                >
                                  Please make sure password is correct.
                                </p>
                              )}
                            </div>}

                          </div>
                        )}
                        {providerType === "Outlook" && (
                          <Radio
                            // disabled
                            value="outlook1"
                            label="Outlook"
                            checked={providerType === "Outlook"}
                            className="rounded-[10px] py-[18px] gap-[35px] pr-[35px] ml-3 w-full border border-black-900_0c bg-white-A700 text-sm font-semibold text-blue_gray-900 sm:pr-5 px-2"
                            onClick={() => {
                              handleMicrosoftLogin();
                            }}
                            style={{
                              background:
                                providerType === "Outlook" ? "purple" : "",
                            }}
                          />
                        )}
                      </RadioGroup>
                    </div>
                    {selectedEmailProvider.text !==
                      "Salesforce ( Comming Soon )" && (
                        <div>
                          {providerType === "Other" && (
                            <div>
                              {/* <div className="flex flex-col items-start gap-3">
                            <div className="flex flex-wrap items-start">
                              <Text size="xs" as="p">
                                {providerType === "Gmail" &&
                                  "Email app password"}
                                {providerType === "Other" && "Email password"}
                                <span style={{ color: "red" }}>*</span>{" "}
                              </Text>
                            </div>

                            <input
                              type="text"
                              placeholder="Enter your app password"
                              className="input input-bordered w-full bg-white "
                              value={appPassword} // Bind input value to state
                              onChange={(e) => {
                                setAppPassword(e.target.value);
                              }} // Update state on input change
                            />
                          </div> */}
                              {/* {errorPassword && (
                            <p
                              as="p"
                              className="my-2"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              Please make sure password is correct.
                            </p>
                          )} */}
                            </div>
                          )}
                          {providerType === "Other" && (
                            <div>
                              {selectedEmailProvider.text !== "Gmail" && selectedEmailProvider.text !== "" &&
                                <div>

                                  <div className="flex flex-col items-start gap-3">
                                    <div
                                      className="w-full my-4"
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <button
                                        onClick={() => {
                                          setIsVisibleServerDetails(
                                            !isVisibleServerDetails
                                          );
                                        }}
                                        className="text-gray-500 underline hover:text-gray-700 text-sm flex items-center"
                                      >
                                        {isVisibleServerDetails
                                          ? "Add your server details"
                                          : "Hide your server details"}
                                        {isVisibleServerDetails ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                            />
                                          </svg>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                            />
                                          </svg>
                                        )}
                                      </button>
                                    </div>

                                    {isVisibleServerDetails && (
                                      <div>
                                        <div>
                                          <p className="mt-4 mb-2">Server information</p>
                                        </div>
                                        <div className="py-2"></div>

                                        <div style={{ display: "flex", gap: "10px" }}>
                                          <div style={{ flex: "70%" }}>
                                            <p className="text-xs text-gray-700 mb-1">
                                              IMAP host{" "}
                                              <span style={{ color: "red" }}>*</span>{" "}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder="Enter your Imap host"
                                              className="input input-bordered  border-gray-300 w-full py-3 px-4 rounded-xl "
                                              style={{ background: "white" }}
                                              value={selectedEmailProvider.imapHost || ""} // Bind input value to state
                                              // onChange={(e) => setSmtpHost(e.target.value)} // Update state on input change
                                              onChange={(e) =>
                                                setSelectedEmailProvider((prev) => ({
                                                  ...prev,
                                                  imapHost: e.target.value,
                                                }))
                                              }
                                            />
                                          </div>

                                          <div style={{ flex: "30%" }}>
                                            <p className="text-xs text-gray-700 mb-1">
                                              IMAP Port{" "}
                                              <span style={{ color: "red" }}>*</span>{" "}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder="933"
                                              className="input input-bordered border-gray-300 w-full py-3 px-4 rounded-xl "
                                              value={selectedEmailProvider.imapPort || ""}
                                              style={{ background: "white" }}
                                              // onChange={(e) => setSmtpPort(e.target.value)} // Update state on input change
                                              onChange={(e) =>
                                                setSelectedEmailProvider((prev) => ({
                                                  ...prev,
                                                  imapPort: e.target.value,
                                                }))
                                              }
                                            />
                                          </div>
                                        </div>
                                        {errorImap && (
                                          <p
                                            as="p"
                                            className="my-2"
                                            style={{ color: "red", fontSize: "12px" }}
                                          >
                                            Incorrect Imap Credentials provided. Please
                                            correct it to login.
                                          </p>
                                        )}
                                        <div className="my-6"></div>

                                        <div style={{ display: "flex", gap: "10px" }}>
                                          <div style={{ flex: "70%" }}>
                                            <p className="text-xs text-gray-700 mb-1">
                                              SMTP host{" "}
                                              <span style={{ color: "red" }}>*</span>{" "}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder="Enter your SMTP host"
                                              className="input input-bordered border-gray-300 w-full py-3 px-4 rounded-xl "
                                              value={selectedEmailProvider.smtpHost || ""}
                                              style={{ background: "white" }}
                                              onChange={(e) =>
                                                setSelectedEmailProvider((prev) => ({
                                                  ...prev,
                                                  smtpHost: e.target.value,
                                                }))
                                              }
                                            />
                                          </div>
                                          <div style={{ flex: "30%" }}>
                                            <p className="text-xs text-gray-700 mb-1">
                                              SMTP Port{" "}
                                              <span style={{ color: "red" }}>*</span>{" "}
                                            </p>
                                            <input
                                              type="text"
                                              placeholder="933"
                                              className="input input-bordered border-gray-300 w-full py-3 px-4 rounded-xl  "
                                              value={selectedEmailProvider.smtpPort || ""}
                                              style={{ background: "white" }}
                                              // onChange={(e) => setSmtpPort(e.target.value)} // Update state on input change
                                              onChange={(e) =>
                                                setSelectedEmailProvider((prev) => ({
                                                  ...prev,
                                                  smtpPort: e.target.value,
                                                }))
                                              }
                                            />
                                          </div>
                                        </div>
                                        {errorSmtp && (
                                          <p
                                            as="p"
                                            className="my-2"
                                            style={{ color: "red", fontSize: "12px" }}
                                          >
                                            Incorrect Smtp Credentials provided. Please
                                            correct it to login.
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>}
                              {selectedEmailProvider.text === "Gmail" &&
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <div className="text-blue-500 p-1 rounded">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                      </svg>
                                    </div>
                                    <p className="text-blue-500">Make sure you enable all the permissions</p>
                                  </div>
                                  <img src="/images2/nylas-gif.gif" alt="Nylas GIF" className="mt-2" />
                                </div>


                              }
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                  {error && (
                    <div>
                      <p as="p" style={{ color: "red", fontSize: "12px" }}>
                        Error while submitting details!
                      </p>
                      <p as="p" style={{ color: "red", fontSize: "12px" }}>
                        Please make sure you have provided all details or try
                        again later.
                      </p>
                    </div>
                  )}
                  <div>
                    {providerType === "Gmail" && (
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="text-blue-500 p-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                          </div>
                          <p className="text-blue-500">Make sure you enable all the permissions</p>
                        </div>
                        <img src="/images2/nylas-gif.gif" alt="Nylas GIF" className="mt-2" />
                      </div>)}
                  </div>

                  <div style={{ background: "white" }} >
                    {selectedEmailProvider.text !==
                      "Salesforce ( Comming Soon )" && (
                        <button
                          style={{
                            background:
                              providerType === "Gmail" || providerType === "Outlook"
                                ? "linear-gradient(180deg, #FDCF41 0%, #F76C48 100%)" // Apply gradient if providerType is Gmail
                                : !selectedEmailProvider.text
                                  ? "linear-gradient(180deg, #E0E0E0 0%, #BDBDBD 100%)" // Gray gradient for disabled state
                                  : "linear-gradient(180deg, #FDCF41 0%, #F76C48 100%)", // Original gradient for active state
                          }}

                          className={`btn btn-wide rounded-full text-gray-200 cursor-pointer outline-none transition duration-300 py-3 px-8 `}
                          onClick={
                            !selectedEmailProvider.text
                              ? providerType === "Gmail"
                                ? handleNylasGoogleLogin
                                : providerType === "Outlook"
                                  ? handleMicrosoftLogin
                                  : null
                              : selectedEmailProvider.text !== "Gmail" && providerType !== "Gmail"
                                ? handleGetAccessToken
                                : handleNylasGoogleLogin
                          }


                        // disabled={!selectedEmailProvider.text} // Disable the button if selectedEmailProvider.text is empty
                        >
                          {/* Button text changes based on the selected provider */}
                          {selectedEmailProvider.text !== "Gmail" && providerType !== "Gmail" ? (
                            <span>Login →</span>
                          ) : (
                            <span>Connect Gmail →</span>
                          )}
                        </button>
                      )}
                  </div>




                  {/* <div
                  style={{
                    color: "white",
                  }}
                  onClick={handleSubmit} // Handle click event to submit the value
                  className="flex gap-2 justify-between px-4 py-3 text-sm font-medium leading-4 text-white whitespace-nowrap border border-solid bg-[linear-gradient(180deg,#FFC300_0%,#FF5733_100%)] border-[color:var(--G1,#FFC300)] rounded-[32px]"
                >
                  <div className="mb-0.5 cursor-pointer grow">
                    Give access to the mail
                  </div>
    
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                </div> */}
                </div>
                {/* {providerType === "Gmail" && (
                <div className="gap-[26px] flex flex-col items-center border-b border-solid border-gray-200 bg-white-A700 p-6 sm:p-5">
                  <div className="flex self-start">
                    <h4> How to get your email app password?</h4>
                  </div>

                  <div className="rounded-[11px]  p-[19px] gap-[47px] w-[94%] h-[400px] mb-3 flex flex-col items-start bg-black-900_4c bg-cover bg-no-repeat md:h-auto md:w-full">
                    <iframe
                      width="400"
                      height="400"
                      src="https://www.youtube.com/embed/5dfRKl07kPc"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                  </div>
                </div>
              )} */}
              </div>
            }
            {emailCredLoader && (
              <div className="w-full h-screen flex items-center justify-center bg-white-A700">
                <div
                  style={{ width: "600px" }}
                >
                  <div className="w-full px-8">
                    <Box sx={{ width: '100%', }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#F0C419',
                          },
                          height: '10px',
                        }}
                      />
                    </Box>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center my-8">
                    <p className="text-xl mb-4 font-bold">Processing <span className="font-normal text-xl">{Math.floor(progress)}%</span></p>
                    <p className="text-gray-500 text-xl">Hold on... we are validating your request</p>

                    <div className="mt-8 bg-[#fffcf3] px-8 py-4">
                      <p className="text-xl flex items-center">
                        <img src="/images/bulb-icon.png" alt="Bulb Icon" className="inline-block mr-2 mb-1" />
                        Did you know?
                      </p>
                      <p className="text-gray-600 my-2">We remove warm-up emails from your inbox 30 seconds after delivery, so your inbox Stays clean! ✨</p>

                      <video
                        width="100%"
                        height="315"
                        autoPlay
                        controls
                        muted // Muted to allow autoplay in most browsers
                        loop
                      >
                        <source src="/video/private-email-delete.mp4" type="video/mp4" />

                      </video>
                    </div>
                  </div>


                </div>
              </div>
            )}

          </div>
        </SwipeableDrawer>
        <div>
          <Dialog
            open={openPopUpVideoPlay}
            onClose={handleClosePopVideoPlay}
            aria-labelledby="responsive-dialog-title"
          >
            <video
              width="560"
              height="315"
              autoPlay
              controls
            // muted // Muted to allow autoplay in most browsers
            >
              <source src="/video/gmail-filter-setup.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <IconButton
              onClick={handleClosePopVideoPlay}
              style={{ position: "absolute", right: 0, top: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Dialog>
        </div>
      </React.Fragment>
    </div>
  );
}