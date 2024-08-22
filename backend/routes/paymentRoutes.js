const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.route("/").get(paymentController.returnPaymentPage);
router.route("/debit-card").get(paymentController.returnPaymentDebitCardPage);

router
  .route("/create-checkout-session")
  .post(paymentController.createCheckoutSessionForUser);

//
module.exports = router;
