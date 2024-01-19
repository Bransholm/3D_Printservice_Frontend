"use strict";
window.addEventListener("load", startAdmin);

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
import { submitFianceDates } from "./finance-site.js";
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

  // getDataController();
  getStockMaterialData();
  getCatalogueItemsData();
}

async function getCatalogueItemsData() {
  const catalougeItemObjects = await getCatalogueData();
  showCatalouge(catalougeItemObjects);
}

async function getStockMaterialData() {
  const stockMaterialData = await getStockData();
  showStockMaterials(stockMaterialData);
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

  document
    .querySelector("#finance-form")
    .addEventListener("submit", submitFianceDates);
}

// fetching genereal data
// async function getDataController() {
//   const stockMaterialData = await getStockData();
//   console.log("material list: ", stockMaterialData);

//   const catalougeItemObjects = await getCatalogueData();
//   showCatalouge(catalougeItemObjects);
//   showStockMaterials(stockMaterialData);
// }

// showing the catalogue to the admin site
function showCatalouge(catalougeItemObjects) {
  const catalougueClassList = createCatalogClasses(
    catalougeItemObjects,
    catalogueItem
  );
  console.log("Der er et fetch");
  callRenderMethodeForCatalogueItems(catalougueClassList, "productOverview");
}

export {
  updateStockButtonClicked,
  getStockMaterialData,
  getCatalogueItemsData,
};
// export { startAdmin as launchAdminFunctions };
