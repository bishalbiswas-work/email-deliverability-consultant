const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// router.get("/", throwError);
router.route("/login").post(authController.getUserLogin);
router.route("/signup-new").post(authController.createNewUser);
router.route("/add-warmup-email").post(authController.addNewWarmUpEmail);
router.route("/delete-warmup-email").post(authController.removeWarmUpEmail);
// redirectToGoogleAuth,
// redirectToMicrosoftAuth,
router.route("/google").get(authController.redirectToGoogleAuth);
router.route("/google-nylas").get(authController.redirectToGooglNylaseAuth);

router.route("/microsoft").get(authController.redirectToMicrosoftAuth);
// handleGoogleOAuthCallback,
// handleMicrosoftOAuthCallback,
router
  .route("/google/oauth2callback")
  .get(authController.handleGoogleOAuthCallback);
router
  .route("/google-nylas/oauth2callback")
  .get(authController.handleGoogleNylasOAuthCallback);
router
  .route("/microsoft/oauth2callback")
  .get(authController.handleMicrosoftOAuthCallback);

router
  .route("/microsoft/login")
  .get(authController.redirectToMicrosoftAuthLogin);
router
  .route("/microsoft/oauth2callback/logout")
  .get(authController.redirectToMicrosoftAuthLogout);

router
  .route("/microsoft/oauth2callback/login")
  .get(authController.handleMicrosoftOAuthCallbackLogin);

router.route("/check-email-provider").post(authController.checkEmailProvider);
router
  .route("/verify-email-credential")
  .post(authController.verifyEmailCredentials);

// redirectToMicrosoftAuthLogin,
// handleMicrosoftOAuthCallbackLogin,
module.exports = router;
