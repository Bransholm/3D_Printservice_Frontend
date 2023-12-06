"use strict";

import { startViews } from "./spa-router.js";
import { getCatalogueData, getStockData } from "./fetch-data.js";
import { catalogueData, stockData } from "./tempoary-data-doc.js";

// Modules for testing af klasse opbygning...
import { createCatalogClasses } from "./classes-test-doc.js";
import { launchAdminFunctions } from "./admin-functions-doc.js";

window.addEventListener("load", start);

function start() {
  startViews();
  activateEventListeners();
  console.log("Hello Team10");
  // Tester om man kan hente data - Lukas
  getAllData();
  launchAdminFunctions();
}

// Dette er en test funktion der skal se om vi kan hente data:
async function getAllData() {
  const CatalougeItems = await getCatalogueData();
  // const stockData = await getStockData();
  console.log(stockData);
  console.log(CatalougeItems);

  console.log(catalogueData);
  createCatalogClasses(CatalougeItems);
}

function activateEventListeners() {
  document.querySelector("#faq-link").addEventListener("click", showDialogFaq);
  document
    .querySelector("#handelsbetingelser-link")
    .addEventListener("click", showDialogHandelsbetingelser);
  document
    .querySelector("#datapolitik-link")
    .addEventListener("click", showDialogDatapolitik);
}

function showDialogFaq() {
  document.querySelector("#dialog-faq").showModal();
}

function showDialogHandelsbetingelser() {
  document.querySelector("#dialog-handelsbetingelser").showModal();
}

function showDialogDatapolitik() {
  document.querySelector("#dialog-datapolitik").showModal();
}
