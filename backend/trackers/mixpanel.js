require("dotenv").config(); // Load environment variables from .env file

const Mixpanel = require("mixpanel");
const mixpanel = Mixpanel.init(process.env.MIXPANEL_PROJECT_TOKEN); // Replace with your actual project token

module.exports = mixpanel;
