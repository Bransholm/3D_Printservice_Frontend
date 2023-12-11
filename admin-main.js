"use strict";
window.addEventListener("load", startAdmin);

// stores the item to be updated!
let stockItemToUpdate;
const endpoint = "https://3dprintservice.azurewebsites.net/";

// import {
//   extractStockDataForUpdate,
//   updateStockData,
// } from "./create-update-forms.js";

// import { createNewMaterial } from "./create-new-stock-item.js";
import { createNewCatalogueItem } from "../create-update-forms/create-new-catelogue-item.js";
import { getCatalogueData, getStockData } from "./fetch-data.js";
// import { createCatalogClasses } from "../classes-test-doc.js";
import { stockMaterial } from "./view-render-classes/stock-class.js";
import { catalogueItem } from "./view-render-classes/catalogue-class.js";

import { createCatalogClasses } from "../instance-creator.js";
// import { callRenderMethod as stockXYZ } from "../render-controller.js";

// update-button clicked: Send data to stock-update-form
import {
  extractStockDataForUpdate,
  updateStockDataThroughForm,
} from "./create-update-forms/update-stock-item.js";

function startAdmin() {
  console.log("Admin site is working");
  activateEventListeners();
  getAllData();

  // submit update...
  document
    .querySelector("#updateMaterialForm")
    .addEventListener("submit", submitStockUpdate);
}

async function getAllData() {
  const stockMaterialData = await getStockData();
  console.log("material list: ", stockMaterialData);

  const catalougeItemObjects = await getCatalogueData();
  // showCatalougeToAdmin(catalougeItemObjects);
  showAllStockMaterials(stockMaterialData);
}

function showAllStockMaterials(stockMaterialData) {
  const stockClassList = createCatalogClasses(stockMaterialData, stockMaterial);
  //4callRenderMethod(stockClassList, "stockMaterialOveriew");
  renderAllStocks(stockClassList, "adminStockTableBody");
}

function renderAllStocks(listOfInstances, htmlId) {
  console.log("No3. CallRenderMethod");
  document.querySelector(`#${htmlId}`).innerHTML = "";

  for (const stockInstance of listOfInstances) {
    const stockHTML = stockInstance.render();

    document
      .querySelector(`#${htmlId}`)
      .insertAdjacentHTML("beforeend", stockHTML);

    //Fit the eventlistener first!
    eventListenerAdder(htmlId, stockInstance);
  }
}

function eventListenerAdder(htmlId, classInstance) {
  // what eventlisteners to add for a given instance needs to go here...

  document
    .querySelector(`#${htmlId} tr:last-child .btn_update_stock`)
    .addEventListener("click", () => updateStockButtonClicked(classInstance));
  stockItemToUpdate = classInstance;
}

function updateStockButtonClicked(instance) {
  console.log("Update your materials! ", instance);
  extractStockDataForUpdate(instance);
}

function submitStockUpdate(event) {
  event.preventDefault();
  console.log("update data:  ", stockItemToUpdate)
  const data = updateStockDataThroughForm(stockItemToUpdate);
  console.log("the update: ", data)
  stockUpdateRoute(data);
}

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

// async function postCatelogueItem(data) {
//   console.log("POSTING: ", data);
//   try {
//     const response = await fetch(`${endpoint}catalogue`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Add any additional headers if needed
//       },
//       body: JSON.stringify(data),
//     });

//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     } else {
//       const result = await response.json();
//       console.log(result);
//     }

//     return;
//   } catch (error) {
//     // Handle errors here
//     console.error("Error:", error);
//   }
// }

function showCatalougeToAdmin(catalougeItemObjects) {
  const catalogueClassList = createCatalogClasses(
    catalougeItemObjects,
    catalogueItem
  );
  // callRenderMethod(classList, "productOverview");
}

// async function readAllCatalogueItems() {
//   const catelogueData = await getCatalogueData();
//   // createCatalogClasses(catelogueData);
//   }

function activateEventListeners() {
  document
    .querySelector("#addToCatalogueForm")
    .addEventListener("submit", createNewCatalogueItem);
}

// export { startAdmin as launchAdminFunctions };
