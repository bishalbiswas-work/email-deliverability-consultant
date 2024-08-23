


import Head from "next/head";
import React from "react";
import { useEffect, useState } from "react";
// import { Button, img, Line, Text } from "components";
// import HomeProcessingOneStackthirty from "components/HomeProcessingOneStackthirty";
// import Video from "../../../assets/images/autowarm.gif";
// import VideoMobile from "../../../assets/images/autowarm-mobile.gif";
// import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import context api
// import { useContext } from "react";
// import DataContext from "ContextAPI/DataState";

//     FREE Email deliverability TEST in 5 Seconds

const Processing = () => {
    // const dataContext = useContext(DataContext);
    const [isMobile, setIsMobile] = useState(false);

    // const navigate = useNavigate();
    const texts = [
        "Analyzing data: Initializing...",
        "Analyzing data: Gathering resources...",
        "Analyzing data: Processing information...",
        "Analyzing data: Finalizing analysis...",
        "Analyzing data: Checking everything...",
        "Analysis complete!",
    ];

    const intervalTime = 1000; // 3 seconds
    const [progress, setProgress] = useState(0);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [showData, setShowData] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {

            // navigate("/email-deliverability-report");
        }, 12000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);
    // This updates the progress of the website
    useEffect(() => {
        // Set the interval for progress update
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(interval);
                    setShowData(true);
                    return 100;
                }
                const diff = 20; // Increment progress by 10%
                return Math.min(oldProgress + diff, 100);
            });
        }, 1000); // Update progress every 1 second

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const userAgent = navigator.userAgent;
        // Regex pattern to check if the userAgent is a mobile device
        const mobilePattern =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

        if (mobilePattern.test(userAgent)) {
            setIsMobile(true);
            console.log("Mobile");
        } else {
            setIsMobile(false);
        }
    }, []);
    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="Email warmup is free tool that warm-up your email domain so you land in inbox over spam. "
                />
                <title>FREE Email Deliverability TEST in 5 Seconds</title>
            </Head>
            <div
                className="bg-gradient1  flex flex-col font-inter sm:gap-10 md:gap-10 gap-[132px] items-center justify-start mx-auto p-8 sm:px-5 w-full"
                style={{ height: "100vh", background: "white" }}
            >
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

                    <div
                        className="cursor-pointer flex items-center justify-center min-w-[130px]"
                        rightIcon={
                            <img
                                className="h-4 ml-1 my-px"
                                src="/images/img_icfluentarrowdown24filled_1.svg"
                                alt="ic_fluent_arrow_down_24_filled 1"
                            />
                        }
                        shape="round"
                        color="purple_A700_amber_400"
                    >
                        {/* <div className="font-poppins font-semibold text-center text-xs">
              Get Started
            </div> */}
                    </div>
                </header>
                <div className="bg-white-A700 flex flex-col gap-12 items-center justify-center max-w-[871px] mb-[212px] mx-auto md:px-5 px-[60px] py-[60px] rounded-[20px] shadow-bs2 w-full">
                    {!showData && (
                        <div className="flex flex-col gap-6 items-center justify-center w-full">
                            <p
                                className="text-base text-black-900 w-auto"
                                size="txtInterRegular16"
                            >
                                {/* Analysing your Mailbox health score.......⚙️ */}
                                {texts[currentTextIndex]}
                            </p>
                            <div className="bg-black-900_0c h-px w-full" ></div>
                        </div>
                    )}
                    {showData && (
                        <div className="flex md:flex-col flex-row md:gap-10 gap-[60px] items-end justify-center w-auto md:w-full">
                            {/* <HomeProcessingOneStackthirty className="h-[100px] md:h-[88px] relative w-[33%] md:w-full" /> */}
                            {!isMobile && (
                                <div className="h-[100px] md:h-[88px] relative w-[33%] md:w-full">
                                    <img
                                        src="/images/autowarm.gif"
                                        style={{
                                            transform: "scale(3.5)",
                                            borderRadius: "20px",
                                        }}
                                    />
                                </div>
                            )}
                            {isMobile && (
                                <div className="w-[98%]">
                                    <img
                                        src="/images/autowarm-mobile.gif"
                                        style={{
                                            // transform: "scale(3.5)",
                                            borderRadius: "20px",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {!showData && (
                        <div
                            style={{
                                width: "100%",
                                backgroundColor: "#ddd",
                                borderRadius: "20px",
                            }}
                        >
                            <div
                                style={{
                                    height: "20px",
                                    width: `${progress}%`,
                                    backgroundColor: "#F0C419",
                                    borderRadius: "20px",
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Processing;
