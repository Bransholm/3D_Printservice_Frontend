import { endpoint } from "../endpoint.js";

async function putExistingCustomer(data) {
  try {
    const response = await fetch(
      `${endpoint}customers/${data.CustomerInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.CustomerInfo),
      }
    );

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

export { putExistingCustomer };
