import React from 'react'
import Head from 'next/head';
import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import DataContext from "ContextAPI/DataState";
// import { Helmet } from "react-helmet";

export default function EmailDeliverPage1() {
    // const dataContext = useContext(DataContext);

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("")
    // const navigate = useNavigate();
    // async function handleNext() {
    //   localStorage.setItem('emailWarmup', email);

    //   navigate("/email-deliverability-processing")
    // }
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
        // navigate("/email-deliverability-processing")
        // ... rest of your handleNext logic
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    return (
        <div>
            <Head>
                <meta
                    name="description"
                    content="Email warmup is free tool that warm-up your email domain so you land in inbox over spam. "
                />
                <title>FREE Email Deliverability TEST in 5 Seconds</title>
            </Head>
            <header className="bg-white-A700  p-2 md:px-5 rounded-[20px] shadow-bs1 w-full">
                <nav className="bg-gradient-to-r from-white to-purple-100 p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            loading="lazy"
                            className="h-6 md:h-auto object-fit "
                            src="/images2/img_.png"
                            alt="Three"
                        />
                        <span className="ml-2 text-orange-600 font-semibold text-lg">
                            Email Warmup
                        </span>
                    </div>
                    <div className="flex md:hidden space-x-4">

                        <a href="/blog" className="text-gray-600">
                            Blog
                        </a>
                        <a href="/contact" className="text-gray-600">
                            Features
                        </a>
                        <a href="/blog" className="text-orange-600">
                            Email Deliverability Test
                        </a>


                    </div>
                    <div className="flex md:hidden">
                        <div
                            className="cursor-pointer flex items-center justify-center min-w-[130px]"
                            rightIcon={
                                <img
                                    loading="lazy"
                                    className="h-4 mb-0.5 ml-1"
                                    src="/images2/img_icfluentarrowdown24filled_1_white_a700_16x16.svg"
                                    alt="ic_fluent_arrow_down_24_filled 1"
                                />
                            }
                            shape="round"
                            color="purple_A700_amber_400"
                        >

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
            <section>
                <div className="flex items-center justify-center ">
                    <div className="bg-white p-6 rounded-lg items-center justify-center w-3/5">
                        <div className="flex flex-col space-y-4">
                            <div className=" p-4 rounded flex flex-col items-center justify-center">
                                <h1 className="font-poppins sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full text-center">
                                    <span
                                        className="font-poppins text-left font-normal"
                                        style={{ color: "#F0C419" }}
                                    >
                                        Check
                                    </span>{" "}


                                    <span className="text-blue_gray-800 text-left font-normal">
                                        {" "}
                                        If Your Emails Are
                                    </span>
                                </h1>
                                <h2 className="font-poppins sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-full text-center">


                                    <span className="text-blue_gray-800 text-left font-normal">
                                        {" "}
                                        Going to
                                    </span>
                                    <span className="text-blue_gray-800  text-left font-normal text-green-500">
                                        {" "}
                                        Spam
                                    </span>
                                    <span className="text-blue_gray-800  text-left font-normal">
                                        {" "}
                                        or
                                    </span>
                                    <span className="text-blue_gray-800  text-left font-normal text-red-500">
                                        {" "}
                                        Inbox
                                    </span>
                                    <span className="text-blue_gray-800  text-left font-normal">
                                        {" "}
                                        ?
                                    </span>
                                </h2>
                                <p className="font-poppins text-base text-blue_gray-800_bf text-center mt-8">
                                    <>
                                        Send an email to the address below to see your Spam Score.                  </>
                                </p>
                            </div>


                            <section className=" p-4 ">
                                <div className="mt-8 flex flex-row justify-center items-center">
                                    <input
                                        id="warmup_input"
                                        name="fieldbox"
                                        placeholder="Enter your email"
                                        className="font-lato p-0 placeholder:text-gray-600 text-left text-xs w-full rounded-xl rounded-r-none w-[400px] md:w-[250px] border border-gray-100"
                                        wrapClassName="flex-1 sm:flex-1 w-[76%] sm:w-full"
                                        type="email"
                                        value={email} // Controlled component
                                        onChange={handleEmailChange} // Update state on change
                                        style={{
                                            padding: "15px 20px",
                                            borderColor: "#e0e0e0", // Light border color
                                            borderWidth: "1px",
                                            fontSize: "16px",
                                        }}
                                    ></input>

                                    <button
                                        id="warmup_button"
                                        className="cursor-pointer flex h-[51px] items-center justify-center rounded-xl px-[10px] rounded-l-none"
                                        size="lg"
                                        onClick={() => {
                                            handleNext();
                                        }}
                                        style={{
                                            color: "#ff841e",
                                            cursor: "pointer",
                                            background: "linear-gradient(to right, #fffde4, #ffe3dc)",
                                            border: "1px solid #e0e0e0",
                                            // borderRadius: "25px",
                                            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <div
                                            className="font-poppins font-semibold text-center text-xs flex items-center justify-center w-full"
                                            style={{ color: "#ff841e", width: "150px" }}
                                        >
                                            <span>Check</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-4 ml-1"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                />
                                            </svg>
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
    )
}
