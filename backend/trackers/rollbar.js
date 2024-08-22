// rollbar.js
const Rollbar = require("rollbar");

// Initialize Rollbar with your access token
rollbar = new Rollbar({
  accessToken: "23c1d6cbbea54c62a1ff888e4bea0c9b",
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "production",
});

module.exports = rollbar;
