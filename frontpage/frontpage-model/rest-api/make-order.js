import { endpoint } from "../endpoint.js";

async function postOrderCustomerIsExisting(existingCustomerData) {
  try {
    const response = await fetch(`${endpoint}makeOrderExistingCustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(existingCustomerData),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const result = await response.json();
      console.log(result);
    }

    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    throw error;
  }
}

// rest api - adds a new customer, order and orderlines to the database
async function postOrderCustomerIsNew(newCustomerData) {
  try {
    const response = await fetch(`${endpoint}makeOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomerData),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const result = await response.json();
      console.log(result);
    }

    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    throw error;
  }
}

export { postOrderCustomerIsExisting, postOrderCustomerIsNew };
