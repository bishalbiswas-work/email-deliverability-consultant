const axios = require("axios");
const crypto = require("crypto");

const accessToken =
  "EAAMH6J7jSjwBOZCvudA0LQNAFhqzQ6MgFrGWdZCjYxiNZAeKW3CxyPsNdWjM6XywZALBDZBojen5wovlRgjUuzUpdpKU2cQyKVcZCdnYVIyR7gadkfeXKduL9ZChVdHujvzZAwqXkgFpQLLIia2ZBhtBZCG9ECDlAwdBM2ZCM1AacudMcYqHf5JTjLf8tsBTTpGlNwEZBQZDZD";
const pixelId = "879572310883761";

const sendEventToFacebook = async (eventName, email) => {
  const url = `https://graph.facebook.com/v20.0/${pixelId}/events`;

  const data = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(new Date().getTime() / 1000),
        user_data: {
          em: hashEmail(email),
        },
        custom_data: {
          currency: "USD", // Include the currency parameter
          value: 0, // Include the value parameter, adjust as needed
        },
        action_source: "website",
      },
    ],
    access_token: accessToken,
  };

  try {
    const response = await axios.post(url, data);
    console.log("Event sent to Facebook:", response.data);
  } catch (error) {
    console.error(
      "Error sending event to Facebook:",
      error.response ? error.response.data : error.message
    );
  }
};

const hashEmail = (email) => {
  return crypto.createHash("sha256").update(email).digest("hex");
};

// Usage
// const eventName = "Purchase";
// const email = "bishalbiswas.work@gmail.com";
// sendEventToFacebook(eventName, email);

module.exports = { sendEventToFacebook}
