"use strict";
window.addEventListener("load", startAdmin);

let catalogueId;
const endpoint = "https://3dprintservice.azurewebsites.net/";

import { startViews } from "../admin-view/spa-router.js";

// Imports the update route for strockMaterials
import { createNewCatalogueItem } from "./create-update-forms/create-new-catelogue-item.js";
import {
  getCatalogueData,
  getStockData,
} from "../admin-model/fetch-data-admin.js";
import { catalogueItem } from "../admin-view/admin-view-render-classes/catalogue-class.js";
import { createCatalogClasses } from "./instance-creator-admin.js";
import { callRenderMethodeForCatalogueItems } from "./render-controller-admin.js";

// update-button clicked: Send data to stock-update-form

import { showStockMaterials } from "./show-stock-materials.js";
import {
  updateStockButtonClicked,
  submitStockUpdate,
} from "./update-stock-materials.js";

import { closeUpdateCompleteWindow } from "../admin-view/stock-update-dialog.js";

function startAdmin() {
  console.log("Admin site is live");
  startViews();
  startEvendListernes();
  getDataController();
}

function startEvendListernes() {
  document
    .querySelector("#addToCatalogueForm")
    .addEventListener("submit", createNewCatalogueItem);

  // submit update...
  document
    .querySelector("#updateMaterialForm")
    .addEventListener("submit", submitStockUpdate);

  document
    .querySelector("#btn-close-update-dialog")
    .addEventListener("click", closeUpdateCompleteWindow);
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

export { updateStockButtonClicked, getDataController };
// export { startAdmin as launchAdminFunctions };
