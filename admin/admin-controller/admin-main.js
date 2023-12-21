"use strict";
window.addEventListener("load", startAdmin);

// stores the item to be updated!
let stockItemToUpdate;
let catalogueId;
const endpoint = "https://3dprintservice.azurewebsites.net/";

// Imports the update route for strockMaterials
import { stockUpdateRoute } from "../admin-model/backend-routes/stock-put.js";
import { createNewCatalogueItem } from "./create-update-forms/create-new-catelogue-item.js";
import { getCatalogueData, getStockData } from "../admin-model/fetch-data-admin.js";
import { stockMaterial } from "../admin-view/admin-view-render-classes/stock-class.js";
import { catalogueItem } from "../admin-view/admin-view-render-classes/catalogue-class.js";
import { createCatalogClasses } from "./instance-creator-admin.js";
import { callRenderMethodeForCatalogueItems } from "./render-controller-admin.js";
// update-button clicked: Send data to stock-update-form
import {
  extractStockDataForUpdate,
  updateStockDataThroughForm,
} from "./create-update-forms/update-stock-item.js";

function startAdmin() {
  console.log("Admin site is working");
  document
    .querySelector("#addToCatalogueForm")
    .addEventListener("submit", createNewCatalogueItem);
  getDataController();

  // submit update...
  document
    .querySelector("#updateMaterialForm")
    .addEventListener("submit", submitStockUpdate);
}

// fetching genereal data
async function getDataController() {
  const stockMaterialData = await getStockData();
  console.log("material list: ", stockMaterialData);

  const catalougeItemObjects = await getCatalogueData();
  showCatalouge(catalougeItemObjects);
  showStockMaterials(stockMaterialData);
}

// showing the catalogue to the admin site
function showCatalouge(catalougeItemObjects) {
  const catalougueClassList = createCatalogClasses(
    catalougeItemObjects,
    catalogueItem
  );
  console.log("Der er et fetch");
  callRenderMethodeForCatalogueItems(catalougueClassList, "productOverview");
}

// showing all materials
function showStockMaterials(stockMaterialData) {
  const stockClassList = createCatalogClasses(stockMaterialData, stockMaterial);
  //4callRenderMethod(stockClassList, "stockMaterialOveriew");
  renderStocks(stockClassList, "adminStockTableBody");
}

// Create instances of the stock material class
function renderStocks(listOfInstances, htmlId) {
  console.log("No3. CallRenderMethod");
  document.querySelector(`#${htmlId}`).innerHTML = "";

  for (const stockInstance of listOfInstances) {
    const stockHTML = stockInstance.render();

    document
      .querySelector(`#${htmlId}`)
      .insertAdjacentHTML("beforeend", stockHTML);

    //Fit the eventlistener first!
    eventListenerForStockUpdateButton(htmlId, stockInstance);
  }
}


// function triggered by the eventListener for stock update button.
function eventListenerForStockUpdateButton(htmlId, classInstance) {
  // what eventlisteners to add for a given instance needs to go here...

  document
    .querySelector(`#${htmlId} tr:last-child .btn_update_stock`)
    .addEventListener("click", () => updateStockButtonClicked(classInstance));
  stockItemToUpdate = classInstance;
}

// The function that update the selected stock material while pussing the update button
function updateStockButtonClicked(instance) {
  console.log("Update your materials! ", instance);
  extractStockDataForUpdate(instance);
}


// update the selected stock! 
function submitStockUpdate(event) {
  event.preventDefault();
  console.log("update data:  ", stockItemToUpdate);
  const data = updateStockDataThroughForm(stockItemToUpdate);
  console.log("the update: ", data);
  stockUpdateRoute(data);
}

// the function that is triggered after clicking the delete button on a catalogue item
export function deleteCatalogueItemButtonClicked(instance) {
  console.log("Delete Item Clicked:", instance.id);
  catalogueId = instance.id;
}

// the function that is triggered after clicking the update button on a catalogue item
export function updateCatalogueItemButtonClicked(instance) {
  console.log("Update Item Clicked:", instance.id);
  catalogueId = instance.id;
}

// export { startAdmin as launchAdminFunctions };
