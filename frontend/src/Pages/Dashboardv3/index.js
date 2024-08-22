import SemiCircleProgressBar from "react-progressbar-semicircle";
import { CircularProgressWithLabel } from "components/Progress";
import FormDialog from "components/Dialog";
import PaymentFailedPopup from "components/PaymentFailedPopup";
import { useState } from "react";
import { Switch } from "components";
import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import DataContext from "ContextAPI/DataState";
// ----------------------------------------------------------------------

import { useNavigate } from "react-router-dom";
import AppPasswordv2 from "drawers/AppPasswordv2";

export default function Dashboardv3() {
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [mailData, setMailData] = useState([]);
  const [reload, setReload] = useState(false);
  const [takeAppPassword, setTakeAppPassword] = useState(false);
  const [userStep, setUserStep] = useState(1);
  const [emailForToken, setEmailForToken] = useState("");
  const [newEmailAdd, setNewEmailAdd] = useState("");
  const [stopReload, setStopReload] = useState(false);
  const [triggerCheckAccessToken, setTriggerCheckAccessToken] = useState(false);
  const [emailAccessTokenStatus, setEmailAccessTokenStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [averageDeliverability, setAverageDeliverability] = useState(0);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const percentage = 20;

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // Trigger the payment status check
  dataContext.checkPaymentStatus();
  useEffect(() => {
    const loadEmails = async () => {
      try {
        const loginEmail = localStorage.getItem("loginEmail") || "";
        //   console.log("Login Email: ", loginEmail);

        if (loginEmail) {
          const userDetails = await dataContext.getUserDetails(loginEmail);

          const emailData = userDetails.userDoc.warmupEmails.map(
            (item, index) => ({
              id: index + 1,
              status: item.lastWarmup,
              mainEmail: loginEmail,
              email: item.email,
              // accountHealth: 8.5,
              deliverability: item.deliverability || 20,
              notBlack: 81,
              lastWarmupDate: item.lastWarmup
                ? item.lastWarmup.date || "No date available"
                : "No date available",
              lastWarmupCount: item.lastWarmup ? item.lastWarmup.count || 0 : 0,
              creditsAvailable: item.creditsAvailable || 0,
              warmupStatus: item.warmupStatus || "paused",
              //   accessTokenStatus: false,
            })
          );
          setTriggerCheckAccessToken(true);
          setAverageDeliverability(
            Math.round(
              emailData.reduce((acc, curr) => acc + curr.deliverability, 0) /
              emailData.length
            )
          );

          setMailData(emailData);
          console.log("User Account Emails: ", emailData);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Dashboardv3/loadEmails useEffect: ", error);
      }
    };
    loadEmails();
  }, []);
  useEffect(() => {
    if (!stopReload) {
      fetchEmailSetup();
    }
  }, [mailData, navigate, triggerCheckAccessToken]); // Assuming `navigate` is defined somewhere in your component or props

  useEffect(() => {
    console.log("Email with Access Token Status ", emailAccessTokenStatus);

    // const processEmailsSequentially = async () => {
    //   for (const emailStatus of emailAccessTokenStatus) {
    //     if (emailStatus.accessTokenPresent === false) {
    //       setTakeAppPassword(true);
    //       // setOpen(true);
    //       // setUserStep(2);
    //       setEmailForToken(emailStatus.email);
    //       //   setStopReload(true);
    //       // Wait for some condition or just break after setting up the first one with issues
    //       break;
    //     }
    //   }
    // };
    const processEmailsSequentially = async () => {
      // Get emails from localStorage
      const storedEmails = JSON.parse(
        localStorage.getItem("newEmails") || "[]"
      );

      if (storedEmails.length > 0) {
        // If emails are present in localStorage
        const firstEmail = storedEmails[0];
        const remainingEmails = storedEmails.slice(1);
        setTakeAppPassword(true);
        setEmailForToken(firstEmail);
        console.log("First Email: ", firstEmail);
        localStorage.setItem("newEmails", JSON.stringify(remainingEmails));
      } else {
        // If no emails are present in localStorage, execute the for loop
        for (const emailStatus of emailAccessTokenStatus) {
          if (emailStatus.accessTokenPresent === false) {
            setTakeAppPassword(true);
            // setOpen(true);
            // setUserStep(2);
            setEmailForToken(emailStatus.email);
            //   setStopReload(true);
            // Wait for some condition or just break after setting up the first one with issues
            break;
          }
        }
      }
    };

    if (emailAccessTokenStatus.length > 0) {
      processEmailsSequentially();
    }
  }, [emailAccessTokenStatus]);

  const fetchEmailSetup = async () => {
    // Clearing the previous statuses before fetching new ones
    const newEmailStatuses = [];
    console.log("asfasdfsdf", mailData.length);
    for (let index = 0; index < mailData.length; index++) {
      const emailItem = mailData[index];
      try {
        if (emailItem.warmupStatus === "active") {
          const sendData = {
            userEmail: emailItem.email,
          };
          const res = await dataContext.getWarmupEmailSetup(sendData);
          console.log("Email Setup: ", res);

          const responseData = res?.data || {};
          // const accessTokenPresent = !!responseData.accessToken;
          const accessTokenPresent = !!(
            responseData.accessToken || responseData.password
          );

          const status = res?.status;

          // Collect the new status for later update
          newEmailStatuses.push({
            email: emailItem.email,
            accessTokenPresent,
          });
          console.log("Email Required Setup: ", newEmailStatuses);

          if (!accessTokenPresent || !status) {
            // Here you can trigger UI changes or other logic depending on the accessToken status
          }
        } else if (emailItem.warmupStatus === "paused") {
          console.log(
            "This email not added for get accessToken as warmup status is paused: ",
            emailItem.email
          );
        }
      } catch (error) {
        console.error("Failed to fetch warmup email setup:", error);
      }
    }

    if (mailData.length > 0) {
      // Update the state only once after all statuses are checked
      setEmailAccessTokenStatus(newEmailStatuses);
      console.log("Email Status by accesstoken: ", mailData);
      setStopReload(true); // Assuming setStopReload should be set after all processing is done
    }
  };

  const reloadWarmUpEmails = async () => {
    try {
      const loginEmail = localStorage.getItem("loginEmail") || "";
      //   console.log("Login Email: ", loginEmail);

      if (loginEmail) {
        const userDetails = await dataContext.getUserDetails(loginEmail);

        const emailData = userDetails.userDoc.warmupEmails.map(
          (item, index) => ({
            id: index + 1,
            status: item.lastWarmup,
            mainEmail: userDetails.email,
            email: item.email,
            // accountHealth: 8.5,
            deliverability: item.deliverability || 20,
            notBlack: 81,
            lastWarmupDate: item.lastWarmup
              ? item.lastWarmup.date || "No date available"
              : "No date available",
            lastWarmupCount: item.lastWarmup ? item.lastWarmup.count || 0 : 0,
            creditsAvailable: item.creditsAvailable || 0,
            warmupStatus: item.warmupStatus || "paused",
            //   accessTokenStatus: false,
          })
        );
        setAverageDeliverability(
          Math.round(
            emailData.reduce((acc, curr) => acc + curr.deliverability, 0) /
            emailData.length
          )
        );

        setMailData(emailData);
        console.log("User Account Emails: ", emailData);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Dashboardv3/reloadWarmUpEmails: ", error);
    }
  };
  const addMail = async (email) => {
    try {
      const loginEmail = localStorage.getItem("loginEmail") || "";
      if (loginEmail) {
        const data = {
          mainEmail: loginEmail,
          newWarmupEmail: email,
        };
        localStorage.removeItem("newEmails");
        await dataContext.newWarmupEmail(data);
        localStorage.setItem("newEmails", JSON.stringify(email));

        // await reloadWarmUpEmails();
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Wait for 1 second before reloading the page
      } else {
        console.log("Cannot add new email as login email not present");
      }
    } catch (error) {
      console.error("Error adding email:", error);
    }
  };

  const handleSwitchChange = async (index, checked) => {
    const newWarmupStatus = checked ? "active" : "paused";
    setMailData((currentMailData) =>
      currentMailData.map((mail, mailIndex) =>
        mailIndex === index ? { ...mail, warmupStatus: newWarmupStatus } : mail
      )
    );

    const data = {
      mainEmail: mailData[index].mainEmail,
      warmupEmail: mailData[index].email,
      newWarmupStatus: checked ? "active" : "paused",
    };
    // console.log("User send data", data);

    try {
      await dataContext.updateUserEmailWarmupStatus(data);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update warmup status:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  //   const handleClose = (email) => {
  //     // Add login here as if user click on cross, as access token is not provided then turn the toggle off
  //     console.log("User Cliced to close pop-up", email);
  //     setOpen(false);
  //   };
  const handleClose = async (email) => {
    console.log("User clicked to close pop-up", email);
    setOpen(false);

    // Find the email and check accessToken status
    // const emailEntry = emailAccessTokenStatus.find((e) => e.email === email);
    // if (!emailEntry || (emailEntry && !emailEntry.accessTokenPresent)) {
    //   const index = mailData.findIndex((mail) => mail.email === email);
    //   if (index !== -1) {
    //     const loginEmail = localStorage.getItem("loginEmail") || "";
    //     const data = {
    //       mainEmail: loginEmail,
    //       warmupEmail: email,
    //       newWarmupStatus: "paused",
    //     };

    //     try {
    //       await dataContext.updateUserEmailWarmupStatus(data);
    //       console.log("Warmup status updated to paused for:", email);

    //       window.location.reload();
    //     } catch (error) {
    //       console.error("Failed to update warmup status for", email, error);
    //     }
    //   }
    // }
  };

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = (state, email) => {
    setOpenDeleteDialog(false);
    if (state && email) {
      console.log("Email Delete: ", state, email);
      const loginEmail = localStorage.getItem("loginEmail") || "";
      if (loginEmail) {
        const data = {
          mainEmail: loginEmail,
          warmupEmailToRemove: email,
        };
        dataContext.removeWarmupEmail(data);
      }

      setTimeout(() => {
        window.location.reload();
      }, 1000); // Wait for 1 second before reloading the page
    }
  };
  async function handleSetUpNeeded(email) {
    setTakeAppPassword(true);
    setEmailForToken(email);
    console.log("Setup Email: ", email);
  }
  return (
    <div>
      <div style={{ height: "100vh", background: "white" }}>
        <div style={{ height: "100%", background: "white" }}>
          <div className="flex gap-0.5 rounded-3xl max-md:flex-wrap">
            <img
              style={{ marginBottom: "65vh" }}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/97e5ac7859a63cd36b4b14a939c0ea633f28526456bf2ebd609a816614ac2fba?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className=""
            />
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-9/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow px-6 pt-6 pb-12 w-full bg-white max-md:px-5 max-md:max-w-full">
                      {/* <div
                    style={{
                      color: "white",
                    }}
                    className="flex gap-5 justify-between py-1.5 pr-2.5 pl-5 text-sm text-white shadow-lg bg-[linear-gradient(135deg,#7C3AED_0%,#5821B6_100%)] rounded-[100px] max-md:flex-wrap max-md:max-w-full"
                  >
                    <div className="flex gap-3 my-auto font-medium leading-6 max-md:flex-wrap max-md:max-w-full">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4868392a8f5e577365890f1317e2099d7db4df8a1f81e96ae4ee455c3e031ac4?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="my-auto w-4 aspect-square"
                      />
                      <div className="flex-auto max-md:max-w-full">
                        Let AI Do Your SEO So You Rank On Google Fast!
                      </div>
                    </div>
                    <div className="flex gap-3 justify-between pr-3 font-bold whitespace-nowrap leading-[140%]">
                      <div className="flex gap-1 justify-between px-2.5 py-1 rounded-sm">
                        <div className="grow">
                          <a href="https://automateseo.co/" target="_blank">
                            Get it now
                          </a>
                        </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c0d65d929add1634357883dd69f0136d4b63f3538ea16e9c047863a50e31188?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="my-auto w-4 aspect-square"
                        />
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0dfa89efde24e33e51a4c1a42f2b2c3e158d016b1083110e36bd14d35ba6a451?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="my-auto w-4 aspect-square"
                      />
                    </div>
                  </div> */}
                      <div className="flex flex-col justify-center px-5 py-4 mt-8 text-base leading-7 bg-white rounded-2xl border border-solid border-black border-opacity-10 text-neutral-700 max-md:max-w-full">
                        <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                          <img
                            loading="lazy"
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/40a59c38f5424718d11e77dc9f12739aff894320d0e9eee74644652ae2c11154?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/40a59c38f5424718d11e77dc9f12739aff894320d0e9eee74644652ae2c11154?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/40a59c38f5424718d11e77dc9f12739aff894320d0e9eee74644652ae2c11154?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/40a59c38f5424718d11e77dc9f12739aff894320d0e9eee74644652ae2c11154?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/40a59c38f5424718d11e77dc9f12739aff894320d0e9eee74644652ae2c11154?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/40a59c38f5424718d11e77dc9f12739aff894320d0e9eee74644652ae2c11154?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/40a59c38f5424718d11e77dc9f12739aff894320d0e9eee74644652ae2c11154?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/40a59c38f5424718d11e77dc9f12739aff894320d0e9eee74644652ae2c11154?apiKey=599dc50b3d834ed59f450af622cca86d&"
                            className="w-8 aspect-square"
                          />
                          <div className="grow max-md:max-w-full mt-2">
                            Your Daily Email Limit is 100. Please Increase by 10
                            Per day.
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5 justify-between mt-8 w-full max-md:flex-wrap max-md:max-w-full">
                        <div className="flex-auto self-start mt-2.5 text-lg font-semibold leading-7 text-neutral-800">
                          Mailbox management
                        </div>
                        <div
                          style={{
                            color: "white",
                          }}
                          onClick={() => {
                            // console.log("Clicked");
                            handleClickOpen();
                          }}
                          className="flex gap-2 justify-between px-4 py-3 text-sm font-medium leading-4 text-white whitespace-nowrap border border-solid bg-[linear-gradient(180deg,#FFC300_0%,#FF5733_100%)] border-[color:var(--G1,#FFC300)] rounded-[32px]"
                        >
                          <div className="mb-0.5 cursor-pointer grow">
                            Add new mailbox
                          </div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/79671c35c08f1ac1ec76b81b1a14f27536f23c838a250f565e219e8939cf74c1?apiKey=599dc50b3d834ed59f450af622cca86d&"
                            className="w-4 aspect-square"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col px-6 py-5 mt-8 bg-white rounded-xl border border-solid border-black border-opacity-10 max-md:px-5 max-md:max-w-full">
                        <table>
                          <tr className="pb-5 w-full text-base font-bold leading-6 whitespace-nowrap border-b-2 border-solid border-black border-opacity-10 text-opacity-80 max-md:flex-wrap max-md:max-w-full">
                            <th className="justify-between pr-3  pb-3.5 ">
                              <div className="grow">Status</div>
                            </th>
                            <th className="justify-between pb-3.5 ">
                              <div
                                className="grow"
                                style={{
                                  textAlign: "start",
                                }}
                              >
                                Email address
                              </div>
                            </th>
                            {/* <th className="justify-between pb-3.5 ">
                          <div className="grow">Account health</div>
                        </th> */}
                            <th className="justify-between pr-1.5 pb-3.5 ">
                              <div className="grow">Deliverability</div>
                            </th>
                            <th className="justify-between pb-3.5 ">
                              <div className="grow">Not backlisted</div>
                            </th>
                            <th
                              className="grow pb-3.5"
                              style={{
                                textAlign: "start",
                              }}
                            >
                              Action
                            </th>
                          </tr>

                          {mailData?.length ? (
                            mailData.map((mail, index) => (
                              <tr
                                key={mail?.id}
                                style={{
                                  borderBottomWidth: "1px",
                                  cellPadding: "25px",
                                }}
                                className="border-b-2  border-black border-opacity-10"
                              >
                                <td className="flex flex-col justify-center py-5 pr-0.5 pl-5 aspect-[1.85] fill-white stroke-[1px] stroke-black">
                                  {/* <Switch value={mail?.status} onColor="#FFC300" /> */}
                                  {/* {console.log("mail", mail.warmupStatus)} */}
                                  <Switch
                                    onChange={(checked) =>
                                      handleSwitchChange(index, checked)
                                    }
                                    value={mail.warmupStatus === "active"}
                                    onColor="#FFC300"
                                  />
                                </td>
                                <td className="flex-auto text-sm tracking-tight text-zinc-700  ">
                                  <div className="flex items-center space-x-2">
                                    <div>{mail?.email}</div>

                                    {emailAccessTokenStatus &&
                                      emailAccessTokenStatus.length > 0 &&
                                      emailAccessTokenStatus.some(
                                        (status) =>
                                          status.email === mail.email &&
                                          !status.accessTokenPresent
                                      ) && (
                                        <div>
                                          <div
                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-white bg-red-100 text-xs font-medium cursor-pointer"
                                            onClick={() =>
                                              handleSetUpNeeded(mail.email)
                                            }
                                          >
                                            <img
                                              src="/icons/warning.png"
                                              alt="Warning"
                                              className="h-4 w-4 mr-1"
                                            />
                                            Setup Needed
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                </td>
                                {/* <td className="flex-auto text-sm tracking-tight text-center  text-zinc-700">
                              {mail?.accountHealth}%
                            </td> */}
                                <td className="grow text-sm tracking-tight text-center  py-5  text-zinc-700">
                                  {mail?.deliverability}%
                                </td>
                                <td className="grow text-sm tracking-tight text-center  py-5  text-zinc-700">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1876fec2b50522ab16d508a1b379d624b0e3a1bcc2b3e501c69bd9821209e530?apiKey=599dc50b3d834ed59f450af622cca86d&"
                                    className="my-auto aspect-[1.06] fill-[linear-gradient(135deg,#0A9271_0%,#088B83_100%)] mx-auto pb-1"
                                  />
                                </td>
                                <td className="flex pl-3 justify-between py-5">
                                  <div>
                                    <div>
                                      {/* <div
                                        className=" rounded-full bg-white"
                                        // onClick={handleClickMenu}
                                      >
                                        <img
                                          loading="lazy"
                                          // src="/icons/delete.svg"
                                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/214688b1eec4f626496cc175af94fe20d746775a786ca44f0d6d4d1a3b28883b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                                          className="aspect-square w-[32px] cursor-pointer"
                                        />
                                      </div> */}
                                      {/* setOpenDeleteDialog */}
                                      <Button
                                        // variant="outlined"
                                        onClick={handleClickOpenDeleteDialog}
                                      >
                                        <img
                                          loading="lazy"
                                          // src="/icons/delete.svg"
                                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/214688b1eec4f626496cc175af94fe20d746775a786ca44f0d6d4d1a3b28883b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                                          className="aspect-square w-[32px] cursor-pointer"
                                        />
                                      </Button>
                                      <Dialog
                                        open={openDeleteDialog}
                                        onClose={() => {
                                          handleCloseDeleteDialog();
                                        }}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                      >
                                        <DialogTitle
                                          id="alert-dialog-title"
                                          sx={{ color: "orange" }}
                                        >
                                          {
                                            "Are you sure, you want to delete this email?"
                                          }
                                        </DialogTitle>
                                        <DialogContent>
                                          <DialogContentText
                                            id="alert-dialog-description"
                                            className="text-gray-500"
                                          >
                                            <span style={{ color: "gray" }}>
                                              {mail?.email}
                                            </span>
                                            <br />
                                            Warning: If you delete, you will not
                                            receive the warm-up email message.
                                          </DialogContentText>
                                        </DialogContent>

                                        <DialogActions>
                                          <Button
                                            onClick={() => {
                                              handleCloseDeleteDialog(
                                                false,
                                                mail?.email
                                              );
                                            }}
                                            className="bg-[linear-gradient(180deg,#FFC300_0%,#FF5733_100%)] border-[color:var(--G1,#FFC300)]"
                                            sx={{
                                              borderRadius: "05px",
                                              color: "white",
                                            }}
                                          >
                                            Disagree
                                          </Button>
                                          <Button
                                            onClick={() => {
                                              handleCloseDeleteDialog(
                                                true,
                                                mail?.email
                                              );
                                            }}
                                            autoFocus
                                            sx={{
                                              borderRadius: "10px",
                                              border: "2px solid orange", // Adjusted border property
                                              color: "orange",
                                            }}
                                          >
                                            Agree
                                          </Button>
                                        </DialogActions>
                                      </Dialog>
                                    </div>
                                    {/* <div>
                                      <Button
                                        id="demo-positioned-button"
                                        aria-controls={
                                          openMenu
                                            ? "demo-positioned-menu"
                                            : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                          openMenu ? "true" : undefined
                                        }
                                        onClick={handleClickMenu}
                                      >
                                        <img
                                          loading="lazy"
                                          // src="/icons/delete.svg"
                                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/214688b1eec4f626496cc175af94fe20d746775a786ca44f0d6d4d1a3b28883b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                                          className="aspect-square w-[32px] cursor-pointer"
                                        />
                                      </Button>

                                      <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={anchorEl}
                                        open={openMenu}
                                        onClose={handleCloseMenu}
                                        anchorOrigin={{
                                          vertical: "top",
                                          horizontal: "left",
                                        }}
                                        transformOrigin={{
                                          vertical: "top",
                                          horizontal: "left",
                                        }}
                                        sx={{
                                          "& .MuiPaper-root": {
                                            boxShadow: 1,
                                          },
                                        }}
                                      >
                                        <MenuItem onClick={handleCloseMenu}>
                                          Remove Email
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMenu}>
                                          Warmup Settings
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMenu}>
                                          Manage Preferences
                                        </MenuItem>
                                      </Menu>
                                    </div> */}
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <p
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: "20px",
                              }}
                            >
                              No Mails
                            </p>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow px-6 pt-6 pb-12 w-full font-medium bg-white max-md:px-5">
                      <div className="flex flex-col items-center px-10 py-6 whitespace-nowrap bg-white rounded-xl border border-solid border-black border-opacity-10 max-md:px-5">
                        <div className="text-lg font-semibold tracking-normal text-neutral-700">
                          Deliverability score
                        </div>
                        {/* <div className="flex overflow-hidden relative flex-col justify-center items-center pr-6 mt-6 text-3xl tracking-tighter text-center aspect-[2.05] fill-slate-200 text-neutral-900 w-[209px] max-md:pr-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b3aa5f5155bfab632c289c0a8c39fed042721c447f327cb421eb551726ed52c?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-cover absolute inset-0 size-full"
                      />
                      <div className="flex relative flex-col gap-5 justify-between pt-8 aspect-[1.81] fill-emerald-600">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c5e277947f821f5bb990cdcadcb9b552ae10cc22855ee8ca98d361555e8c9af?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-cover absolute inset-0 size-full"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/82d7f65131b827f3688a00b838845f01857f6189ffcad8dcd55c5e3b421b7811?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="w-10 aspect-[0.57] fill-zinc-300"
                        />
                        <div className="relative flex-auto self-end mt-10">
                          94%
                        </div>
                      </div>
                    </div> */}
                        <SemiCircleProgressBar
                          percentage={averageDeliverability}
                          showPercentValue
                          stroke={"#118868"}
                          strokeWidth={15}
                          style={{
                            borderRadius: "15px",
                          }}
                        />

                        {/* <CircularProgressbar
                      value={0.2}
                      maxValue={1}
                      text={`${0.2 * 100}%`}
                      circleRatio={0.5}
                      startingAngle={-90} // Start from the left side (90 degrees)
                      styles={buildStyles({
                        pathColor: "#118868",
                        textColor: "gray",
                        startingAngle: -90, // Start from the left side (90 degrees)
                      })}
                    /> */}
                        {/* <div className="mt-2 text-xs text-blue-500">
                        Last updated 1 Mar 24
                      </div> */}
                      </div>
                      <div className="flex overflow-hidden overflow-hidden  flex-col px-5 py-6 mt-6 w-full text-sm bg-white rounded-xl border border-solid border-black border-opacity-10 text-neutral-800">
                        {/* <div
                        className="flex overflow-hidden relative flex-col gap-5 justify-between self-center px-6 py-3 text-base font-semibold text-emerald-600 aspect-[3.13] fill-white stroke-[1px] stroke-black stroke-opacity-10 max-md:px-5"
                        style={{ minHeight: "80px" }}
                      >
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae9f4e17e3c9781fe0bb4feea40cac0c494c92582bcd8880d5482b0955aa7d85?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-cover absolute inset-0 size-full"
                        />
                        <div
                          className="relative flex-col justify-center whitespace-nowrap aspect-square"
                          style={{
                            paddingBottom: "45px",
                          }}
                        >
                          <CircularProgressWithLabel value={percentage} />;
                        </div>
                      </div> */}
                        <div className="flex gap-5 justify-between mt-7">
                          <div>Mailbox temp.</div>
                          <div className="bg-clip-text bg-[linear-gradient(180deg,#FFC300_0%,#FF5733_100%)]">
                            <span className="font-bold">100</span> /day
                          </div>
                        </div>
                        <div className="flex gap-5 justify-between mt-7 whitespace-nowrap">
                          <div>SPF</div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a0e2d4a452f9d21f2c6f03ef6287e62c206970ef4a569bff14fab17e83ae5e0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                            className="w-5 aspect-square"
                          />
                        </div>
                        <div className="flex gap-5 justify-between mt-4 whitespace-nowrap">
                          <div>DKIM</div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a0e2d4a452f9d21f2c6f03ef6287e62c206970ef4a569bff14fab17e83ae5e0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                            className="w-5 aspect-square"
                          />
                        </div>
                        <div className="flex gap-5 justify-between mt-4 whitespace-nowrap">
                          <div>DMARC</div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a0e2d4a452f9d21f2c6f03ef6287e62c206970ef4a569bff14fab17e83ae5e0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                            className="w-5 aspect-square"
                          />
                        </div>
                        <div className="flex gap-5 justify-between mt-4">
                          <div>Not blacklisted</div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a0e2d4a452f9d21f2c6f03ef6287e62c206970ef4a569bff14fab17e83ae5e0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                            className="w-5 aspect-square"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AppPasswordv2
            email={emailForToken}
            leftProp={takeAppPassword}
            setLeftProp={setTakeAppPassword}
          />

          <FormDialog
            open={open}
            handleClose={handleClose}
            addMail={addMail}
            emailForToken={newEmailAdd}
            userStep={userStep}
            setUserStep={setUserStep}
          />

          {/* {!newEmailAdd && (
            <FormDialog
              open={open}
              handleClose={handleClose}
              addMail={addMail}
              emailForToken={emailForToken}
              userStep={userStep}
              setUserStep={setUserStep}
            />
          )} */}
          <PaymentFailedPopup />
        </div>
      </div>
    </div>
  );
}
