import { endpoint } from "../../../frontpage/frontpage-model/endpoint.js";

async function stockUpdateRoute(stockData, id) {
  // console.log("PUTTING: ", data);

  try {
    console.log("the data id: ", id);
    const response = await fetch(`${endpoint}stock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(stockData),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const result = await response.json();
      console.log("update successful! ", result);
    }

    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    throw error;
  }
}

export { stockUpdateRoute };
