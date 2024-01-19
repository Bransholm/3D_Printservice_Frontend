import { endpoint } from "../../../../frontpage/frontpage-model/endpoint.js";

async function postCatelogueItem(data) {
  console.log("POSTING: ", data);
  try {
    const response = await fetch(`${endpoint}catalogue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(data),
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
  }
}

export { postCatelogueItem };
