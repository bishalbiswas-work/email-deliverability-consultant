const Stripe = require("stripe");
const stripe = Stripe(
  "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"
);
require("dotenv").config(); // Load environment variables from .env file
const emailFunctions = require("../backgroundTask/emailFunctions");
const rollbar = require("../trackers/rollbar");
// const endpointSecret =
//   "whsec_0bccc204c0b39e6b6b1697c1a3432e6a9e50dbdeb8ebb0a6ca9c1bda2783e397";
// const endpointSecret =
//   "whsec_43cd6eaacf4ab15c32d728ae91a41ce8d5695ee38238c443cdda77310b2eb9cf";

async function handleStripeWebhook(request, response) {
  // console.log("Request body type:", typeof request.body);
  // console.log("Is Buffer?", Buffer.isBuffer(request.body));
  // console.log("Request body:", request.body);

  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.ENDPOINT_STRIPE_SECRET
    );
  } catch (err) {
    console.error(`Error constructing webhook event: ${err.message}`);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("handleStripeWebhook/handleStripeWebhook : " + err);
    }
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (process.env.NODE_ENV === "production") {
    rollbar.error("handleStripeWebhook/handleStripeWebhook : event recevied");
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case "customer.subscription.created":
        await handleCustomerSubscriptionCreated(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleCustomerSubscriptionDeleted(event.data.object);
        break;
      case "customer.subscription.paused":
        await handleCustomerSubscriptionPaused(event.data.object);
        break;
      case "customer.subscription.resumed":
        await handleCustomerSubscriptionResumed(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleCustomerSubscriptionUpdated(event.data.object);
        break;
      case "invoice.created":
        await handleInvoiceCreated(event.data.object);
        break;
      case "invoice.upcoming":
        await handleInvoiceUpcoming(event.data.object);
        break;
      case "payment_method.attached":
        await handlePaymentMethodAttached(event.data.object);
        break;
      case "customer.created":
        await handleCustomerCreated(event.data.object);
        break;
      case "product.created":
        await handleProductCreated(event.data.object);
        break;
      case "plan.created":
        await handlePlanCreated(event.data.object);
        break;
      case "price.created":
        await handlePriceCreated(event.data.object);
        break;
      case "charge.succeeded":
        await handleChargeSucceeded(event.data.object);
        break;
      case "customer.updated":
        await handleCustomerUpdated(event.data.object);
        break;
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      case "payment_intent.created":
        await handlePaymentIntentCreated(event.data.object);
        break;
      case "invoice.finalized":
        await handleInvoiceFinalized(event.data.object);
        break;
      case "invoice.paid":
        await handleInvoicePaid(event.data.object);
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      case "charge.dispute.created":
        await handleChargeDisputeCreated(event.data.object);
        break;
      // Add additional cases as necessary
      default:
        console.warn(`Unhandled event type ${event.type}`);
    }
    response.send("Event handled");
  } catch (err) {
    console.error(`Error processing webhook event: ${err.message}`);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("OauthFunctions/refreshGoogleAccessToken : " + err);
    }
    response.status(500).send(`Server Error: ${err.message}`);
  }
}

// Define each event handler function here
async function handleCheckoutSessionCompleted(session) {
  // Logic to handle event
  console.log("Checkout session completed:", session);
}

async function handleCustomerSubscriptionCreated(subscription) {
  // Logic to handle event
  console.log("Customer subscription created:", subscription);
}

// async function handleCustomerSubscriptionDeleted(subscription) {
//   // Logic to handle event
//   // console.log("Customer subscription deleted:", subscription);
//   console.log("Customer subscription deleted:", JSON.stringify(subscription));
// }

