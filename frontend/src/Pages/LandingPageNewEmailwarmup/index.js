import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "ContextAPI/DataState";

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

const platforms = [
  { name: "Gmail", icon: "images2/img_image91.png" },
  { name: "Elastic mail", icon: "images2/img_image107.png" },
  { name: "MailChimp", icon: "images2/img_image96.png" },
  { name: "Google workspace", icon: "images2/img_image92.png" },
  { name: "Microsoft 365", icon: "images2/img_image105.png" },
  { name: "Mailgun", icon: "images2/img_image106.png" },
  { name: "GMX", icon: "images2/img_image97.png" },
  { name: "Amazon AES", icon: "images2/img_image99.png" },
  { name: "iCloud", icon: "images2/img_image98.png" },
  { name: "Mailjet", icon: "images2/img_image95.png" },
  { name: "GetResponse", icon: "images2/img_image94.png" },
  { name: "SMTP", icon: "images2/img_image108.png" },
  { name: "Dreamshot", icon: "images2/img_image100.png" },
  { name: "Customer.io", icon: "images2/img_image93.png" },
  { name: "Zoho", icon: "images2/img_image104.png" },
  { name: "AOL mail", icon: "images2/img_image103.png" },
  { name: "Outlook", icon: "images2/img_image101.png" },
  { name: "Sendgrid", icon: "images2/img_image102.png" },
];

