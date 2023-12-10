"use strict";

import { startViews } from "./spa-router.js";
import {
  getCatalogueData,
  getStockData,
  getAvailableStockData,
} from "./fetch-data.js";
import { catalogueItem } from "./view-render-classes/catalogue-class.js";

import { catalogueData, stockData } from "./tempoary-data-doc.js";

// Modules for testing af klasse opbygning...
// import { createCatalogClasses } from "./classes-test-doc.js";
import { createCatalogClasses } from "./instance-creator.js";
import { callRenderMethod } from "./render-controller.js";

window.addEventListener("load", start);

let filterValue = "Dyr";
let searchValue = "";

function start() {
  startViews();
  activateEventListeners();
  console.log("Hello Team10");
  // Tester om man kan hente data - Lukas
  getAllData();
}

// Dette er en test funktion der skal se om vi kan hente data:
async function getAllData() {
  const catalougeItemObjects = await getCatalogueData();
  // const x = await getStockData();

  // showSelectableMaterials(stockInStorage);

  showCatalougeToCustomers(catalougeItemObjects);
}

function showCatalougeToCustomers(catalougeItemObjects) {
  const classList = createCatalogClasses(catalougeItemObjects, catalogueItem);
  console.log("Der er et fetch")
  callRenderMethod(classList, "product_catalogue");
}

function activateEventListeners() {
  document.querySelector("#faq-link").addEventListener("click", showDialogFaq);
  document
    .querySelector("#tradeing-terms-link")
    .addEventListener("click", showDialogTradeingTerms);
  document
    .querySelector("#data-policy-link")
    .addEventListener("click", showDialogDataPolicyLink);
  document.querySelector("#filter-search").addEventListener("change", filterContent);
  // document.querySelector("#search-button").addEventListener("click", searchContent);
}

function showDialogFaq() {
  document.querySelector("#dialog-faq").showModal();
}

function showDialogTradeingTerms() {
  document.querySelector("#dialog-tradeing-terms").showModal();
}

function showDialogDataPolicyLink() {
  document.querySelector("#dialog-data-policy").showModal();
}


async function filterContent(event) {
  const value = event.target.value;
  if (value === "Bygninger") {
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "Bygninger";
    console.log(filterValue);
  } else if (value === "Dyr") {
    getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "Dyr";
    console.log(filterValue);
  } else if (value === "Eventyr") {
    getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "Eventyr";
    console.log(filterValue);
  } else if (value === "Sci-fi") {
    getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "Sci-fi";
    console.log(filterValue);
  }
}