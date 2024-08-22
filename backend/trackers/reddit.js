const axios = require("axios");
const rollbar = require("./rollbar");
require("dotenv").config(); // Load environment variables from .env file

const REDDIT_TRACKING_ID = "a2_fb9st4nxm93d"; // Replace with your Reddit tracking ID

const redditPixelUpdate = async (event_name, email, currency, value) => {
  try {
    const data = {
      events: [
        {
          event_at_ms: Date.now(),
          event_type: {
            tracking_type: event_name,
          },
          event_metadata: {
            currency: currency,
            value: value,
          },
          user: {
            email: email,
            // domain: process.env.APP_BASE_URL,
          },
        },
      ],
    };

    const response = await axios.post(
      `https://ads-api.reddit.com/api/v2.0/conversions/events/${REDDIT_TRACKING_ID}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0", // You can customize this if needed
          Authorization: `Bearer    ${process.env.REDIT_PIXEL_SECRET}`, // Replace with your Reddit API key
        },
      }
    );

    console.log("Event tracked successfully:", response.data);
  } catch (error) {
    console.error(
      "Error tracking event:",
      error.response ? JSON.stringify(error.response.data) : error.message
    );
    if (process.env.NODE_ENV === "production") {
      rollbar.error("reditPixel: ", error);
    }
  }
};

const redditCustomPixelUpdate = async (
  customEventName,
  email,
  currency,
  value
) => {
  try {
    const data = {
      events: [
        {
          event_at_ms: Date.now(),
          event_type: {
            tracking_type: "Custom",
            custom_event_name: customEventName,
          },
          event_metadata: {
            currency: currency,
            value: value,
          },
          user: {
            email: email,
            // domain: process.env.APP_BASE_URL,
          },
          // custom_event_name: customEventName, // Custom event name field
        },
      ],
    };

    const response = await axios.post(
      `https://ads-api.reddit.com/api/v2.0/conversions/events/${REDDIT_TRACKING_ID}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0", // You can customize this if needed
          Authorization: `Bearer ${process.env.REDIT_PIXEL_SECRET}`, // Replace with your Reddit API key
        },
      }
    );

    console.log("Event tracked successfully:", response.data);
  } catch (error) {
    console.error(
      "Error tracking event:",
      error.response ? JSON.stringify(error.response.data) : error.message
    );
    if (process.env.NODE_ENV === "production") {
      rollbar.error("redditPixel: ", error);
    }
  }
};
async function main() {
  await redditCustomPixelUpdate(
    "UserType_1",
    "bishalbiswas.work@gmail.com",
    "USD",
    0
  );
}

// main();

module.exports = { redditPixelUpdate, redditCustomPixelUpdate };
