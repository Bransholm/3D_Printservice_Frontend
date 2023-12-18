const endpoint = "https://3dprintservice.azurewebsites.net/";

async function stockUpdateRoute(data) {
  // console.log("PUTTING: ", data);
  try {
    const response = await fetch(`${endpoint}stock/${data.id}`, {
      method: "PUT",
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
      console.log("update successful! ", result);
    }

    return;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
}

export { stockUpdateRoute };
