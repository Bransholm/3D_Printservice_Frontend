"use strict";
window.addEventListener("load", startAdmin);

// import {
//   extractStockDataForUpdate,
//   updateStockData,
// } from "./create-update-forms.js";

// import { createNewMaterial } from "./create-new-stock-item.js";
import { createNewCatalogueItem } from "../create-update-forms/create-new-catelogue-item.js";
import { getCatalogueData } from "./fetch-data.js";
import { createCatalogClasses } from "./classes-test-doc.js";



function startAdmin() {
  console.log("Admin site is working");
  activateEventListeners();
  readAllCatalogueItems();
}

async function readAllCatalogueItems() {
  const catelogueData = await getCatalogueData();
  // createCatalogClasses(catelogueData);

  }

function activateEventListeners() {
  document
    .querySelector("#addToCatalogueForm")
    .addEventListener("submit", createNewCatalogueItem);
  document.querySelector("#test_form").addEventListener("submit", test);
}

function test(event) {
  console.log(event);
  event.preventDefault();

  const testValue = event.target.someText.value;

  console.log(testValue);
}

export { startAdmin as launchAdminFunctions };