async function handleCustomerSubscriptionDeleted(subscription) {
  try {
    // Extract customer_id from the subscription object
    const customerId = subscription.customer;

    // Log the customer_id
    console.log("Customer ID:", customerId);

    // Retrieve customer details from Stripe
    const customer = await stripe.customers.retrieve(customerId);

    // Extract email and name from the customer object
    const email = customer.email;
    const name = customer.name;

    // const email = "bishalbiswas.work@gmail.com";
    // const name = "Bishal Biswas";
    // Log the extracted values
    // console.log("Customer subscription deleted:", JSON.stringify(subscription));
    // console.log("Email:", email);
    // console.log("Name:", name);

    // Call another function with the extracted email and name
    // processCustomerSubscription(email, name);
    const subject = "Action Needed to Cancel Your EmailWArmup Subscription";
    const body = `
Hi ${name},

Breaks our hearts to see you go! We completely respect your decision.

To be able to cancel your subscription, we need you to reply to this email with the reason to be able to file it.

Looking Foward to Hearing From You,
Customer Support Specialist,`;

    emailFunctions.sendOAuthEmail(
      "hello@automatedemailwarmup.com",
      email,
      subject,
      body,
      false
    );
  } catch (error) {
    console.error("Error retrieving customer details:", error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error(
        "handleStripeWebhook/handleCustomerSubscriptionDeleted : " + err
      );
    }
  }
}

async function handleCustomerSubscriptionPaused(subscription) {
  // Logic to handle event
  console.log("Customer subscription paused:", subscription);
}

async function handleCustomerSubscriptionResumed(subscription) {
  // Logic to handle event
  console.log("Customer subscription resumed:", subscription);
}

async function handleCustomerSubscriptionUpdated(subscription) {
  // Logic to handle event
  console.log("Customer subscription updated:", subscription);
}

async function handleInvoiceCreated(invoice) {
  // Logic to handle event
  console.log("Invoice created:", invoice);
}

async function handleInvoiceUpcoming(invoice) {
  // Logic to handle event
  console.log("Invoice upcoming:", invoice);
}

async function handlePaymentMethodAttached(paymentMethod) {
  console.log("Payment method attached:", paymentMethod);
}

async function handleCustomerCreated(customer) {
  console.log("Customer created:", customer);
}

async function handleProductCreated(product) {
  console.log("Product created:", product);
}

async function handlePlanCreated(plan) {
  console.log("Plan created:", plan);
}

async function handlePriceCreated(price) {
  console.log("Price created:", price);
}

async function handleChargeSucceeded(charge) {
  console.log("Charge succeeded:", charge);
}

async function handleCustomerUpdated(customer) {
  console.log("Customer updated:", customer);
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log("Payment intent succeeded:", paymentIntent);
}

async function handlePaymentIntentCreated(paymentIntent) {
  console.log("Payment intent created:", paymentIntent);
}

async function handleInvoiceFinalized(invoice) {
  console.log("Invoice finalized:", invoice);
}

async function handleInvoicePaid(invoice) {
  console.log("Invoice paid:", invoice);
}

async function handleInvoicePaymentSucceeded(invoice) {
  console.log("Invoice payment succeeded:", invoice);
}

async function handleChargeDisputeCreated(dispute) {
  try {
    // Automatically accept the dispute
    // const dispute = await stripe.disputes.close(dispute.id);
    // console.log(`Dispute ${dispute.id} accepted.`);


    const customerEmail = dispute.evidence.customer_email_address;
    const customerName = dispute.evidence.customer_name;
    const subject = "Action Needed to Cancel Your EmailWArmup Subscription";
    const body = `
Hi ${customerName},

Faith here, your customer support specialist at EmailWarmup.

Breaks our heart to hear you about your dispute despite your email deliverability going up by 72%. 

Nonetheless, in the spirit of goodwill, please revert your dispute so we **Fully Refund** **Immediately** you with **proof of receipt**.

Otherwise, we’ll have to counter the dispute, which may or may not result in a refund that’ll take months to come.

Looking Foward to Hearing From You,

Customer Support Specialist,

Faith`;

    emailFunctions.sendOAuthEmail(
      "hello@automatedemailwarmup.com",
      customerEmail,
      subject,
      body,
      false
    );

  } catch (error) {
    console.error(`Failed to accept dispute ${dispute.id}:`, error);
    if (process.env.NODE_ENV === "production") {
      rollbar.error("handleStripeWebhook/handleChargeDisputeCreated : " + error);
    }
    return; // Exit the function if accepting the dispute fails
  }
}

module.exports = {
  handleStripeWebhook,
};
