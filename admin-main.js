"use strict";
window.addEventListener("load", startAdmin);

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
import { callRenderMethod } from "../render-controller.js";


function startAdmin() {
  console.log("Admin site is working");
  activateEventListeners();
  getAllData();
}

async function getAllData() {
  const stockMaterialData = await getStockData();
  console.log("material list: ", stockMaterialData);
  
  const catalougeItemObjects = await getCatalogueData();
  showCatalougeToAdmin(catalougeItemObjects);
  showAllStockMaterials(stockMaterialData);
}


function showAllStockMaterials(stockMaterialData) {
  const stockClassList = createCatalogClasses(stockMaterialData, stockMaterial);
    callRenderMethod(stockClassList, "stockMaterialOveriew");

}

function showCatalougeToAdmin(catalougeItemObjects) {
  const classList = createCatalogClasses(catalougeItemObjects, catalogueItem);
  callRenderMethod(classList, "productOverview");
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
