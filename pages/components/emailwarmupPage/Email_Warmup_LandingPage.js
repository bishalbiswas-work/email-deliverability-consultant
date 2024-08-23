import React from "react";
import { useState, useEffect } from "react";

// import { Link, useNavigate } from "react-router-dom";

import Link from 'next/link';


import List from '@mui/material/List';
// import { useContext } from "react";
// import DataContext from "ContextAPI/DataState";

const testimonials = [
  {
    name: "Guillermo Vallez",
    title: "CEO @WiseSheets",
    text: "Wow, this was fast! My open rates have never been higher than this.",
    stars: 4,
    imageUrl: "images2/gullurmo-2.png",
  },
  {
    name: "Jasmin Hen",
    title: "Founder @Zown",
    text: "Finally a Free Email Warm up so I don’t have to do it myself. Thank you.",
    stars: 4,
    imageUrl: "images2/img_unsplashwmd64tmfc4k_72x72.png",
  },
  {
    name: "Noah Wilson",
    title: "CRO @Chatbase",
    text: "Unlike other email warm-up, this warms in the background so your e doesn’t end up get flooded over night.",
    stars: 4,
    imageUrl: "images2/img_unsplashwmd64tmfc4k_1.png",
  },
  {
    name: "Saum Zadeh",
    title: "CEO @BeTimeful",
    text: "Love how I can add my team & see which email is ready to send more.",
    stars: 4,
    imageUrl: "images2/Saum.png",
  },
  {
    name: "Emily Hinson",
    title: "Real Estate Agent",
    text: "Must Have for Agents doing cold-emails. If you’re not warming, you might as well forget about sending.",
    stars: 4,
    imageUrl: "images2/emily.png",
  },
];
const Email_Warmup_LandingPage = () => {
  // const navigate = useNavigate();
  // const dataContext = useContext(DataContext);

  // const handleNext = () => {
  //   navigate("/extract-data");
  // };
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNext = async () => {
    // Get the email from the input

    // const name = email.substring(0, email.lastIndexOf("@"));

    // // Define a default uid
    // const uid = 0;

    // // Save to local storage
    // localStorage.setItem("loginEmail", email);
    // localStorage.setItem("status", false);
    // localStorage.setItem("name", name);
    // localStorage.setItem("uid", uid.toString());
    // console.log(email);
    // await dataContext.setEmail(email);
    // await dataContext.emailSignup(email);
    // navigate("/warm-up");
    // ... rest of your handleNext logic
  };
  // Initialize 8 useState hooks
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsToggled(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const [state1, setState1] = useState(true);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);
  const [state5, setState5] = useState(false);
  const [state6, setState6] = useState(false);
  const [state7, setState7] = useState(false);
  const [state8, setState8] = useState(false);
  // Counter to keep track of the number of toggles
  const [toggleCount, setToggleCount] = useState(0);

  // This used to change the states of images
  useEffect(() => {
    const toggleStates = () => {
      const nextIndex = (toggleCount % 7) + 1; // Adjust for 8 states

      // Set only the next state to true
      setState1(nextIndex === 1);
      setState2(nextIndex === 2);
      setState3(nextIndex === 3);
      setState4(nextIndex === 4);
      setState5(nextIndex === 5);
      setState6(nextIndex === 6);
      setState7(nextIndex === 7);
      // setState8(nextIndex === 8);

      setToggleCount((prevCount) => prevCount + 1);
    };

    const interval = setInterval(toggleStates, 100);

    return () => clearInterval(interval);
  }, [toggleCount]);

  return (
    <>

      <div className="bg-gradient3  flex flex-col font-inter gap-2 items-center justify-end mx-auto pt-8 w-full">
        <header className="bg-white-A700 flex md:gap-10 items-center justify-between p-5 md:px-5 rounded-[20px] shadow-bs1 w-full">
          <div className="flex flex-row font-dmserifdisplay gap-1.5 items-center justify-center w-auto">
            <img
              className="h-6 md:h-auto object-fit "
              src="/images2/img_.png"
              alt="Three"
            />
            <p
              className="bg-clip-text capitalize text-transparent text-xl w-auto"
              size="txtDMSerifDisplayRegular20"
              style={{ color: "#f68714" }}
            >
              Email Warmup
            </p>
          </div>
          <div>
            <Link href="/">
              <button className="mx-1" style={{ color: "#f68714" }}>Home</button>
            </Link>
            <a href="https://automatedemailwarmup.com/blog/">
              <button className="mx-1" style={{ color: "#f68714" }}>Blog</button>
            </a>
            <a href="mailto:hello@automatedemailwarmup.com">
              <button className="mx-1" style={{ color: "#f68714" }}>Contact Us</button>
            </a>
          </div>
          <div
            className="cursor-pointer flex items-center justify-center min-w-[130px]"
            rightIcon={
              <img
                className="h-4 mb-0.5 ml-1"
                src="/images2/img_icfluentarrowdown24filled_1_white_a700_16x16.svg"
                alt="ic_fluent_arrow_down_24_filled 1"
              />
            }
            shape="round"
            color="purple_A700_amber_400"
          >
            <div
              className="font-poppins font-semibold text-center text-xs"
              onClick={() => {
                navigate("/login");
              }}
              style={{
                // background: "#F0C419",
                background: "linear-gradient(to bottom, #ff7e5f, #feb47b)", // button background color
                padding: "1px",
                color: "white",
                borderRadius: "25px",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  // Use background for the gradient and apply it to the text
                  // background: "linear-gradient(to bottom, #ff7e5f, #feb47b)",
                  // WebkitBackgroundClip: "text",
                  color: " #feb47b", // Make the text color transparent to reveal the background
                  // display: "inline-block", // Needed to apply padding and border-radius effectively
                }}
              >
                Login
              </div>
            </div>
            {/* <div
              onClick={() => {
                // Add your login navigation logic here
              }}
              style={{
                background: "linear-gradient(to bottom, #ff7e5f, #feb47b)", // button background color
                color: "black", // button text color
                padding: "10px 20px", // button padding
                // border: "3px solid", // Border width and style
                borderRadius: "25px",
                // borderColor: "transparent", // Transparent border to allow gradient to be visible
                borderRadius: "5px", // Border radius for rounded corners
                cursor: "pointer", // Change cursor on hover
                // outline: "none", // Remove default focus outline
                // backgroundImage: "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Gradient for the border
                // backgroundClip: "padding-box", // Clip the background to the padding box
              }}
            >
              Login
            </div> */}
            {/* {LoginPopup()} */}
          </div>
        </header>
        <div className="flex flex-col items-start justify-start w-auto md:w-full">
          {/* <div className="flex md:flex-col flex-row md:gap-10 gap-40 items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-[60px] w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] h-[360px] md:h-auto items-start justify-start">
              <div className="flex flex-col gap-3 items-left justify-center w-full">
                <p
                  className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full"
                  size="txtAntipastoProDemiBold40"
                >
                  <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                    Your
                  </span>
                  <span
                    className=" font-dmserifdisplay text-left font-normal"
                    style={{ color: "#F0C419" }}
                  >
                    {" "}
                    Free
                  </span>
                  <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                    {" "}
                    Email Warm-up
                  </span>
                </p>
                <p
                  className="leading-[170.00%] text-base text-blue_gray-800_bf text-align-left"
                  size="txtLatoRegular16"
                  // style={{ paddingLeft: "-20px" }}
                >
                  <>
                    100% Inbox Guaranteed with our Email Warmup. <br />
                    30 Second Setup. Unlimited Warmups.{" "}
                  </>
                </p>
              </div>
              <div className="flex flex-col gap-8 items-center justify-start w-[570px] sm:w-full">
                <div className="flex sm:flex-col flex-row gap-3 items-center justify-start w-full">
                  <input
                    name="fieldbox"
                    placeholder="Enter your email"
                    className="font-lato p-0 placeholder:text-gray-600 text-left text-xs w-full"
                    wrapClassName="border border-gray-200 border-solid flex-1 sm:flex-1 w-[76%] sm:w-full"
                    type="email"
                    value={email} // Controlled component
                    onChange={handleEmailChange} // Update state on change
                    style={{ padding: "15px 20px", borderRadius: "15px" }}
                  ></input>
                  <button
                    className="cursor-pointer flex h-[51px] items-center justify-center rounded-[25px] px-[10px]"
                    rightIcon={
                      <img
                        className="h-4 mb-0.5 ml-1 "
                        src="/images2/img_frame_white_a700.svg"
                        alt="Frame"
                        style={{ paddingRight: "10px" }}
                      />
                    }
                    size="lg"
                    color="purple_A700_amber_400"
                    onClick={() => {
                      handleNext();
                    }}
                    style={{
                      cursor: "pointer",
                      background: "#F0C419",
                      // width: "150px",
                    }}
                  >
                    <div
                      className="font-poppins font-semibold text-center text-xs px-[5px]"
                      style={{ width: "150px" }}
                    >
                      Warm up{" "}
                    </div>
                  </button>
                </div>
                <List
                  className="sm:flex-col flex-row gap-7 grid sm:grid-cols-[repeat(0,_1fr_1px)_1fr] grid-cols-[repeat(2,_1fr_1px)_1fr] justify-start py-3 w-full"
                  orientation="horizontal"
                >
                  <div className="flex flex-1 md:flex-1 flex-col gap-2.5 items-center justify-start w-auto md:w-full">
                    <div className="flex flex-row gap-1 items-end justify-end w-auto">
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_One"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Two"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Three"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Four"
                      />
                    </div>
                    <div className="flex flex-row gap-1 items-start justify-center w-auto">
                      <img
                        className="h-3.5 w-3.5"
                        src="/images2/img_64ff14a97ca75b3.svg"
                        alt="64ff14a97ca75bThree"
                      />
                      <div className="flex flex-col items-start justify-start w-auto">
                        <p
                          className="text-blue_gray-800 text-xs w-auto"
                          size="txtInterBold12"
                        >
                          <span className="text-blue_gray-800 font-lato text-left font-bold">
                            4.9
                          </span>
                          <span className="text-blue_gray-800 font-lato text-left font-normal">
                            {" "}
                            on Capterra
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Line className="self-center h-11 bg-black-900_19 w-px" />
                  <div className="flex flex-1 md:flex-1 flex-col gap-2.5 items-center justify-start w-auto md:w-full">
                    <div className="flex flex-row gap-1 items-end justify-end w-auto">
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_One"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Two"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Three"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Four"
                      />
                    </div>
                    <div className="flex flex-row gap-1 items-start justify-center w-auto">
                      <img
                        className="h-3.5 w-3.5"
                        src="/images2/img_vector.svg"
                        alt="vector"
                      />
                      <div className="flex flex-col items-start justify-start w-auto">
                        <p
                          className="text-blue_gray-800 text-xs w-auto"
                          size="txtInterBold12"
                        >
                          <span className="text-blue_gray-800 font-lato text-left font-bold">
                            5.0
                          </span>
                          <span className="text-blue_gray-800 font-lato text-left font-normal">
                            {" "}
                            on G2
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Line className="self-center h-11 bg-black-900_19 w-px" />
                  <div className="flex flex-1 md:flex-1 flex-col gap-2.5 items-center justify-start w-auto md:w-full">
                    <div className="flex flex-row gap-1 items-end justify-end w-auto">
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_One"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Two"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Three"
                      />
                      <img
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="/images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Four"
                      />
                    </div>
                    <div className="flex flex-row gap-1 items-start justify-center w-auto">
                      <img
                        className="h-3.5 md:h-auto object-cover w-3.5"
                        src="/images2/img_image90.png"
                        alt="imageNinety"
                      />
                      <div className="flex flex-col items-start justify-start w-auto">
                        <p
                          className="text-blue_gray-800 text-xs w-auto"
                          size="txtInterBold12"
                        >
                          <span className="text-blue_gray-800 font-lato text-left font-bold">
                            4.8
                          </span>
                          <span className="text-blue_gray-800 font-lato text-left font-normal">
                            {" "}
                            on Google
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </List>
              </div>
            </div>
            <div className="font-lato relative w-[38%] md:w-full">
        

            
              <img src="/images/Hero_animation/Hero-New-Animation.gif" />
           
            </div>
          </div> */}
          <div className="flex md:flex-col flex-row md:gap-10 gap-40 items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-[60px] w-full">

            <section>
              <div className="flex items-center justify-center ">
                <div className="bg-white rounded-lg items-center justify-center w-full">
                  <div className="flex flex-col space-y-4">
                    <div className="rounded flex flex-col items-center justify-center">
                      <h1 className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full text-center">
                        <span
                          className="font-dmserifdisplay text-left font-normal"
                          style={{ color: "#F0C419" }}
                        >
                          Free
                        </span>{" "}


                        <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                          {" "}
                          Email Warmup
                        </span>
                      </h1>
                      <h2 className="leading-[170.00%] text-base text-blue_gray-800_bf text-center mt-8">
                        <>
                          Increase Sales, Not Spam with Free Email Warm up.
                        </>
                      </h2>
                    </div>


                    <section className=" p-4 rounded">
                      <div className="mt-8 flex flex-row items-start">
                        <input
                          name="fieldbox"
                          placeholder="Enter your email"
                          className="font-lato p-0 placeholder:text-gray-600 text-left text-xs w-full w-[400px] md:w-[200px]"
                          wrapClassName="border border-gray-200 border-solid flex-1 sm:flex-1 w-[76%] sm:w-full"
                          type="email"
                          value={email} // Controlled component
                          onChange={handleEmailChange} // Update state on change
                          style={{ padding: "15px 20px", borderRadius: "15px" }}
                        ></input>
                        <button
                          id="warmup_button"
                          className="cursor-pointer flex h-[51px] items-center justify-center rounded-[25px] px-[10px] ml-4"
                          rightIcon={
                            <img
                              loading="lazy"
                              className="h-4 mb-0.5 ml-1 "
                              src="/images2/img_frame_white_a700.svg"
                              alt="Frame"
                              style={{ paddingRight: "10px" }}
                            />
                          }
                          size="lg"
                          color="purple_A700_amber_400"
                          onClick={() => {
                            handleNext();
                          }}
                          style={{
                            color: "white",
                            cursor: "pointer",
                            background: "#F0C419",
                            // width: "150px",
                          }}
                        >
                          <div
                            className="font-poppins font-semibold text-center text-xs text-white px-[5px]"
                            style={{ width: "150px" }}
                          >
                            Warm up{" "}
                          </div>
                        </button>
                      </div>
                    </section>
                    <section className=" p-4 rounded">
                      <div className="flex justify-center items-center mt-8">
                        <div className="text-left mr-4 px-4">
                          <div className="flex flex-row gap-1 items-end justify-end w-auto">
                            <img
                              loading="lazy"
                              className="h-[19px] md:h-auto object-cover w-[19px]"
                              src="/images2/img_6343dcbd22ea712.png"
                              alt="6343dcbd22ea712"
                            />
                            <img
                              loading="lazy"
                              className="h-[19px] md:h-auto object-cover w-[19px]"
                              src="/images2/img_6343dcbd22ea712.png"
                              alt="6343dcbd22ea712_One"
                            />
                            <img
                              loading="lazy"
                              className="h-[19px] md:h-auto object-cover w-[19px]"
                              src="/images2/img_6343dcbd22ea712.png"
                              alt="6343dcbd22ea712_Two"
                            />
                            <img
                              loading="lazy"
                              className="h-[19px] md:h-auto object-cover w-[19px]"
                              src="/images2/img_6343dcbd22ea712.png"
                              alt="6343dcbd22ea712_Three"
                            />
                            <img
                              loading="lazy"
                              className="h-[19px] md:h-auto object-cover w-[19px]"
                              src="/images2/img_6343dcbd22ea712.png"
                              alt="6343dcbd22ea712_Four"
                            />
                          </div>
                          <div className="flex flex-row gap-1 items-start justify-center w-auto">
                            <img
                              loading="lazy"
                              className="h-3.5 w-3.5"
                              src="/images2/img_64ff14a97ca75b3.svg"
                              alt="64ff14a97ca75bThree"
                            />
                            <div className="flex flex-col items-start justify-start w-auto">
                              <p
                                className="text-blue_gray-800 text-xs w-auto"
                                size="txtInterBold12"
                              >
                                <span className="text-blue_gray-800 font-lato text-left font-bold">
                                  4.9
                                </span>
                                <span className="text-blue_gray-800 font-lato text-left font-normal">
                                  {" "}
                                  on Capterra
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="h-10 border-r"></div>
                        <div className="text-left mr-4 px-4">
                          <div className="flex flex-1 md:flex-1 flex-col gap-2.5 items-center justify-start w-auto md:w-full">
                            <div className="flex flex-row gap-1 items-end justify-end w-auto">
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712"
                              />
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712_One"
                              />
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712_Two"
                              />
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712_Three"
                              />
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712_Four"
                              />
                            </div>
                            <div className="flex flex-row gap-1 items-start justify-center w-auto">
                              <img
                                loading="lazy"
                                className="h-3.5 w-3.5"
                                src="/images2/img_vector.svg"
                                alt="vector"
                              />
                              <div className="flex flex-col items-start justify-start w-auto">
                                <p
                                  className="text-blue_gray-800 text-xs w-auto"
                                  size="txtInterBold12"
                                >
                                  <span className="text-blue_gray-800 font-lato text-left font-bold">
                                    5.0
                                  </span>
                                  <span className="text-blue_gray-800 font-lato text-left font-normal">
                                    {" "}
                                    on G2
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-10 border-r"></div>
                        <div className="text-left px-4">
                          <div className="flex flex-1 md:flex-1 flex-col gap-2.5 items-center justify-start w-auto md:w-full">
                            <div className="flex flex-row gap-1 items-end justify-end w-auto">
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712"
                              />
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712_One"
                              />
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712_Two"
                              />
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712_Three"
                              />
                              <img
                                loading="lazy"
                                className="h-[19px] md:h-auto object-cover w-[19px]"
                                src="/images2/img_6343dcbd22ea712.png"
                                alt="6343dcbd22ea712_Four"
                              />
                            </div>
                            <div className="flex flex-row gap-1 items-start justify-center w-auto">
                              <img
                                loading="lazy"
                                className="h-3.5 md:h-auto object-cover w-3.5"
                                src="/images2/img_image90.png"
                                alt="imageNinety"
                              />
                              <div className="flex flex-col items-start justify-start w-auto">
                                <p
                                  className="text-blue_gray-800 text-xs w-auto"
                                  size="txtInterBold12"
                                >
                                  <span className="text-blue_gray-800 font-lato text-left font-bold">
                                    4.8
                                  </span>
                                  <span className="text-blue_gray-800 font-lato text-left font-normal">
                                    {" "}
                                    on Google
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div></section>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="flex md:flex-col flex-row font-dmsans md:gap-10 gap-40 items-center justify-end max-w-[1440px] md:px-10 sm:px-5 px-[200px] py-[60px] w-full">
            <div
              className="bg-cover bg-no-repeat flex md:flex-1 flex-col h-[360px] items-center justify-start p-[9px] md:px-5 w-[42%] md:w-full"
              style={{
                backgroundImage: "url('images2/img_frame1000003149.png')",
              }}
            >
              {/* <div className="my-3.5 relative w-[394px] sm:w-full">
                <div className="ml-auto my-auto w-[94%] sm:w-full">
                  <div className="absolute bg-white-A700 bottom-[0] flex flex-col items-center justify-start left-[0] p-2.5 rounded-[11px] w-[62%]">
                    <div className="flex flex-col gap-[15px] justify-start mb-0.5 mt-[5px] w-[98%] md:w-full">
                      <div className="flex flex-col gap-4 items-center justify-start md:ml-[0] ml-[5px] w-[98%] md:w-full">
                        <div className="flex flex-row items-start justify-between w-full">
                          <div className="flex flex-col items-center justify-start">
                            <p
                              className="text-[9.46px] text-indigo-900 tracking-[-0.19px]"
                              size="txtDMSansBold946"
                            >
                              Mailbox analysis
                            </p>
                          </div>
                          <div className="flex flex-row items-center justify-evenly w-1/5">
                            <p
                              className="text-[7.1px] text-indigo-200 tracking-[-0.14px]"
                              size="txtDMSansBold71"
                            >
                              Monthly
                            </p>
                            <img
                              className="h-[11px] w-[11px]"
                              src="/images2/img_lock.svg"
                              alt="lock"
                            />
                          </div>
                        </div>
                        <img
                          className="h-[84px] w-[84px]"
                          src="/images2/img_contrast.svg"
                          alt="contrast"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-start w-[94%] md:w-full">
                        <div className="bg-white-A700 flex flex-row items-center justify-start p-2 rounded-lg shadow-bs3 w-full">
                          <div className="flex flex-col items-center justify-start ml-[15px] w-[15%]">
                            <div className="flex flex-col items-end justify-start w-full">
                              <div className="flex flex-row items-start justify-evenly w-full">
                                <div className="bg-purple-A700 h-1 my-0.5 rounded-[50%] w-1"></div>
                                <p
                                  className="text-[7.1px] text-indigo-200 tracking-[-0.14px]"
                                  size="txtDMSansMedium71"
                                >
                                  Inbox
                                </p>
                              </div>
                              <p
                                className="text-[10.64px] text-indigo-900 tracking-[-0.21px]"
                                size="txtDMSansBold1064"
                              >
                                81%
                              </p>
                            </div>
                          </div>
                          <Line className="bg-gray-50 h-[27px] ml-[34px] w-px" />
                          <div className="flex flex-col items-center justify-start ml-[23px] w-[15%]">
                            <div className="flex flex-col items-end justify-start w-full">
                              <div className="flex flex-row items-start justify-evenly w-full">
                                <div className="bg-red-300_01 h-1 rounded-[50%] w-1"></div>
                                <p
                                  className="text-[7.1px] text-indigo-200 tracking-[-0.14px]"
                                  size="txtDMSansMedium71"
                                >
                                  Spam
                                </p>
                              </div>
                              <p
                                className="text-[10.64px] text-indigo-900 tracking-[-0.21px]"
                                size="txtDMSansBold1064"
                              >
                                12%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row font-lato items-start justify-between m-auto relative w-full">
                    <div className="flex flex-row gap-2.5 items-start justify-between w-[36%]">
                      <p
                        className="mt-1 text-[10.22px] text-gray-600_01"
                        size="txtLatoMedium1022"
                      >
                        One tap activation
                      </p>
                      <Switch
                        onColor="#9d76ed"
                        offColor="#9d76ed"
                        onHandleColor="#ffffff"
                        offHandleColor="#ffffff"
                        value={true}
                        className=""
                      />
                    </div>
                    <img
                      className="h-[311px] md:h-auto object-cover"
                      src="/images2/img_image109.png"
                      alt="image109"
                    />
                  </div>
                </div>
                <div className="absolute flex flex-col font-lato items-center justify-start left-[0] top-[18%] w-auto">
                  <button
                    className="bg-transparent border border-solid cursor-pointer flex items-center justify-center min-w-[123px] rounded-lg"
                    leftIcon={
                      <img
                        className="h-4 mb-px mr-2"
                        src="/images2/img_frame_16x16.png"
                        alt="Frame"
                      />
                    }
                    color="white_A700"
                    variant="fill"
                  >
                    <div className="!text-purple-A700 font-medium leading-[normal] purple_A700_amber_400_border2 text-left text-xs">
                      Add Mailbox
                    </div>
                  </button>
                </div>
              </div> */}
              <img
                src="/images2/chats-purple.png"
                style={{ paddingTop: "20px" }}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-3 items-left justify-center w-full">
                <p
                  className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full"
                  size="txtDMSerifDisplayRegular40"
                >
                  <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                    Set in 30 Seconds
                  </span>
                  {/* <span className="text-orange-400_01 font-dmserifdisplay text-left font-normal">
                    Forget
                  </span> */}
                </p>
                <p
                  className="leading-[170.00%] max-w-[509px] md:max-w-full text-base text-blue_gray-800_bf"
                  size="txtLatoRegular16"
                >
                  Warms sooner than your Coffee does!

                </p>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col flex-row md:gap-10 gap-40 items-center justify-end max-w-[1440px] md:px-10 sm:px-5 px-[200px] py-[60px] w-full">
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-3 items-start justify-center w-full">
                <p
                  className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full"
                  size="txtDMSerifDisplayRegular40"
                >
                  Manage Your Team
                </p>
                <p
                  className="leading-[170.00%] max-w-[382px] md:max-w-full text-base text-blue_gray-800_bf"
                  size="txtLatoRegular16"
                >
                  Add, Remove, all in one click.
                </p>
              </div>
            </div>
            <div className="relative w-[51%] md:w-full">
              <img
                className="absolute h-[360px] inset-y-[0] my-auto object-cover right-[0] w-[430px]"
                src="/images2/img_frame1000003149.png"
                alt="frame1000003149_One"
              />
              <img
                className="h-[312px] my-auto object-cover relative w-[497px]"
                src="/images2/img_image110.png"
                alt="image110"
                style={{ padding: "10px" }}
              />
            </div>
          </div>
          <div className="flex flex-col font-dmserifdisplay md:gap-10 gap-[60px] items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-20 w-full">
            <div className="flex flex-col items-center justify-start w-auto md:w-full">
              <p
                className="sm:text-2xl md:text-[26px] text-[28px] text-blue_gray-800 text-center tracking-[0.28px] w-auto"
                size="txtDMSerifDisplayRegular28"
              >
                <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  {/* Set up in{" "} */}
                  How it Works
                </span>
                {/* <span className="text-orange-400_01 font-dmserifdisplay font-normal">
                  30 Seconds
                </span>
                <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  {" "}
                  + Your Analytical Dashboard.
                </span> */}
              </p>
            </div>
            <div className="flex md:flex-col flex-row font-lemonada md:gap-10 items-start justify-between max-w-[1160px] mx-auto sm:px-5 w-full">
              <div className="relative w-[37%] md:w-full">
                <img
                  className="absolute h-5 object-cover right-[0] top-[29%] w-[125px]"
                  src="/images2/img_svg.png"
                  alt="svg"
                />
                <div className="flex flex-col items-center justify-start my-auto relative w-[300px]">
                  <div className="flex flex-col h-[140px] md:h-auto items-center justify-center pb-[20.85px] w-[223px]">
                    <p
                      className="bg-clip-text bg-gradient  border border-solid border-white-A700 flex h-[88px] items-center justify-center sm:px-5 rounded-[50%] sm:text-[24.16px] md:text-[26.16px] text-[28.16px] text-center text-shadow-ts text-transparent w-[88px]"
                      size="txtLemonadaRegular2816"
                    >
                      1
                    </p>
                  </div>
                  <div className="flex flex-col font-lato gap-[15.4px] items-start justify-start pb-[0.6px] w-full">
                    <p
                      className="text-center text-gray-800 text-xl w-full text-wrap"
                      size="txtLatoBold20"
                    >
                      Connect  in 1 Click
                    </p>
                    {/* <p
                      className="text-base text-center text-gray-600_02 w-full"
                      size="txtLatoRegular16Gray60002"
                    >
                      So the AI Can roll up it’s Sleeve
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start w-auto">
                <div className="flex flex-col h-[140px] md:h-auto items-center justify-center pb-[20.85px] w-[223px]">
                  <p
                    className="bg-clip-text bg-gradient  border-2 border-solid border-white-A700 flex h-[88px] items-center justify-center sm:px-5 rounded-[50%] sm:text-[24.16px] md:text-[26.16px] text-[28.16px] text-center text-shadow-ts1 text-transparent w-[88px]"
                    size="txtLemonadaRegular2816"
                  >
                    2
                  </p>
                </div>
                <div className="flex flex-col font-lato gap-[15.4px] items-start justify-start pb-[0.6px] w-[300px]">
                  <p
                    className="text-center text-gray-800 text-xl w-full"
                    size="txtLatoBold20"
                  >
                    Warms
                  </p>
                  {/* <p
                    className="leading-[24.00px] max-w-[300px] md:max-w-full text-base text-center text-gray-600_02"
                    size="txtLatoRegular16Gray60002"
                  >
                    Know when you’ll be able to safetly tune up your send volume
                  </p> */}
                </div>
              </div>
              <div className="relative w-[37%] md:w-full">
                <img
                  className="absolute h-5 left-[0] object-cover top-[26%] w-[125px]"
                  src="/images2/img_svg_20x125.png"
                  alt="svg_One"
                />
                <div className="flex flex-col items-center justify-start ml-auto my-auto relative w-auto">
                  <div className="flex flex-col h-[140px] md:h-auto items-center justify-center pb-[20.85px] w-[223px]">
                    <p
                      className="bg-clip-text bg-gradient  border-2 border-solid border-white-A700 flex h-[88px] items-center justify-center sm:px-5 rounded-[50%] sm:text-[24.16px] md:text-[26.16px] text-[28.16px] text-center text-shadow-ts2 text-transparent w-[88px]"
                      size="txtLemonadaRegular2816"
                    >
                      3
                    </p>
                  </div>
                  <div className="flex flex-col font-lato gap-[15.4px] items-start justify-start pb-[0.6px] w-[300px]">
                    <p
                      className="text-center text-gray-800 text-xl w-full"
                      size="txtLatoBold20"
                    >
                      Inboxes
                    </p>
                    {/* <p
                      className="leading-[24.00px] max-w-[300px] md:max-w-full text-base text-center text-gray-600_02"
                      size="txtLatoRegular16Gray60002"
                    >
                      See Your Inbox rate go up while your competitors go down{" "}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-dmserifdisplay md:gap-10 gap-[60px] items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-20 w-full">
            <div className="flex flex-col items-center justify-start w-auto sm:w-full">
              <p
                className="sm:text-2xl md:text-[26px] text-[28px] text-blue_gray-800 text-center tracking-[0.28px] w-auto"
                size="txtDMSerifDisplayRegular28"
              >
                <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  Your Success is Our Success...
                </span>
                {/* <span className="text-orange-400_01 font-dmserifdisplay font-normal">
                  10,000 Business
                </span>
                <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  {" "}
                  Love us...
                </span> */}
              </p>
            </div>
            <List
              className="sm:flex-col flex-row font-lato gap-6 grid sm:grid-cols-1 md:grid-cols-3 grid-cols-5 justify-start max-w-[1296px] mx-auto w-full"
              orientation="horizontal"
            >
              <div className="border border-solid flex flex-col gap-4 items-center justify-center p-6 purple_A700_amber_400_border3 sm:px-5 rounded-[20px] w-60">
                <img
                  className="h-[72px] md:h-auto rounded-[50%] w-[72px]"
                  src="/images2/Guillermo.png"
                  alt="unsplashwmd64tm"
                />
                <div className="flex flex-col gap-4 items-center justify-center w-full">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <p
                      className="bg-clip-text text-base text-center text-transparent w-auto"
                      size="txtDMSerifDisplayRegular16"
                      style={{ color: "#f68714" }}
                    >
                      Guillermo Vallez
                    </p>
                    <p
                      className="text-center text-purple-900 text-xs w-auto"
                      size="txtLatoRegular12"
                    >
                      CEO @WiseSheets
                    </p>
                  </div>
                  <div className="flex flex-col gap-8 items-center justify-center w-full">
                    <p
                      className="leading-[150.00%] max-w-[192px] md:max-w-full text-blue_gray-700_bf text-center text-xs"
                      size="txtLatoRegular12Bluegray700bf"
                    >
                      "Amazing, this was quick and effective. My open rates are at an all-time high."
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      {/* <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c47f"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-solid flex flex-col gap-4 items-center justify-center p-6 purple_A700_amber_400_border4 sm:px-5 rounded-[20px] w-60">
                <img
                  className="h-[72px] md:h-auto rounded-[50%] w-[72px]"
                  src="/images2/img_unsplashwmd64tmfc4k_72x72.png"
                  alt="unsplashwmd64tm"
                />
                <div className="flex flex-col gap-4 items-center justify-center w-full">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <p
                      className="bg-clip-text text-base text-center text-transparent w-auto"
                      size="txtDMSerifDisplayRegular16"
                      style={{ color: "#f68714" }}
                    >
                      James Campbell
                    </p>
                    <p
                      className="text-center text-purple-900 text-xs w-auto"
                      size="txtLatoRegular12"
                    >
                      Founder @Zown
                    </p>
                  </div>
                  <div className="flex flex-col gap-8 items-center justify-center w-full">
                    <p
                      className="leading-[150.00%] max-w-[192px] md:max-w-full text-blue_gray-700_bf text-center text-xs"
                      size="txtLatoRegular12Bluegray700bf"
                    >
                      "At last, an email warm up solution that saves me from spending hours doing it manually. Thank you."
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      {/* <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c4"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-solid flex flex-col gap-4 items-center justify-center p-6 purple_A700_amber_400_border5 sm:px-5 rounded-[20px] w-60">
                <img
                  className="h-[72px] md:h-auto rounded-[50%] w-[72px]"
                  src="/images2/img_unsplashwmd64tmfc4k_1.png"
                  alt="unsplashwmd64tm"
                />
                <div className="flex flex-col gap-4 items-center justify-center w-full">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <p
                      className="bg-clip-text text-base text-center text-transparent w-auto"
                      size="txtDMSerifDisplayRegular16"
                      style={{ color: "#f68714" }}
                    >
                      Noah Wilson
                    </p>
                    <p
                      className="text-center text-purple-900 text-xs w-auto"
                      size="txtLatoRegular12"
                    >
                      CRO @Chatbase
                    </p>
                  </div>
                  <div className="flex flex-col gap-8 items-center justify-center w-full">
                    <p
                      className="leading-[150.00%] max-w-[192px] md:max-w-full text-blue_gray-700_bf text-center text-xs"
                      size="txtLatoRegular12Bluegray700bf"
                    >
                      "Unlike other tools, this one works in the background, preventing your inbox from getting overwhelmed overnight."
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      {/* <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c4"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-solid flex flex-col gap-4 items-center justify-center p-6 purple_A700_amber_400_border6 sm:px-5 rounded-[20px] w-60">
                <img
                  className="h-[72px] md:h-auto rounded-[50%] w-[72px]"
                  src="/images2/Saum.png"
                  alt="ellipseFive"
                />
                <div className="flex flex-col gap-4 items-center justify-center w-full">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <p
                      className="bg-clip-text text-base text-center text-transparent w-auto"
                      size="txtDMSerifDisplayRegular16"
                      style={{ color: "#f68714" }}
                    >
                      Saum Zadeh
                    </p>
                    <p
                      className="text-center text-purple-900 text-xs w-auto"
                      size="txtLatoRegular12"
                    >
                      Saint Orale
                    </p>
                  </div>
                  <div className="flex flex-col gap-8 items-center justify-center w-full">
                    <p
                      className="leading-[150.00%] max-w-[192px] md:max-w-full text-blue_gray-700_bf text-center text-xs"
                      size="txtLatoRegular12Bluegray700bf"
                    >
                      "I love being able to add my team members and monitor when each email is ready for further action."
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      {/* <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c4"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-solid flex flex-col gap-4 h-[294px] md:h-auto items-center justify-center p-6 purple_A700_amber_400_border7 sm:px-5 rounded-[20px] w-60">
                <img
                  className="h-[62px] md:h-auto rounded-[50%] w-[62px]"
                  src="/images2/MaralZadeh-modified.png"
                  alt="ellipseForty"
                />
                <div className="flex flex-col gap-4 items-center justify-center w-full">
                  <div className="flex flex-col items-center justify-start w-auto">
                    <p
                      className="bg-clip-text text-base text-center text-transparent w-auto"
                      size="txtDMSerifDisplayRegular16"
                      style={{ color: "#f68714" }}
                    >
                      Maral Dhz
                    </p>
                    <p
                      className="text-center text-purple-900 text-xs w-auto"
                      size="txtLatoRegular12"
                    >
                      Real Estate Agent
                    </p>
                  </div>
                  <div className="flex flex-col gap-8 items-center justify-center w-full">
                    <p
                      className="leading-[150.00%] max-w-[192px] md:max-w-full text-blue_gray-700_bf text-center text-xs"
                      size="txtLatoRegular12Bluegray700bf"
                    >
                      "Essential for agents doing cold outreach. Without warming up, you're wasting your efforts."
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      {/* <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c4"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar> */}
                    </div>
                  </div>
                </div>
              </div>
            </List>
          </div>
          {/* <div className="flex flex-col font-dmserifdisplay md:gap-10 gap-[60px] items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-20 w-full">
            <div className="flex flex-col gap-0.5 items-center justify-start w-auto sm:w-full">
              <p
                className="sm:text-2xl md:text-[26px] text-[28px] text-blue_gray-800 text-center tracking-[0.56px] w-auto"
                size="txtDMSerifDisplayRegular28"
              >
                {" "}
                Seamlessly Integrates with All Your{" "}
              </p>
              <p
                className="bg-clip-text  sm:text-2xl md:text-[26px] text-[28px] text-center text-transparent tracking-[0.56px] w-auto"
                size="txtDMSerifDisplayRegular28PurpleA700"
                style={{ color: "#f68714" }}
              >
                Email Platforms!
              </p>
            </div>
            <List
              className="flex flex-col font-lato gap-6 items-center max-w-[1160px] mx-auto w-full"
              orientation="vertical"
            >
              <div className="flex flex-1 md:flex-col flex-row gap-6 items-center justify-center my-0 w-full">
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <img
                    className="h-8 md:h-auto object-cover w-8"
                    src="/images2/img_image91.png"
                    alt="imageNinetyOne"
                  />
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Gmail
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-auto">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[39px] sm:w-full"
                      src="/images2/img_image107.png"
                      alt="image107"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Elastic mail
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[4.36px] w-auto">
                    <img
                      className="h-[23px] md:h-auto object-cover w-[21px]"
                      src="/images2/img_image96.png"
                      alt="imageNinetySix"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    MailChimp
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[4.36px] w-[31px]">
                    <img
                      className="h-[23px] md:h-auto object-cover w-[22px]"
                      src="/images2/img_image92.png"
                      alt="imageNinetyTwo"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Google workspace
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[4.36px] w-auto">
                    <img
                      className="h-[23px] md:h-auto object-cover w-5"
                      src="/images2/img_image105.png"
                      alt="image105"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Microsoft 365
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-8">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[21px]"
                      src="/images2/img_image106.png"
                      alt="image106"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Mailgun
                  </p>
                </div>
              </div>
              <div className="flex flex-1 md:flex-col flex-row gap-6 items-center justify-center my-0 w-full">
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[6.74px] w-auto">
                    <img
                      className="h-[18px] md:h-auto object-cover w-[58px] sm:w-full"
                      src="/images2/img_image97.png"
                      alt="imageNinetySeven"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    GMX
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-[31px]">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[21px]"
                      src="/images2/img_image99.png"
                      alt="imageNinetyNine"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Amaxon AES
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-auto">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[33px] sm:w-full"
                      src="/images2/img_image98.png"
                      alt="imageNinetyEight"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Icloud
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.65px] w-8">
                    <img
                      className="h-5 md:h-auto object-cover w-5"
                      src="/images2/img_image95.png"
                      alt="imageNinetyFive"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Mailjet
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.82px] w-auto">
                    <img
                      className="h-5 md:h-auto object-cover w-8 sm:w-full"
                      src="/images2/img_image94.png"
                      alt="imageNinetyFour"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    GetResponse
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-auto">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[29px] sm:w-full"
                      src="/images2/img_image108.png"
                      alt="image108"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    SMTP
                  </p>
                </div>
              </div>
              <div className="flex flex-1 md:flex-col flex-row gap-6 items-center justify-center my-0 w-full">
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-8">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[21px]"
                      src="/images2/img_image100.png"
                      alt="image100"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Dreamshot
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-auto">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[29px] sm:w-full"
                      src="/images2/img_image93.png"
                      alt="imageNinetyThree"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Customer.io
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-auto">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[60px] sm:w-full"
                      src="/images2/img_image104.png"
                      alt="image104"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Zoho
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[6.4px] w-auto">
                    <img
                      className="h-[19px] md:h-auto object-cover w-[47px] sm:w-full"
                      src="/images2/img_image103.png"
                      alt="image103"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    AOL mail
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-[33px]">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[22px] sm:w-full"
                      src="/images2/img_image101.png"
                      alt="image101"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Outlook
                  </p>
                </div>
                <div className="bg-white-A700 border border-black-900_0c border-solid flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-[10px] w-auto">
                  <div className="flex flex-col items-center justify-center p-[5.33px] w-8">
                    <img
                      className="h-[21px] md:h-auto object-cover w-[21px]"
                      src="/images2/img_image102.png"
                      alt="image102"
                    />
                  </div>
                  <p
                    className="text-base text-center text-gray-800_01 w-auto"
                    size="txtLatoRegular16Gray80001"
                  >
                    Sendgrid
                  </p>
                </div>
              </div>
            </List>
          </div> */}
          {/* <div className="bg-white-A700 flex flex-col font-lato h-[509px] md:h-auto items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-[60px] w-full">
            <div className="bg-gradient4  flex md:flex-col flex-row gap-6 items-center justify-start max-w-[805px] pr-20 md:px-5 py-8 rounded-[20px] w-full">
              <img
                className="h-[270px] w-[292px]"
                src="/images2/img_divneverinfovisualmargin.svg"
                alt="divneverinfovis"
              />
              <div className="flex flex-1 flex-col gap-8 items-start justify-start w-full">
                <div className="flex flex-col gap-3 items-start justify-start w-full">
                  <p
                    className="leading-[130.00%] md:text-3xl sm:text-[28px] text-[32px] text-gray-900_03"
                    size="txtDMSerifDisplayRegular32"
                  >
                    <>
                      Never Get Sent to <br />
                      Spam or Promotions!
                    </>
                  </p>
                  <p
                    className="text-blue_gray-700_bf_01 text-sm w-full"
                    size="txtLatoRegular14"
                  >
                    Enter Your Email start warm-up in 30 seconds!
                  </p>
                </div>
                <div className="flex sm:flex-col flex-row gap-3 items-center justify-start w-full">
                  <input
                    name="fieldbox_One"
                    placeholder="Enter your email"
                    className="p-0 placeholder:text-gray-600 text-left text-xs w-full"
                    wrapClassName="border border-gray-200 border-solid flex-1 sm:flex-1 w-[66%] sm:w-full"
                    type="email"
                    value={email} // Controlled component
                    onChange={handleEmailChange} // Update state on change
                    style={{ padding: "15px 20px", borderRadius: "15px" }}
                  ></input>
                  <div
                    className="bg-gradient  flex flex-row font-poppins gap-1 h-[51px] md:h-auto items-center justify-center sm:px-5 px-6 py-3 rounded-[25px]"
                    onClick={() => {
                      handleNext();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <p
                      className="text-center text-white-A700 text-xs w-auto"
                      size="txtPoppinsSemiBold12"
                      style={{ width: "80px" }}
                    >
                      Warm up{" "}
                    </p>
                    <img
                      className="h-4 md:h-auto object-cover w-5"
                      src="/images2/img_ddd1c2476bcb099.png"
                      alt="ddd1c2476bcb099"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="bg-gray-300 h-px w-full" ></div>
          <div className="bg-white-A700 flex flex-col font-dmsans items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-[60px] w-full">
            <div className="flex flex-col items-center justify-start max-w-[1160px] mx-auto w-full">
              <div className="flex md:flex-col flex-row md:gap-10 gap-[81px] items-start justify-start w-full">
                <div className="flex flex-1 flex-col gap-6 h-full items-start justify-between pb-1 w-full">
                  <div className="flex flex-col items-start justify-start w-auto">
                    <div className="flex flex-col items-start justify-start w-auto">
                      <p
                        className="sm:text-2xl md:text-[26px] text-[28px] text-blue_gray-900 w-auto"
                        size="txtDMSansBold28"
                      >
                        Email Warmup
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex flex-row gap-[22px] items-center justify-start w-auto">
                    <div className="flex flex-col items-end justify-start w-[7%]">
                      <img
                        className="h-[18px] md:h-auto object-cover"
                        src="/images2/img_facebook.png"
                        alt="facebook"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-start w-[11%]">
                      <img
                        className="h-3.5 md:h-auto object-cover"
                        src="/images2/img_twitter.png"
                        alt="twitter"
                      />
                    </div>
                    <img
                      className="h-[19px] md:h-auto object-cover w-[19px]"
                      src="/images2/img_socialmediaicon.png"
                      alt="socialmediaicon"
                    />
                    <div className="flex flex-col items-center justify-start w-[19px]">
                      <div className="flex flex-col items-center justify-start w-[18px] md:w-full">
                        <img
                          className="h-[17px] md:h-auto object-cover w-[18px] sm:w-full"
                          src="/images2/img_linkedin_17x18.png"
                          alt="linkedin"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-start w-[12%]">
                      <div className="flex flex-col items-center justify-start w-[91%] md:w-full">
                        <img
                          className="h-3.5 md:h-auto object-cover"
                          src="/images2/img_youtube.png"
                          alt="youtube"
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div style={{ marginLeft: "-10px" }}>
                    <a href="https://automatedemailwarmup.com/">
                      <button style={{ color: "#f68714" }}>Home</button>
                    </a>
                    <a href="https://automatedemailwarmup.com/blog/">
                      <button style={{ color: "#f68714" }}>Contact Us</button>
                    </a>
                  </div> */}
                </div>

                <div className="flex flex-col font-dmserifdisplay items-start justify-start w-auto">
                  <div className="flex flex-col gap-6 items-start justify-start w-auto">
                    {/* <div className="flex flex-col items-start justify-start w-auto">
                      <p
                        className="text-base text-blue_gray-900 tracking-[0.16px] w-auto"
                        size="txtDMSerifDisplayRegular16Bluegray900"
                      >
                        About us
                      </p>
                    </div> */}
                    <div className="flex flex-col font-lato gap-4 items-start justify-start w-auto">
                      <p
                        size="txtLatoRegular14Bluegray500"
                        className="text-bold"
                      >
                        Blogs
                      </p>
                      <div className="flex flex-row gap-1.5 items-center justify-start w-auto">
                        <a
                          href="https://automatedemailwarmup.com/blog/554-5-7-5-permanent-error-evaluating-dmarc-policy/"
                          className="text-blue-500 text-center text-sm w-auto"
                        >
                          <p
                            size="txtLatoRegular14Bluegray500"
                            className="underline"
                          >
                            Permanent error evaluating dmarc policy
                          </p>
                        </a>
                      </div>
                      <div className="flex flex-row gap-1.5 items-center justify-start w-auto">
                        <a
                          href="https://automatedemailwarmup.com/blog/gwarm/"
                          className="text-blue-500 text-center text-sm w-auto"
                        >
                          <p
                            size="txtLatoRegular14Bluegray500"
                            className="underline"
                          >
                            Gwarm
                          </p>
                        </a>
                      </div>
                      <div className="flex flex-row gap-1.5 items-center justify-start w-auto">
                        <a
                          href="https://automatedemailwarmup.com/blog/salesforce-emails-going-to-spam/"
                          className="text-blue-500 text-center text-sm w-auto"
                        >
                          <p
                            size="txtLatoRegular14Bluegray500"
                            className="underline"
                          >
                            Salesforce emails going to spam
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col font-dmserifdisplay items-start justify-start w-auto">
                  <div className="flex flex-col gap-6 items-start justify-start w-auto">
                    {/* <div className="flex flex-col items-start justify-start w-auto">
                      <p
                        className="text-base text-blue_gray-900 tracking-[0.16px] w-auto"
                        size="txtDMSerifDisplayRegular16Bluegray900"
                      >
                        About us
                      </p>
                    </div> */}
                    <div className="flex flex-col font-lato gap-4 items-start justify-start w-auto">
                      <div className="flex flex-row gap-1.5 items-center justify-start w-auto">
                        <div className="flex flex-col h-5 items-center justify-start w-5">
                          <div className="flex flex-col h-5 items-center justify-start p-[3px] w-5">
                            <img
                              className="h-2.5"
                              src="/images2/img_lock_blue_gray_900.svg"
                              alt="lock_One"
                            />
                          </div>
                        </div>
                        <a
                          href="javascript:"
                          className="text-blue_gray-500 text-center text-sm w-auto"
                        >
                          <p size="txtLatoRegular14Bluegray500">
                            Contact Us
                          </p>
                        </a>
                      </div>
                      <div className="flex flex-row gap-2 items-start justify-start w-auto">
                        <img
                          className="h-5 w-5"
                          src="/images2/img_linkedin.svg"
                          alt="linkedin_One"
                        />
                        <p
                          className="text-blue_gray-500 text-sm w-auto"
                          size="txtLatoRegular14Bluegray500"
                        >
                          New York, Huston Ave
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Email_Warmup_LandingPage;
