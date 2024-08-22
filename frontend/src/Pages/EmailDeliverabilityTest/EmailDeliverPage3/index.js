import React from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import DataContext from "ContextAPI/DataState";
import { Helmet } from "react-helmet";

export default function EmailDeliverPage3() {
    const dataContext = useContext(DataContext);

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        const email = localStorage.getItem('emailWarmup');
        setEmail(email)
    })
    async function handleNewEmail() {
        navigate("/email-deliverability-test")
    }
    const [isSectionVisible, setIsSectionVisible] = useState(false);

    const handleButtonClick = () => {
        setIsSectionVisible(!isSectionVisible);
    };
    async function handleMakeitGood() {
        dataContext.openPaymentPage();
    }
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Email warmup is free tool that warm-up your email domain so you land in inbox over spam. "
                />
                <title>FREE Email Deliverability TEST in 5 Seconds</title>
            </Helmet>
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

                            <button className=' py-3 px-6 bg-green-600 text-white rounded-full' onClick={handleMakeitGood}>
                                <span className='text-white text-sm' style={{ color: "white" }}>Make it Good for FREE</span>
                            </button>

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

                </nav>
            </header>
            <div className='h-12'></div>
            <section>
                <div className='flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 p-4 justify-center items-center'>
                    <div className='flex justify-center items-center w-full md:w-1/2' style={{ maxWidth: "800px" }}>
                        <div className='flex flex-col w-full'>
                            <div className='flex flex-col items-center bg-white p-4 shadow-md rounded-md'>
                                {/* <p className='text-xl font-thin my-3'>Well done! Your email is nearly flawless.</p> */}
                                <img src='images/sadFace.png' />
                                <p className='text-base font-thin my-3'>Your email score is:</p>

                                <p className='text-3xl  my-2'><span className='font-bold text-red-500'>20</span><span className='text-2xl'>/100</span></p>
                                <div className='w-full'></div>
                                <p className='text-center text-2xl my-2 text-red-500'>Oh..ho! Your Score is Bad!</p>
                                {/* <p className='text-center text-green-500 my-3'>Email from: {email ? email : ""}</p> */}
                                <button className='my-4 py-3 px-6 bg-green-600 text-white rounded-full' onClick={handleMakeitGood}>
                                    <span className='text-white text-sm' style={{ color: "white" }}>Make it Good for FREE</span>
                                </button>
                            </div>
                            <div>
                                <div className='flex justify-between items-center bg-white p-4 shadow-md rounded-md mt-4 py-8'>
                                    <p className='px-4 mr-4 text-gray-600'>Reasons on why your email score is bad</p>
                                    <button className='bg-white border border-gray-800 text-gray-800 px-4 py-2 rounded-3xl flex items-center' onClick={handleButtonClick}>
                                        <span>View reasons</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                </div>

                                {isSectionVisible && (
                                    <div className='rounded-md shadow-md'>
                                        <div className="flex space-x-4 p-4 bg-gray-50">
                                            <div className="flex items-center space-x-2">
                                                <div className="">
                                                    <img src='images/green-tick.png' />
                                                </div>
                                                <span>You're properly authenticated</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="">
                                                    <img src='images/red-warning.png' />
                                                </div>
                                                <span>You are in 2 blocklists</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="">
                                                    <img src='images/warning.png' />
                                                </div>
                                                <span>Your DKIM signature is valid</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                </div>


            </section>
        </div>
    )
}



