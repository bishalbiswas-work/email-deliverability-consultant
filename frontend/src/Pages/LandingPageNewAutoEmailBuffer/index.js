import React from "react";

export default function LandingPageNewAutoEmailBuffer() {
  return (
    <div>
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
                        Automated
                      </span>
                      <span className="text-blue_gray-800 font-dmserifdisplay text-left font-normal">
                        {" "}
                        Email Warmup
                      </span>
                    </p>
                    <p className="leading-[170.00%] text-base text-blue_gray-800_bf text-align-left">
                      <>
                        Let our Automated email warm-up Take your emails From
                        Spam to Inbox. <br />
                        30 Second Setup. Unlimited Warmups.
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
                      //   value={email} // Controlled component
                      //   onChange={handleEmailChange} // Update state on change
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
                      //   onClick={() => {
                      //     handleNext();
                      //   }}
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
        </div>
      </div>
    </div>
  );
}
