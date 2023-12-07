"use strict";
window.addEventListener("load", startAdmin);

// import {
//   extractStockDataForUpdate,
//   updateStockData,
// } from "./create-update-forms.js";

// import { createNewMaterial } from "./create-new-stock-item.js";
import { createNewCatalogueItem } from "./create-update-forms/create-new-catelogue-item.js";


function startAdmin() {
  console.log("Admin site is working");
  activateEventListeners();
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