// div >
//             <header className="bg-white-A700  p-2 md:px-5 rounded-[20px] shadow-bs1 w-full">
//                 <nav className="bg-gradient-to-r from-white to-purple-100 p-4 flex justify-between items-center">
//                     <div className="flex items-center">
//                         <img
//                             loading="lazy"
//                             className="h-6 md:h-auto object-fit "
//                             src="images2/img_.png"
//                             alt="Three"
//                         />
//                         <span className="ml-2 text-orange-600 font-semibold text-lg">
//                             Auto-warmup
//                         </span>
//                     </div>
//                     <div className="flex md:hidden space-x-4">
//                         <a href="/" className="text-gray-600">
//                             Home
//                         </a>
//                         <a href="/blog" className="text-gray-600">
//                             Blog
//                         </a>
//                         <a href="/blog" className="text-orange-600">
//                             Test Email Score
//                         </a>
//                         <a href="https://emailwarmup.com" className="text-gray-600">
//                             Email Warmup
//                         </a>
//                         <a href="/contact" className="text-gray-600">
//                             Contact Us
//                         </a>
//                     </div>
//                     <div className="flex md:hidden">
//                         <div
//                             className="cursor-pointer flex items-center justify-center min-w-[130px]"
//                             rightIcon={
//                                 <img
//                                     loading="lazy"
//                                     className="h-4 mb-0.5 ml-1"
//                                     src="images2/img_icfluentarrowdown24filled_1_white_a700_16x16.svg"
//                                     alt="ic_fluent_arrow_down_24_filled 1"
//                                 />
//                             }
//                             shape="round"
//                             color="purple_A700_amber_400"
//                         >
//                             <div
//                                 className="font-poppins font-semibold text-center text-xs"
//                                 onClick={() => {
//                                     navigate("/login");
//                                 }}
//                                 style={{
//                                     // background: "#F0C419",
//                                     background: "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Button background color
//                                     padding: "1px",
//                                     color: "white",
//                                     borderRadius: "25px",
//                                 }}
//                             >
//                                 <div
//                                     style={{
//                                         background: "white",
//                                         padding: "10px 20px",
//                                         borderRadius: "25px",
//                                         // Use background for the gradient and apply it to the text
//                                         // background: "linear-gradient(to bottom, #ff7e5f, #feb47b)",
//                                         // WebkitBackgroundClip: "text",
//                                         color: " #feb47b", // Make the text color transparent to reveal the background
//                                         // display: "inline-block", // Needed to apply padding and border-radius effectively
//                                     }}
//                                 >
//                                     Login
//                                 </div>
//                             </div>
//                             {/* <div
//           onClick={() => {
//             // Add your login navigation logic here
//           }}
//           style={{
//             background: "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Button background color
//             color: "black", // Button text color
//             padding: "10px 20px", // Button padding
//             // border: "3px solid", // Border width and style
//             borderRadius: "25px",
//             // borderColor: "transparent", // Transparent border to allow gradient to be visible
//             borderRadius: "5px", // Border radius for rounded corners
//             cursor: "pointer", // Change cursor on hover
//             // outline: "none", // Remove default focus outline
//             // backgroundImage: "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Gradient for the border
//             // backgroundClip: "padding-box", // Clip the background to the padding box
//           }}
//         >
//           Login
//         </div> */}
//                             {/* {LoginPopup()} */}
//                         </div>
//                     </div>
//                     <div className="hidden md:flex items-center">
//                         <button
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="text-orange-600 focus:outline-none"
//                         >
//                             <svg
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16M4 18h16"
//                                 ></path>
//                             </svg>
//                         </button>
//                     </div>
//                     {isOpen && (
//                         <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
//                             <div className="flex flex-col items-center space-y-2 p-4">
//                                 <a href="/" className="text-orange-600">
//                                     Home
//                                 </a>
//                                 <a href="/blog" className="text-orange-600">
//                                     Blog
//                                 </a>
//                                 <a href="/contact" className="text-orange-600">
//                                     Contact Us
//                                 </a>
//                                 <button className="border border-orange-600 text-orange-600 px-4 py-2 rounded w-full">
//                                     Login
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </nav>
//             </header>
//             <div className='h-12'></div>
//             <section>
//                 <div className='flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 p-4 justify-center items-center'>
//                     <div className='flex justify-center items-center w-full md:w-1/2' style={{ maxWidth: "500px" }}>
//                         <div className='flex flex-col w-full'>
//                             <div className='flex flex-col items-center bg-white p-4 shadow-md rounded-md'>
//                                 <p className='text-xl font-thin my-3'>Well done! Your email is nearly flawless.</p>
//                                 <p className='text-base font-thin my-3'>Your email score is:</p>

//                                 <p className='text-3xl  my-2'><span className='font-bold text-yellow-500'>55</span><span className='text-2xl'>/100</span></p>
//                                 <div className='w-full'></div>
//                                 <p className='text-center my-2'>We've found 4 issue(s) that you can do to improve your email deliverability, open rates, and revenue.</p>
//                                 <p className='text-center text-green-500 my-3'>Email from: {email ? email : ""}</p>
//                             </div>
//                             <div className='flex justify-center items-center bg-white p-4 shadow-md rounded-md mt-4 py-8'>
//                                 <button className='bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded-xl' onClick={() => {
//                                     handleNewEmail();
//                                 }} >Start a new test</button>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='flex justify-center items-center w-full md:w-1/2' style={{ maxWidth: "600px" }}>
//                         <div className='flex flex-col w-full bg-white p-4 shadow-md rounded-md'>
//                             <p className='text-lg font-semibold'>Click each problem below to learn how to solve it:</p>
//                             <div className='mt-2'>
//                                 <div className='flex items-center justify-between border-b py-2'>
//                                     <div className='flex items-center'>
//                                         <img src='images/warning.png' />
//                                         <p className='ml-2'>SpamAssassin thinks you can improve</p>
//                                     </div>
//                                     <a href='#' className='text-blue-500'>See details →</a>
//                                 </div>
//                                 <div className='flex items-center justify-between border-b py-2'>
//                                     <div className='flex items-center'>
//                                         <img src='images/green-tick.png' />

//                                         <p className='ml-2'>You're properly authenticated</p>
//                                     </div>
//                                     <a href='#' className='text-blue-500'>See details →</a>
//                                 </div>
//                                 <div className='flex items-center justify-between border-b py-2'>
//                                     <div className='flex items-center'>
//                                         <img src='images/green-tick.png' />
//                                         <p className='ml-2'>Your DKIM signature is valid</p>
//                                     </div>
//                                     <a href='#' className='text-blue-500'>See details →</a>
//                                 </div>
//                                 <div className='flex items-center justify-between border-b py-2'>
//                                     <div className='flex items-center'>

//                                         <img src='images/red-warning.png' />
//                                         <p className='ml-2'>You're listed in 1 blocklist</p>
//                                     </div>
//                                     <a href='#' className='text-blue-500'>See details →</a>
//                                 </div>
//                                 <div className='flex items-center justify-between border-b py-2'>
//                                     <div className='flex items-center'>
//                                         <img src='images/green-tick.png' />
//                                         <p className='ml-2'>No broken links found</p>
//                                     </div>
//                                     <a href='#' className='text-blue-500'>See details →</a>
//                                 </div>
//                                 <div className='flex items-center justify-between border-b py-2'>
//                                     <div className='flex items-center'>
//                                         <img src='images/green-tick.png' />
//                                         <p className='ml-2'>You're properly authenticated</p>
//                                     </div>
//                                     <a href='#' className='text-blue-500'>See details →</a>
//                                 </div>
//                                 <div className='flex items-center justify-between py-2'>
//                                     <div className='flex items-center'>
//                                         <img src='images/green-tick.png' />
//                                         <p className='ml-2'>Your DKIM signature is valid</p>
//                                     </div>
//                                     <a href='#' className='text-blue-500'>See details →</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//             </section>
//         </div >