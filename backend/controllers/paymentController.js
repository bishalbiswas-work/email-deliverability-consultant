const admin = require("../db/dbSetup");
const db = admin.firestore();
const path = require("path");
const fs = require("fs");
const rollbar = require("../trackers/rollbar");
const Stripe = require("stripe");
const stripe = Stripe(
  "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"
);

const returnPaymentPage = async (req, res) => {
  try {
    // Assuming the 'static_pages' directory is in the main folder, not inside the directory where this script resides
    const paymentPagePath = path.join(
      __dirname,
      "..",
      "static_pages",
      "payment.html"
    );
    res.sendFile(paymentPagePath);
  } catch (error) {
    console.error("paymentController/returnPaymentPage : ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("paymentController/returnPaymentPage : " + err);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const returnPaymentDebitCardPage = async (req, res) => {
  try {
    // Assuming the 'static_pages' directory is in the main folder, not inside the directory where this script resides
    const paymentPagePath = path.join(
      __dirname,
      "..",
      "static_pages",
      "payment_debit_card.html"
    );
    res.sendFile(paymentPagePath);
  } catch (error) {
    console.error("paymentController/returnPaymentDebitCardPage : ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("paymentController/returnPaymentDebitCardPage : " + err);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const createCheckoutSessionForUser = async (req, res) => {
  try {
    // price id : price_1OzV4dJCMgay6huUAiWsm6ML
    const { email, priceId, mode } = req.body;
    if (!email) {
      res.send(200).send({ status: false, message: "Email missing" });
    }
    const sessionConfig = {
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // mode: "subscription",
      mode: mode,
      // APP_BASE_URL
      success_url: `https://${process.env.APP_BASE_URL}/login`,
      cancel_url: `https://${process.env.APP_BASE_URL}/login`,
    };

    if (email) {
      sessionConfig.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    res.status(200).send({ sessionId: session.id });
  } catch (error) {
    console.error("paymentController/createCheckoutSessionForUser : ", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("paymentController/createCheckoutSessionForUser : " + err);
    }
    res.status(500).send({
      status: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

module.exports = {
  returnPaymentPage,
  createCheckoutSessionForUser,
  returnPaymentDebitCardPage,
};
