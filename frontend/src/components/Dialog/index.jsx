import * as React from "react";
import { Radio, RadioGroup } from "components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowImage from "../../assets/images/arrow.png";
import { useState, useEffect } from "react";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
//
//
import { TagsInput } from "react-tag-input-component";

//
import { useContext } from "react";
import DataContext from "ContextAPI/DataState";

import Steppers from "components/Steppers";

export default function FormDialog({
  open,
  handleClose,
  addMail,
  userStep,
  setUserStep,
  emailForToken,
}) {
  const dataContext = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [emailVal, setEmailVal] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");
  const [errorShow, setShowError] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  useEffect(() => {
    if (userStep === 2) {
      setEmailVal(true);
    }
  }, [userStep]);
  const handleGoogleLogin = () => {
    setUserSelected(true);
    // Open a new window with the provided URL
    // window.open(
    //   `${dataContext.API_BASE_URL}/api/auth/google`,
    //   "_blank",
    //   "noopener,noreferrer"
    // );
    // window.location.href = `${dataContext.API_BASE_URL}/api/auth/google`;
    handleClose();
  };
  const handleMicrosoftLogin = () => {
    setUserSelected(true);
    // Open a new window with the provided URL
    // window.open(
    //   `${dataContext.API_BASE_URL}/api/auth/microsoft`,
    //   "_blank",
    //   "noopener,noreferrer"
    // );

    window.location.href = `${dataContext.API_BASE_URL}/api/auth/microsoft`;
  };
  useEffect(() => {
    const handleClick = () => {
      if (!userSelected) {
        setShowError(true);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [userSelected]);
  // ###########################
  const [enteredEmailList, setEnteredEmailList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [useTagInput, setUseTagInput] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setEnteredEmailList([inputValue.trim(), ...enteredEmailList]);
      setUseTagInput(true);
      setInputValue("");
    }
  };
  const handleInputBlur = () => {
    if (inputValue.trim()) {
      setEnteredEmailList([inputValue.trim(), ...enteredEmailList]);
      setUseTagInput(true);
      setInputValue("");
    }
  };
  // ######################
  return (
    <React.Fragment>
      <Dialog
        open={open}
        // onClose={handleClose}
        maxWidth={"sm"}
        fullWidth={true}
        className="dialog-rad"
        PaperProps={{ sx: { borderRadius: "20px" } }}
      >
        <div
          className="px-4 my-4"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          <img
            // onClick={() => {
            //   handleClose(email);
            // }}
            onClick={() => {
              handleClose(email || emailForToken);
              setEnteredEmailList([]);
            }}
            loading="lazy"
            src="/icons/cross-icon.png"
            className="cursor-pointer w-6 aspect-square"
          />
        </div>
        {/* <Steppers step={userStep} /> */}
        {/* <Steppers step={2} /> */}
        <div className="px-6">
          <p className="text-lg">
            Add a new mailbox
            {/* <span className="text-red-400">AI powered</span> */}
          </p>
        </div>
        {/* <div className="divider my-4"></div>{" "} */}
        <div className="divider "></div>{" "}
        {!emailVal && (
          <div className="flex flex-col px-6 pb-6 text-base leading-6 bg-white rounded-3xl max-w-[626px] max-md:px-5">
            {/* <div className="flex gap-5 justify-between font-medium text-stone-950 max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto text-gray-600 text-sm">
                By adding email with AI, you simplify the process yet improving
                the warmup rate. Just input the email, and let AI handle the
                rest seamlessly.
              </div>
            </div> */}
            {/* <div className="shrink-0 mt-3 h-px bg-black bg-opacity-10 max-md:max-w-full" /> */}

            <div className="mt-1 text-sm font-medium text-gray-800 text-ellipsis max-md:max-w-full">
              Enter Email Address{" "}
              <span className="text-lg text-red-600">*</span>
            </div>
            {/* <div className="flex flex-col justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-sm whitespace-nowrap bg-white rounded-xl border-solid border-[1.132px] border-[color:var(--Colour-Border-Border-light,#EBEBEB)] text-neutral-800 max-md:pr-5 max-md:max-w-full">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Enter your email address"
                className="flex gap-1.5 px-2 py-1 rounded w-[400px] bg-opacity-10"
                style={{
                  outline: "none",
                  background: "white",
                }}
              ></input>
            </div> */}
            <div className="mt-4">
              {/* <TagsInput
                name="fruits"
                placeholder="Enter your email address"
                value={enteredEmailList}
                onChange={setEnteredEmailList}
                classNames={{ tag: "tag-cls", input: "input-cls" }} // Assuming these are for additional styling, which cannot be inline
                separators={["Enter", " "]} // Adds tag on pressing 'Enter' or space
                removers={["Backspace"]} // Removes last tag on pressing 'Backspace' if the input is empty
                isEditOnRemove={false} // Keep the word in the input for editing on backspace
                style={{}}
              /> */}

              <div>
                {useTagInput ? (
                  <TagsInput
                    name="emails"
                    value={enteredEmailList}
                    onChange={setEnteredEmailList}
                    classNames={{ tag: "tag-cls", input: "input-cls" }}
                    separators={["Enter", " "]}
                    removers={["Backspace"]}
                    isEditOnRemove={false}
                    style={{}}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleInputBlur}
                    className="input-cls w-full rounded-lg py-4"
                  />
                )}
              </div>
            </div>
            <div className="shrink-0 mt-6 h-px bg-black bg-opacity-10 max-md:max-w-full" />

            <div
              className="cursor-pointer flex gap-3 justify-center self-start px-8 py-3 mt-6 text-center text-white whitespace-nowrap bg-[linear-gradient(180deg,#FFC300_0%,#FF5733_100%)] rounded-[100px] max-md:px-5"
              style={{
                color: "white",
              }}
              onClick={() => {
                addMail(enteredEmailList);
                // setEmail("");
                setUserStep(2);
                setEmailVal(true);
                handleClose();
              }}
            >
              <div className="font-semibold">Add</div>
              <img
                src={ArrowImage}
                className="aspect-square"
                style={{
                  width: "17px",
                }}
              ></img>
            </div>
          </div>
        )}
        {false && emailVal && (
          <div className="flex flex-col p-6 text-base leading-6 bg-white rounded-3xl max-md:px-5">
            {/* <div className="flex  justify-between font-medium text-stone-950 max-md:flex-wrap max-md:max-w-full"> */}
            <div className="flex justify-between font-medium text-stone-950 w-full">
              <div className="w-full">
                {/* gap-5  max-w-[626px] */}
                {!errorShow && (
                  <div className="my-4 text-bold">
                    Please select your email provider
                  </div>
                )}

                {errorShow && (
                  <div className="w-full px-2">
                    <div
                      class="flex w-full rounded-lg overflow-hidden  mb-4 w-full"
                      style={{ background: "#feebed" }}
                    >
                      <div class="flex items-center justify-center w-2 bg-red-500">
                        {/* <svg
                          class="w-6 h-6 text-white fill-current"
                          viewBox="0 0 40 40"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                        </svg> */}
                      </div>

                      <div class="px-4 py-2 -mx-3 w-full">
                        <div class="mx-3 w-full">
                          {/* <p class="font-sm text-red-500 dark:text-red-400 w-full no-wrap"> */}
                          <p class="font-sm text-red-500  w-full ">
                            Please select your email service provider so that
                            email warmup works
                          </p>
                          {/* <p class="text-sm text-gray-600 dark:text-gray-200">
                            Please select your email service provider so that
                            email warmup works
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!errorShow && (
                  <div
                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50  w-full"
                    role="alert"
                  >
                    <span className="font-medium">
                      {emailForToken || email}
                    </span>
                    {"  "}
                    added successfully, connect email now!
                  </div>
                )}
              </div>
            </div>
            <div className="shrink-0 mt-3 h-px bg-black bg-opacity-10 max-md:max-w-full" />

            <div className="shrink-0 mt-6 h-px bg-black bg-opacity-10 max-md:max-w-full" />
            <div
              name="selectservice1"
              // className="flex"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  width: "200px",
                  // border: "1px solid #ff7f21",
                  border: `1px solid ${optionSelected === "gmail" ? "#ff7f21" : "#E5E4E2"
                    }`,

                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
                onClick={() => {
                  setOptionSelected("gmail");
                  handleGoogleLogin();
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <img src="images/gmail-icon.png" />
                  </div>
                  <div>
                    {optionSelected === "gmail" ? (
                      <RadioButtonCheckedIcon sx={{ color: "#ff7f21" }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ color: "#E5E4E2" }} />
                    )}
                  </div>
                </div>
                <div style={{ height: "20px" }}></div>
                <div>Gmail</div>
              </div>
              <div
                style={{
                  width: "200px",
                  // border: "1px solid #ff7f21",
                  border: `1px solid ${optionSelected === "microsoft" ? "#ff7f21" : "#E5E4E2"
                    }`,

                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
                onClick={() => {
                  setOptionSelected("microsoft");
                  handleMicrosoftLogin();
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <img src="images/outlook-icon.png" />
                  </div>
                  <div>
                    {optionSelected === "microsoft" ? (
                      <RadioButtonCheckedIcon sx={{ color: "#ff7f21" }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ color: "#E5E4E2" }} />
                    )}
                  </div>
                </div>
                <div style={{ height: "20px" }}></div>
                <div>Outlook</div>
              </div>
            </div>
            <div className="shrink-0 mt-6 h-px bg-black bg-opacity-10 max-md:max-w-full" />

            <div className="shrink-0 mt-6 h-px bg-black bg-opacity-10 max-md:max-w-full" />
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}
