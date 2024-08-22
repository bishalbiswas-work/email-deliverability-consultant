const stripe = require("stripe")(
  "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"
);

const moment = require("moment");
const momentTimezone = require("moment-timezone");
const admin = require("../db/dbSetup");

const backgroundTask = require("./backgroundTask");

// async function getCustomersRegisteredLast30Days() {
//   const now = moment();
//   const thirtyDaysAgo = now.subtract(30, "days").unix();

//   try {
//     let customers = [];
//     let hasMore = true;
//     let startingAfter = null;

//     while (hasMore) {
//       const params = {
//         created: {
//           gte: thirtyDaysAgo,
//         },
//         limit: 100,
//       };
//       if (startingAfter) {
//         params.starting_after = startingAfter;
//       }

//       const response = await stripe.customers.list(params);

//       customers = customers.concat(response.data);
//       hasMore = response.has_more;
//       startingAfter =
//         response.data.length > 0
//           ? response.data[response.data.length - 1].id
//           : null;
//     }

//     return customers;
//   } catch (error) {
//     console.error("Error fetching customers:", error);
//     throw error;
//   }
// }

// async function getSubscriptions(customerId) {
//   try {
//     const subscriptions = await stripe.subscriptions.list({
//       customer: customerId,
//       status: "active",
//     });
//     return subscriptions.data;
//   } catch (error) {
//     console.error(
//       `Error fetching subscriptions for customer ${customerId}:`,
//       error
//     );
//     throw error;
//   }
// }

// async function categorizeCustomers(customers) {
//   const fiveDaysAgo = moment().subtract(5, "days").unix();

//   const nonPaidCustomers = [];
//   const nonPaidCustomersOlderThan5Days = [];
//   const paidCustomers = [];

//   for (const customer of customers) {
//     const subscriptions = await getSubscriptions(customer.id);
//     const hasPaidSubscription = subscriptions.some(
//       (subscription) => subscription.plan.amount > 0
//     );
//     const hasZeroDollarSubscription = subscriptions.some(
//       (subscription) => subscription.plan.amount === 0
//     );

//     const customerData = {
//       email: customer.email,
//       created: new Date(customer.created * 1000).toISOString(),
//     };

//     if (hasPaidSubscription) {
//       paidCustomers.push(customerData);
//     } else if (hasZeroDollarSubscription) {
//       nonPaidCustomers.push(customerData);

//       if (customer.created <= fiveDaysAgo) {
//         nonPaidCustomersOlderThan5Days.push(customerData);
//       }
//     }
//   }

//   return {
//     nonPaidCustomers,
//     nonPaidCustomersOlderThan5Days,
//     paidCustomers,
//   };
// }

// (async () => {
//   try {
//     const customers = await getCustomersRegisteredLast30Days();
//     const categorizedCustomers = await categorizeCustomers(customers);

//     console.log(
//       "Categorized Customers:",
//       JSON.stringify(categorizedCustomers, null, 2)
//     );
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();

async function getCustomersRegisteredLast30Days() {
  const now = moment();
  const thirtyDaysAgo = now.subtract(30, "days").unix();

  try {
    let customers = [];
    let hasMore = true;
    let startingAfter = null;

    while (hasMore) {
      const params = {
        created: {
          gte: thirtyDaysAgo,
        },
        limit: 100,
      };
      if (startingAfter) {
        params.starting_after = startingAfter;
      }

      const response = await stripe.customers.list(params);

      customers = customers.concat(response.data);
      hasMore = response.has_more;
      startingAfter =
        response.data.length > 0
          ? response.data[response.data.length - 1].id
          : null;
    }

    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
}

async function getSubscriptions(customerId) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });
    return subscriptions.data;
  } catch (error) {
    console.error(
      `Error fetching subscriptions for customer ${customerId}:`,
      error
    );
    throw error;
  }
}

async function categorizeCustomers(customers) {
  const fiveDaysAgo = moment().subtract(5, "days").unix();

  const nonPaidCustomers = [];
  const nonPaidCustomersOlderThan5Days = [];
  const paidCustomers = [];

  for (const customer of customers) {
    const subscriptions = await getSubscriptions(customer.id);
    const hasPaidSubscription = subscriptions.some(
      (subscription) => subscription.plan.amount > 0
    );
    const hasZeroDollarSubscription = subscriptions.some(
      (subscription) => subscription.plan.amount === 0
    );

    const customerData = {
      email: customer.email,
      created: new Date(customer.created * 1000).toISOString(),
    };

    if (hasPaidSubscription) {
      paidCustomers.push(customerData);
    } else if (hasZeroDollarSubscription) {
      nonPaidCustomers.push(customerData);

      if (customer.created <= fiveDaysAgo) {
        nonPaidCustomersOlderThan5Days.push(customerData);
      }
    }
  }

  return {
    nonPaidCustomers,
    nonPaidCustomersOlderThan5Days,
    paidCustomers,
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function autoChargeCustomer() {
  const currentTime = momentTimezone.tz("America/New_York");
  const currentHour = currentTime.hour();

  if (currentHour < 9 || currentHour >= 15) {
    // if (currentHour < 3 || currentHour >= 5) {
    console.log(
      "The current time is not between 3 AM and 5 AM EST. Exiting the function."
    );
    return;
  }

  try {
    const customers = await getCustomersRegisteredLast30Days();
    const categorizedCustomers = await categorizeCustomers(customers);

    console.log(
      "Categorized Customers:",
      JSON.stringify(categorizedCustomers, null, 2)
    );

    const { nonPaidCustomersOlderThan5Days } = categorizedCustomers;

    for (const customer of nonPaidCustomersOlderThan5Days) {
      console.log(
        `Processing email: ${customer.email}, Created: ${customer.created}`
      );

      // await backgroundTask.addNewSubscription_v2(customer.email,customer.email);
      await delay(10000); // Wait for 10 seconds before processing the next email
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// autoChargeCustomer();

// module.exports = { autoChargeCustomer };
// backgroundTask.addNewSubscription_v2
