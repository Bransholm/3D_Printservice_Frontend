"use strict";
window.addEventListener("load", startAdmin);

// import {
//   extractStockDataForUpdate,
//   updateStockData,
// } from "./create-update-forms.js";

// import { createNewMaterial } from "./create-new-stock-item.js";
import { createNewCatalogueItem } from "../create-update-forms/create-new-catelogue-item.js";
import { getCatalogueData, getStockData } from "./fetch-data.js";
import { createCatalogClasses } from "./classes-test-doc.js";
import { stockMaterial } from "./view-render-classes/stock-class.js";

function startAdmin() {
  console.log("Admin site is working");
  activateEventListeners();
  getAllData();
}

async function getAllData() {
  const Materials = await getStockData();
  console.log("material list: ", Materials);
  const CatalougeItems = await getCatalogueData();
  createCatalogClasses(CatalougeItems);
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

export { startAdmin as launchAdminFunctions };
