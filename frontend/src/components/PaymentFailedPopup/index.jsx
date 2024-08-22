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
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import DataContext from "ContextAPI/DataState";

import Steppers from "components/Steppers";

export default function PaymentFailedPopup({
  open,
  handleClose,
  addMail,
  userStep,
  setUserStep,
  emailForToken,
}) {
  const dataContext = useContext(DataContext);
  const [email, setEmail] = useState("");

  const handleCreditCard = async () => {
    await dataContext.openPaymentPage();
  };
  const handleDebitCard = async () => {
    await dataContext.openPaymentDebitCardPage();
  };
  //
  return (
    <React.Fragment>
      <Dialog
        open={dataContext.showPaymentPopup}
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth={true}
        className="dialog-rad"
        PaperProps={{ sx: { borderRadius: "20px" } }}
        sx={{
          zIndex: 2300,
        }}
      >
        <div
          className="px-4 my-4"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        ></div>
        <div className="mx-6">
          <Typography variant="subtitle2" gutterBottom sx={{ color: "red" }}>
            Oh No...😟 Your Card Failed...⚠️{" "}
          </Typography>
        </div>{" "}
        <div className="divider my-4"></div>{" "}
        <div className="flex flex-col px-6 pb-6 text-base leading-6 bg-white rounded-3xl max-w-[626px] max-md:px-5">
          <div className="flex gap-2 justify-between font-medium text-stone-950 max-md:flex-wrap max-md:max-w-full">
            <Typography variant="subtitle1" gutterBottom>
              Perhaps try a Credit Card Instead?{" "}
            </Typography>
          </div>
          <div className="shrink-0 mt-1 h-px bg-black bg-opacity-10 max-md:max-w-full" />

          <div className="mt-2 text-sm font-medium text-gray-800 text-ellipsis max-md:max-w-full">
            <Typography variant="subtitle1" gutterBottom sx={{ color: "gray" }}>
              Usually this happens with Debit Cards. Try Your Credit Card
              instead to Warmup your Email For Free!{" "}
            </Typography>
          </div>
          <div className="flex flex-col justify-center items-center   mt-2 text-sm whitespace-nowrap bg-white rounded-xl text-neutral-800 max-md:pr-5 max-md:max-w-full text-center">
            <img
              src="images/payment_failed_image.png"
              style={{ maxWidth: "250px", height: "100%" }}
            />
          </div>

          <div className="shrink-0 mt-6 h-px bg-black bg-opacity-10 max-md:max-w-full" />

          <div className="flex justify-around w-full mt-6">
            <div
              className="cursor-pointer flex gap-3 justify-center items-center px-8 py-3 text-center text-white whitespace-nowrap bg-transparent border rounded-[100px] border-[linear-gradient(180deg,#FFC300_0%,#FF5733_100%)] max-md:px-5"
              style={{
                color: "white",
                border: "1px solid  #FFC300",
                background: "linear-gradient(to right, #FFC300, #FF5733)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              onClick={() => {
                handleDebitCard();
              }}
            >
              <div className="text-sm">Try Debit Card for $0.50</div>
              <img
                src={ArrowImage}
                className="aspect-square"
                style={{
                  width: "17px",
                }}
              />
            </div>

            <div
              className="cursor-pointer flex gap-3 justify-center items-center px-8 py-3 text-center text-white whitespace-nowrap bg-[linear-gradient(180deg,#FFC300_0%,#FF5733_100%)] rounded-[100px] max-md:px-5"
              onClick={() => {
                handleCreditCard();
              }}
            >
              <div className="text-sm" style={{ color: "white" }}>
                Try Credit Card for $0.00
              </div>
              <img
                src={ArrowImage}
                className="aspect-square"
                style={{
                  width: "17px",
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
