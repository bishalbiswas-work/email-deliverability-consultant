import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Img,
  Input,
  Line,
  List,
  RatingBar,
  Switch,
  Text,
} from "components";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import DataContext from "ContextAPI/DataState";
const LandingPagev2_AutomatedEmailWarmup_Consultant = () => {
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [error, setError] = useState(true)

  // const handleNext = () => {
  //   navigate("/extract-data");
  // };
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNext = async () => {
    // Get the email from the input
    if (!email) {
      setError(true); // Set error state to true if email is empty
      return; // Exit the function to prevent further execution
    }
    const name = email.substring(0, email.lastIndexOf("@"));

    // Define a default uid
    const uid = 0;

    // Save to local storage
    localStorage.setItem("loginEmail", email);
    localStorage.setItem("status", false);
    localStorage.setItem("name", name);
    localStorage.setItem("uid", uid.toString());
    console.log(email);
    await dataContext.setEmail(email);
    await dataContext.emailSignup(email);
    navigate("/warm-up");
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
      <div className=" flex flex-col font-inter gap-2 items-center justify-end mx-auto pt-8 w-full">
        <header className="bg-white-A700 flex md:gap-10 items-center justify-between p-5 md:px-5 rounded-[20px] shadow-bs1 w-full">
          <div className="flex flex-row font-dmserifdisplay gap-1.5 items-center justify-center w-auto">
            <img
              loading="lazy"
              className="h-6 md:h-auto object-fit "
              src="images2/img_.png"
              alt="Three"
            />
            <p
              className="bg-clip-text capitalize text-transparent text-xl w-auto"
              size="txtDMSerifDisplayRegular20"
              style={{ color: "#f68714" }}
            >
              Automated Email Warmup
            </p>
          </div>
          <div>
            <Link to="/">
              <Button style={{ color: "#f68714" }}>Home</Button>
            </Link>
            <a href="https://automatedemailwarmup.com/blog/">
              <Button style={{ color: "#f68714" }}>Blog</Button>
            </a>
            <a href="https://emailwarmup.com/">
              <Button style={{ color: "#f68714" }}>Email Warmup</Button>
            </a>
            <a href="mailto:hello@automatedemailwarmup.com">
              <Button style={{ color: "#f68714" }}>Contact Us</Button>
            </a>
          </div>
          <div
            className="cursor-pointer flex items-center justify-center min-w-[130px]"
            rightIcon={
              <img
                loading="lazy"
                className="h-4 mb-0.5 ml-1"
                src="images2/img_icfluentarrowdown24filled_1_white_a700_16x16.svg"
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
                background: "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Button background color
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
                background: "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Button background color
                color: "black", // Button text color
                padding: "10px 20px", // Button padding
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
        <div className="flex flex-col items-start justify-start w-auto md:w-full overflow-hidden">
          <div className="flex md:flex-col flex-row md:gap-10 gap-40 items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-[60px] w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] h-[360px] md:h-auto items-start justify-start">
              <div className="flex flex-col gap-3 items-left justify-center w-full">
                <p
                  className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full"
                  size="txtAntipastoProDemiBold40"
                >
                  <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                    Email Deliverability
                  </span>
                  <span
                    className=" font-dmserifdisplay text-left font-normal"
                    style={{ color: "#F0C419" }}
                  >
                    {" "}
                    Consultant
                  </span>
                  {/* <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                    {" "}
                    Email Warm-up
                  </span> */}
                </p>
                <p
                  className="leading-[170.00%] text-base text-blue_gray-800_bf text-align-left"
                  size="txtLatoRegular16"
                // style={{ paddingLeft: "-20px" }}
                >
                  <>
                    Free 15 Min Email Deliverability Consultant So you Increase Sales, Not Spam.
                    {/* to Inbox. <br />
                    30 Second Setup. Unlimited Warmups.{" "} */}
                  </>
                </p>
              </div>
              <div className="flex flex-col gap-8 items-center justify-start w-[570px] sm:w-full">
                <div className="flex sm:flex-col flex-row gap-3 items-center justify-start w-full">
                  {/* <input
                    id="warmup_input"
                    name="fieldbox"
                    placeholder="Enter your email"
                    className="font-lato p-0 placeholder:text-gray-600 text-left text-xs w-full"
                    wrapClassName="border border-gray-200 border-solid flex-1 sm:flex-1 w-[76%] sm:w-full"
                    type="email"
                    value={email} // Controlled component
                    onChange={handleEmailChange} // Update state on change
                    style={{
                      padding: "15px 20px",
                      borderRadius: "15px",
                      fontSize: "16px",
                    }}
                  ></input> */}
                  <Button
                    id="warmup_button"
                    className="cursor-pointer flex h-[51px] items-center justify-center rounded-[25px] px-[10px]"
                    rightIcon={
                      <img
                        loading="lazy"
                        className="h-4 mb-0.5 ml-1 "
                        src="images2/img_frame_white_a700.svg"
                        alt="Frame"
                        style={{ paddingRight: "10px" }}
                      />
                    }
                    size="lg"
                    color="purple_A700_amber_400"
                    // onClick={() => {
                    //   handleNext();
                    // }}
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
                      Book 15min Call
                    </div>
                  </Button>
                </div>
                <List
                  className="sm:flex-col flex-row gap-7 grid sm:grid-cols-[repeat(0,_1fr_1px)_1fr] grid-cols-[repeat(2,_1fr_1px)_1fr] justify-start py-3 w-full"
                  orientation="horizontal"
                >
                  <div className="flex flex-1 md:flex-1 flex-col gap-2.5 items-center justify-start w-auto md:w-full">
                    <div className="flex flex-row gap-1 items-end justify-end w-auto">
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_One"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Two"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Three"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Four"
                      />
                    </div>
                    <div className="flex flex-row gap-1 items-start justify-center w-auto">
                      <img
                        loading="lazy"
                        className="h-3.5 w-3.5"
                        src="images2/img_64ff14a97ca75b3.svg"
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
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_One"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Two"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Three"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Four"
                      />
                    </div>
                    <div className="flex flex-row gap-1 items-start justify-center w-auto">
                      <img
                        loading="lazy"
                        className="h-3.5 w-3.5"
                        src="images2/img_vector.svg"
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
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_One"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Two"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Three"
                      />
                      <img
                        loading="lazy"
                        className="h-[19px] md:h-auto object-cover w-[19px]"
                        src="images2/img_6343dcbd22ea712.png"
                        alt="6343dcbd22ea712_Four"
                      />
                    </div>
                    <div className="flex flex-row gap-1 items-start justify-center w-auto">
                      <img
                        loading="lazy"
                        className="h-3.5 md:h-auto object-cover w-3.5"
                        src="images2/img_image90.png"
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
            <div className="font-lato relative w-[38%] md:w-full text-center mx-auto">
              <img
                loading="lazy"
                src="images2/consultant.png"
                className="mx-auto"
              />
            </div>

          </div>
          <div className="text-center w-full my-12">
            <div className="py-4">
              <p
                className="sm:text-4xl md:text-[38px] text-[32px] text-blue_gray-800 w-full"
                size="txtDMSerifDisplayRegular40"
              >
                <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal mb-4">
                  Email Deliverability Consultant{" "}
                </span>
                <span className="text-orange-400_01 font-dmserifdisplay text-left font-normal">
                  From
                </span>
              </p></div>
            <div className="flex flex-wrap justify-center gap-4">
              <img className="w-1/7 md:w-1/4 lg:w-1/7 h-full" src="/images2/emailconsultant/hubspot.png" alt="Image 1" />
              <img className="w-1/7 md:w-1/4 lg:w-1/7 h-full" src="/images2/emailconsultant/highlevel.png" alt="Image 2" />
              <img className="w-1/7 md:w-1/4 lg:w-1/7 h-full" src="/images2/emailconsultant/salesforce.png" alt="Image 3" />
              <img className="w-1/7 md:w-1/4 lg:w-1/7 h-full" src="/images2/emailconsultant/klaviyo.png" alt="Image 4" />
              <img className="w-1/7 md:w-1/4 lg:w-1/7 h-full" src="/images2/emailconsultant/mailchimp.png" alt="Image 5" />
              <img className="w-1/7 md:w-1/4 lg:w-1/7 h-full" src="/images2/emailconsultant/gmail.png" alt="Image 6" />
              <img className="w-1/7 md:w-1/4 lg:w-1/7 h-full" src="/images2/emailconsultant/outlook.png" alt="Image 7" />
            </div>
          </div>
          {/* <div className="flex md:flex-col flex-row font-dmsans md:gap-10 gap-40 items-center justify-end max-w-[1440px] md:px-10 sm:px-5 px-[200px] py-[60px] w-full">
            <div
              className="bg-cover bg-no-repeat flex md:flex-1 flex-col h-[360px] items-center justify-start p-[9px] md:px-5 w-[42%] md:w-full"
              style={{
                backgroundImage: "url('images2/img_frame1000003149.png')",
              }}
            >

              <img
                loading="lazy"
                src="images2/chats-purple.png"
                style={{ paddingTop: "20px" }}
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-3 items-center justify-center w-full">
                <p
                  className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full"
                  size="txtDMSerifDisplayRegular40"
                >
                  <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                    Set and{" "}
                  </span>
                  <span className="text-orange-400_01 font-dmserifdisplay text-left font-normal">
                    Forget
                  </span>
                </p>
                <p
                  className="leading-[170.00%] max-w-[509px] md:max-w-full text-base text-blue_gray-800_bf"
                  size="txtLatoRegular16"
                >
                  Setup our tool in just 30 seconds & let the AI{" "}
                  <a href="/email-warmup">email warmup</a> you up while you
                  inbox rate soars.
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col flex-row md:gap-10 gap-40 items-center justify-end max-w-[1440px] md:px-10 sm:px-5 px-[200px] py-[60px] w-full">
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-3 items-center justify-center w-full">
                <p
                  className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full"
                  size="txtDMSerifDisplayRegular40"
                >
                  Mailbox Management
                </p>
                <p
                  className="leading-[170.00%] max-w-[382px] md:max-w-full text-base text-blue_gray-800_bf"
                  size="txtLatoRegular16"
                >
                  See your Email Health, add other users & Switch on or off at
                  any time.
                </p>
              </div>
            </div>
            <div className="relative w-[51%] md:w-full">
              <img
                loading="lazy"
                className="absolute h-[360px] inset-y-[0] my-auto object-cover right-[0] w-[430px]"
                src="images2/img_frame1000003149.png"
                alt="frame1000003149_One"
              />
              <img
                loading="lazy"
                className="h-[312px] my-auto object-cover relative w-[497px]"
                src="images2/img_image110.png"
                alt="image110"
                style={{ padding: "10px" }}
              />
            </div>
          </div> */}
          <div className="flex flex-col font-dmserifdisplay md:gap-10 gap-[60px] items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-20 w-full">
            <div className="flex flex-col items-center justify-start w-auto md:w-full">
              <p
                className="sm:text-2xl md:text-[26px] text-[28px] text-blue_gray-800 text-center tracking-[0.28px] w-auto"
                size="txtDMSerifDisplayRegular28"
              >
                <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  How Email Deliverability Consultant {" "}
                </span>
                <span className="text-orange-400_01 font-dmserifdisplay font-normal">
                  Works
                </span>
                {/* <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  {" "}
                  + Your Analytical Dashboard.
                </span> */}
              </p>
            </div>
            <div className="flex md:flex-col flex-row font-lemonada md:gap-10 items-start justify-between max-w-[1160px] mx-auto sm:px-5 w-full">
              <div className="relative w-[37%] md:w-full">
                <img
                  loading="lazy"
                  className="absolute h-5 object-cover right-[0] top-[29%] w-[125px]"
                  src="images2/img_svg.png"
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
                      Book Your Free 15 Min Call
                    </p>
                    <p
                      className="text-base text-center text-gray-600_02 w-full"
                      size="txtLatoRegular16Gray60002"
                    >
                      At Time that Works Best for You
                    </p>
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
                    Assess Your Email Reputation
                  </p>
                  <p
                    className="leading-[24.00px] max-w-[300px] md:max-w-full text-base text-center text-gray-600_02"
                    size="txtLatoRegular16Gray60002"
                  >
                    We Will Assess Your Email Reputation
                  </p>
                </div>
              </div>
              <div className="relative w-[37%] md:w-full">
                <img
                  loading="lazy"
                  className="absolute h-5 left-[0] object-cover top-[26%] w-[125px]"
                  src="images2/img_svg_20x125.png"
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
                      See Your Deliverability Rise                    </p>
                    <p
                      className="leading-[24.00px] max-w-[300px] md:max-w-full text-base text-center text-gray-600_02"
                      size="txtLatoRegular16Gray60002"
                    >
                      Consultants will Do Everything to Raise
                      Your Score & Keep it Up!{" "}
                    </p>
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
                  Hear Why{" "}
                </span>
                <span className="text-orange-400_01 font-dmserifdisplay font-normal">
                  10,000 Business
                </span>
                <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  {" "}
                  Love us...
                </span>
              </p>
            </div>
            <List
              className="sm:flex-col flex-row font-lato gap-6 grid sm:grid-cols-1 md:grid-cols-3 grid-cols-5 justify-start max-w-[1296px] mx-auto w-full"
              orientation="horizontal"
            >
              <div className="border border-solid flex flex-col gap-4 items-center justify-center p-6 purple_A700_amber_400_border3 sm:px-5 rounded-[20px] w-60">
                <img
                  loading="lazy"
                  className="h-[72px] md:h-auto rounded-[50%] w-[72px]"
                  src="images2/Guillermo.png"
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
                      “Wow, this was fast yet effective. My open rates have
                      never been higher.”
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c47f"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-solid flex flex-col gap-4 items-center justify-center p-6 purple_A700_amber_400_border4 sm:px-5 rounded-[20px] w-60">
                <img
                  loading="lazy"
                  className="h-[72px] md:h-auto rounded-[50%] w-[72px]"
                  src="images2/img_unsplashwmd64tmfc4k_72x72.png"
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
                      “Finally an automated Email Warm up so I don’t have spent
                      countless hours to do manually. Thank you.”
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c4"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-solid flex flex-col gap-4 items-center justify-center p-6 purple_A700_amber_400_border5 sm:px-5 rounded-[20px] w-60">
                <img
                  loading="lazy"
                  className="h-[72px] md:h-auto rounded-[50%] w-[72px]"
                  src="images2/img_unsplashwmd64tmfc4k_1.png"
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
                      Unlike other tools, this warms in the background so your
                      inbox doesn’t end up getting drained over night.
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c4"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-solid flex flex-col gap-4 items-center justify-center p-6 purple_A700_amber_400_border6 sm:px-5 rounded-[20px] w-60">
                <img
                  loading="lazy"
                  className="h-[72px] md:h-auto rounded-[50%] w-[72px]"
                  src="images2/Saum.png"
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
                      “Love how I can add my team members & see which each email
                      is ready to do more”
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c4"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-solid flex flex-col gap-4 h-[294px] md:h-auto items-center justify-center p-6 purple_A700_amber_400_border7 sm:px-5 rounded-[20px] w-60">
                <img
                  loading="lazy"
                  className="h-[62px] md:h-auto rounded-[50%] w-[62px]"
                  src="images2/MaralZadeh-modified.png"
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
                      “Must Have for Agents doing cold-outreach. If you’re not
                      warming, you might as well forget about it.”
                    </p>
                    <div className="flex flex-row items-start justify-start w-auto">
                      <RatingBar
                        className="flex justify-between w-[122px]"
                        value={4}
                        starCount={5}
                        color="#c4c4c4"
                        activeColor="#ffb700"
                        size={19}
                      ></RatingBar>
                    </div>
                  </div>
                </div>
              </div>
            </List>
          </div>
          <div className="flex flex-col font-dmserifdisplay md:gap-10 gap-[60px] items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-20 w-full">
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
                    loading="lazy"
                    className="h-8 md:h-auto object-cover w-8"
                    src="images2/img_image91.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[39px] sm:w-full"
                      src="images2/img_image107.png"
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
                      loading="lazy"
                      className="h-[23px] md:h-auto object-cover w-[21px]"
                      src="images2/img_image96.png"
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
                      loading="lazy"
                      className="h-[23px] md:h-auto object-cover w-[22px]"
                      src="images2/img_image92.png"
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
                      loading="lazy"
                      className="h-[23px] md:h-auto object-cover w-5"
                      src="images2/img_image105.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[21px]"
                      src="images2/img_image106.png"
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
                      loading="lazy"
                      className="h-[18px] md:h-auto object-cover w-[58px] sm:w-full"
                      src="images2/img_image97.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[21px]"
                      src="images2/img_image99.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[33px] sm:w-full"
                      src="images2/img_image98.png"
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
                      loading="lazy"
                      className="h-5 md:h-auto object-cover w-5"
                      src="images2/img_image95.png"
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
                      loading="lazy"
                      className="h-5 md:h-auto object-cover w-8 sm:w-full"
                      src="images2/img_image94.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[29px] sm:w-full"
                      src="images2/img_image108.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[21px]"
                      src="images2/img_image100.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[29px] sm:w-full"
                      src="images2/img_image93.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[60px] sm:w-full"
                      src="images2/img_image104.png"
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
                      loading="lazy"
                      className="h-[19px] md:h-auto object-cover w-[47px] sm:w-full"
                      src="images2/img_image103.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[22px] sm:w-full"
                      src="images2/img_image101.png"
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
                      loading="lazy"
                      className="h-[21px] md:h-auto object-cover w-[21px]"
                      src="images2/img_image102.png"
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
          </div>
          <div className="bg-white-A700 flex flex-col font-lato h-[509px] md:h-auto items-center justify-center max-w-[1440px] md:px-10 sm:px-5 px-[140px] py-[60px] w-full">
            <div className="bg-gradient4  flex md:flex-col flex-row gap-6 items-center justify-start max-w-[805px] pr-20 md:px-5 py-8 rounded-[20px] w-full">
              <img
                loading="lazy"
                className="h-[270px] w-[292px]"
                src="images2/img_divneverinfovisualmargin.svg"
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
                    style={{
                      padding: "15px 20px",
                      borderRadius: "15px",
                      fontSize: "16px",
                    }}
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
                      loading="lazy"
                      className="h-4 md:h-auto object-cover w-5"
                      src="images2/img_ddd1c2476bcb099.png"
                      alt="ddd1c2476bcb099"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Line className="bg-gray-300 h-px w-full" />
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
                loading="lazy"
                        className="h-[18px] md:h-auto object-cover"
                        src="images2/img_facebook.png"
                        alt="facebook"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-start w-[11%]">
                        <img
                loading="lazy"
                        className="h-3.5 md:h-auto object-cover"
                        src="images2/img_twitter.png"
                        alt="twitter"
                      />
                    </div>
                      <img
                loading="lazy"
                      className="h-[19px] md:h-auto object-cover w-[19px]"
                      src="images2/img_socialmediaicon.png"
                      alt="socialmediaicon"
                    />
                    <div className="flex flex-col items-center justify-start w-[19px]">
                      <div className="flex flex-col items-center justify-start w-[18px] md:w-full">
                          <img
                loading="lazy"
                          className="h-[17px] md:h-auto object-cover w-[18px] sm:w-full"
                          src="images2/img_linkedin_17x18.png"
                          alt="linkedin"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-start w-[12%]">
                      <div className="flex flex-col items-center justify-start w-[91%] md:w-full">
                          <img
                loading="lazy"
                          className="h-3.5 md:h-auto object-cover"
                          src="images2/img_youtube.png"
                          alt="youtube"
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div style={{ marginLeft: "-10px" }}>
                    <a href="https://automatedemailwarmup.com/">
                      <Button style={{ color: "#f68714" }}>Home</Button>
                    </a>
                    <a href="https://automatedemailwarmup.com/blog/">
                      <Button style={{ color: "#f68714" }}>Contact Us</Button>
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
                            className="underline text-blue_gray-500"
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
                            className="underline text-blue_gray-500"
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
                            className="underline text-blue_gray-500"
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
                              loading="lazy"
                              className="h-2.5"
                              src="images2/img_lock_blue_gray_900.svg"
                              alt="lock_One"
                            />
                          </div>
                        </div>
                        <a
                          href="javascript:"
                          className="text-blue_gray-500 text-center text-sm w-auto"
                        >
                          <p size="txtLatoRegular14Bluegray500">Contact Us</p>
                        </a>
                      </div>
                      <div className="flex flex-row gap-2 items-start justify-start w-auto">
                        <img
                          loading="lazy"
                          className="h-5 w-5"
                          src="images2/img_linkedin.svg"
                          alt="linkedin_One"
                        />
                        <p
                          className="text-blue_gray-500 text-sm w-auto"
                          size="txtLatoRegular14Bluegray500"
                        >
                          New York, Huston Ave
                        </p>
                      </div>
                      <div className="ml-7">
                        <a
                          href="https://emailwarmup.com/"
                          className="text-blue_gray-500 text-center text-sm w-auto "
                        >
                          <p size="txtLatoRegular14Bluegray500">Email Warmup</p>
                        </a>
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

export default LandingPagev2_AutomatedEmailWarmup_Consultant;
