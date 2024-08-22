require("dotenv").config(); // Load environment variables from .env file

const path = require("path");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const app = express();
const admin = require("./db/dbSetup");
// const Rollbar = require("rollbar");
// let rollbar;
const rollbar = require("./trackers/rollbar");
const mixpanel = require("./trackers/mixpanel");

// New Imports
const backgroundTask = require("./backgroundTask/backgroundTask");
const emailReply = require("./backgroundTask/emailReply");
const moveEmail = require("./backgroundTask/moveEmail");

const errorRoutes = require("./routes/errorRoutes");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const handleStripeWebhook = require("./controllers/handleStripeWebhook");

app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith("www.")) {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
  }
  next();
});

app.use("/api/webhook", express.raw({ type: "application/json" })); // Use this for the webhook route

app.use(express.json()); // For parsing application/json

const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5001",
  "http://localhost:5002",

  "https://www.emaildeliverabilityconsultant.com",
  "https://emaildeliverabilityconsultant.com",

];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("static_pages", express.static("backend/static_pages"));

app.use("/api/error", errorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

app.post(
  "/api/webhook/stripe_webhook",
  handleStripeWebhook.handleStripeWebhook
);

// Serve static files from the React app, assuming 'frontend/build' is directly under the project root
app.use(express.static(path.join(process.cwd(), "frontend/build")));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend/build/index.html"));
});

if (process.env.NODE_ENV === "production") {
  // rollbar = new Rollbar({
  //   accessToken: "23c1d6cbbea54c62a1ff888e4bea0c9b",
  //   captureUncaught: true,
  //   captureUnhandledRejections: true,
  //   environment: "production",
  // });
  console.log("App in productin");

  // Use this middleware at the end of your middleware stack
  app.use(rollbar.errorHandler());
}

let PORT = 5001;

if (process.env.NODE_ENV === "production") {
  PORT = 5000;
} else {
  PORT = 5001;
}

if (process.env.NODE_ENV === "production") {
  // if (process.env.APP_BASE_URL === "automatedemailwarmup.com") {
  cron.schedule("*/10 * * * *", backgroundTask.backgroundTask); // Run every 10 minute
  cron.schedule("*/10 * * * *", emailReply.processAccounts); // Run every 10 minute
  cron.schedule("0 */5 * * *", moveEmail.moveEmail); // Run once every 5 hours
  // }
} else {
  // cron.schedule("* * * * *", backgroundTask.backgroundTask); // Run every minute
  // cron.schedule("*/5 * * * * *", emailReply.processAccounts); // Run every 5 minute
  // cron.schedule("* * * * *", moveEmail.moveEmail); // Run every minute
}

// moveEmail
app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