export default function LandingPageNewEmailwarmup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);

  // const handleNext = () => {
  //   navigate("/extract-data");
  // };
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleNext = async () => {
    // Get the email from the input

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
    <div>
      <header className="bg-white-A700  p-2 md:px-5 rounded-[20px] shadow-bs1 w-full">
        <nav className="bg-gradient-to-r from-white to-purple-100 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              loading="lazy"
              className="h-6 md:h-auto object-fit "
              src="images2/img_.png"
              alt="Three"
            />
            <span className="ml-2 text-orange-600 font-semibold text-lg">
              Email Warmup
            </span>
          </div>
          <div className="flex md:hidden space-x-4">
            <a href="/" className="text-orange-600">
              Home
            </a>
            <a href="/blog" className="text-orange-600">
              Blog
            </a>
            <a href="/contact" className="text-orange-600">
              Contact Us
            </a>
          </div>
          <div className="flex md:hidden">
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
          </div>
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-orange-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
              <div className="flex flex-col items-center space-y-2 p-4">
                <a href="/" className="text-orange-600">
                  Home
                </a>
                <a href="/blog" className="text-orange-600">
                  Blog
                </a>
                <a href="/contact" className="text-orange-600">
                  Contact Us
                </a>
                <button className="border border-orange-600 text-orange-600 px-4 py-2 rounded w-full">
                  Login
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="container mx-auto max-w-screen-lg ">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50">
          <section>
            <div className="bg-white p-8">
              <div className="flex flex-row md:flex-col items-center ">
                <div className="flex-1 p-4  justify-center items-center">
                  <div className="text-left ">
                    <p className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full">
                      <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                        Your
                      </span>{" "}
                      <span
                        className=" font-dmserifdisplay text-left font-normal"
                        style={{ color: "#F0C419" }}
                      >
                        Free
                      </span>
                      <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                        {" "}
                        Email Warmup
                      </span>
                    </p>
                    <p className="leading-[170.00%] text-base text-blue_gray-800_bf text-align-left">
                      <>
                        Free Email Warm Up so You Always Inbox. <br />
                        15 Second Setup. Unlimited Warmups.
                      </>
                    </p>
                  </div>
                  <div className="mt-8 flex flex-row items-start">
                    <input
                      id="warmup_input"
                      name="fieldbox"
                      placeholder="Enter your email"
                      className="font-lato p-0 placeholder:text-gray-600 text-left text-xs w-full"
                      wrapClassName="border border-gray-200 border-solid flex-1 sm:flex-1 w-[76%] sm:w-full "
                      type="email"
                      value={email} // Controlled component
                      onChange={handleEmailChange} // Update state on change
                      style={{
                        padding: "15px 20px",
                        borderRadius: "15px",
                        fontSize: "16px",
                      }}
                    ></input>
                    <button
                      id="warmup_button"
                      className="cursor-pointer flex h-[51px] items-center justify-center rounded-[25px] px-[10px] ml-4"
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
                        className="font-poppins font-semibold text-center text-xs text-white px-[5px]"
                        style={{ width: "150px" }}
                      >
                        Warm up{" "}
                      </div>
                    </button>
                  </div>
                  <div className="flex justify-start items-center mt-8">
                    <div className="text-left mr-4 px-4">
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
                    <div className="h-10 border-r"></div>
                    <div className="text-left mr-4 px-4">
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
                    </div>
                    <div className="h-10 border-r"></div>
                    <div className="text-left px-4">
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
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className="flex-1 p-4">
                  <div className="w-full max-w-[350px] mx-auto">
                    <img
                      loading="lazy"
                      src="images/Hero_animation/Hero-New-Animation.gif"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*  */}
          <section className="flex flex-row md:flex-col items-center p-4">
            <div className="flex-1 flex justify-center items-center">
              <img
                loading="lazy"
                src="images2/chats-purple.png"
                style={{ paddingTop: "20px" }}
              />
            </div>

            <div className="flex-1 p-4">
              <div className="flex flex-col gap-3 items-start justify-center w-full">
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
                  {/* Setup our tool in just 30 seconds & let the AI{" "}
                  <a href="/email-warmup">email warmup</a> you up while you
                  inbox rate soars. */}
                  Email Warm up in 30 seconds & watch you inbox rate fly.
                </p>
              </div>
            </div>
          </section>
          {/*  */}
          <section className="flex flex-row md:flex-col items-center p-4 mb-12">
            <div className="flex-1 p-4">
              <div className="flex flex-col gap-3 items-start justify-center w-full">
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
                  Track Your Team’s Email Health & Turn on/off Email Warm-up for
                  anyone at anytime.
                </p>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <img
                loading="lazy"
                src="images2/img_image110.png"
                style={{ paddingTop: "20px" }}
              />
            </div>
          </section>
          {/*  */}
          <section className="p-4 ">
            <div className="flex flex-col items-center justify-start w-auto md:w-full">
              <p
                className="sm:text-2xl md:text-[26px] text-[28px] text-blue_gray-800 text-center tracking-[0.28px] w-auto"
                size="txtDMSerifDisplayRegular28"
              >
                <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  Set up in{" "}
                </span>
                <span className="text-orange-400_01 font-dmserifdisplay font-normal">
                  30 Seconds
                </span>
                <span className="text-blue_gray-800 font-dmserifdisplay font-normal">
                  {" "}
                  + Your Analytical Dashboard.
                </span>
              </p>
            </div>
            <div className="flex flex-row md:flex-col">
              <div className="flex-1 p-4">
                <div className="flex flex-col justify-center items-center h-full p-6">
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
                        Connect Your Email in 1 Click
                      </p>
                      <p
                        className="text-base text-center text-gray-600_02 w-full"
                        size="txtLatoRegular16Gray60002"
                      >
                        So the AI Can roll up it’s Sleeve
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="flex flex-col justify-center items-center h-full  p-6">
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
                      See Your Warmer Score
                    </p>
                    <p
                      className="leading-[24.00px] max-w-[300px] md:max-w-full text-base text-center text-gray-600_02"
                      size="txtLatoRegular16Gray60002"
                    >
                      Know when you’ll be able to safetly tune up your send
                      volume
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="flex flex-col justify-center items-center h-full p-6">
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
                      See Your Inbox % go Up
                    </p>
                    <p
                      className="leading-[24.00px] max-w-[300px] md:max-w-full text-base text-center text-gray-600_02"
                      size="txtLatoRegular16Gray60002"
                    >
                      See Your Inbox rate go up while your competitors go down{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <h2 className="text-4xl font-semibold text-center mb-12">
              Hear Why <span className="text-orange-500">10,000 Business</span>{" "}
              Love us...
            </h2>
            <div className="flex flex-row md:flex-col lg:justify-center lg:items-center gap-1">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border text-center w-full lg:w-auto"
                >
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-16 h-16 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-base font-semibold">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                  <p className="mt-4 text-sm text-gray-500">
                    {testimonial.text}
                  </p>
                  <div className="mt-4 flex justify-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < testimonial.stars ? "gold" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        style={{
                          color: i < testimonial.stars ? "gold" : "gray",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/*    */}
          <section>
            <div className=" py-12">
              <h2 className="text-2xl font-bold text-center mb-8">
                Seamlessly Integrates with All Your <br />
                <span className="text-orange-500">Email Platforms!</span>
              </h2>
              <div className="max-w-6xl mx-auto grid grid-cols-6 md:grid-cols-2 gap-6">
                {platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white p-4 rounded-lg shadow-md "
                    style={{ minWidth: "max-content" }}
                  >
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="w-6  mr-4"
                    />
                    <span className="text-center font-medium whitespace-nowrap md:text-xs">
                      {platform.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/*  */}
        </div>
        <section className="flex justify-center items-center  ">
          <div className="flex items-center bg-white p-8 rounded-lg flex-row md:flex-col">
            <img
              src="images2/img_divneverinfovisualmargin.svg" // Replace with the URL of the image you uploaded
              alt="Email"
              className="h-[270px] w-[292px]"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Skip the Spam. Always Inbox.
              </h2>
              <p className="text-gray-600 mb-4">
                Enter Your Email & to start email warmup in 30 seconds!
              </p>
              <div className="flex">
                <div className=" flex flex-row items-start">
                  <input
                    id="warmup_input"
                    name="fieldbox"
                    placeholder="Enter your email"
                    className="font-lato p-0 placeholder:text-gray-600 text-left text-xs w-full"
                    wrapClassName="border border-gray-200 border-solid flex-1 sm:flex-1 w-[76%] sm:w-full "
                    type="email"
                    value={email} // Controlled component
                    onChange={handleEmailChange} // Update state on change
                    style={{
                      padding: "15px 20px",
                      borderRadius: "15px",
                      fontSize: "16px",
                    }}
                  ></input>
                  <button
                    id="warmup_button"
                    className="cursor-pointer flex h-[51px] items-center justify-center rounded-[25px] px-[10px] md:px-1 ml-4"
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
                      className="font-poppins font-semibold text-center text-xs text-white px-[5px]"
                      style={{ width: "150px" }}
                    >
                      Warm up{" "}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-white py-8 border-t">
          <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-2">Email Warmup</h3>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Blogs</h3>
              <ul className="text-blue-500">
                <li>
                  <a href="#" className="hover:underline">
                    Permanent error evaluating dmarc policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Gwarm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Salesforce emails going to spam
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-2 text-gray-500">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1a3 3 0 11-6 0v-1m6 0h3m-3 0H9"
                  />
                </svg>
                <span>Contact Us</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c1.104.004 2.005.901 2 2.005v6.89a2 2 0 01-2 2H8a2 2 0 01-2-2v-6.89c-.005-1.104.896-2.001 2-2.005 1.104-.004 2.005.901 2 2.005v6.89"
                  />
                </svg>
                <span>New York, Huston Ave</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
