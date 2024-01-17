import { endpoint } from "../../../../frontpage/frontpage-model/endpoint.js";

async function deleteCatalogueItem(id) {
  try {
    const response = await fetch(`${endpoint}/catalogue/${id}`, {
      method: "DELETE",
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const result = await response.json();
      console.log(result);
    }

    return;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
}

export { deleteCatalogueItem };
