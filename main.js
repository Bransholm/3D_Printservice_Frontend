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
  const stockInStorage = await getAvailableStockData();
  console.log(stockInStorage);
  showSelectableMaterials(stockInStorage);

  showCatalougeToCustomers(catalougeItemObjects);
}

function showSelectableMaterials(stockInStorage) {
  // Alle farver skal skjules...
  
  const allColours = [
    "rød",
    "grøn",
    "blå",
    "violet",
    "gul",
    "orange",
    "sort",
    "hvid",
  ];
  const stockType = ["blød", "elastisk", "hård"];

  for (const stock of stockInStorage) {
    console.log(stock.Name.toLowerCase(), "_", stock.Colour.toLowerCase());
    const stockName = stock.Name.toLowerCase();
    const stockColour = stock.Colour.toLowerCase();
    for (const colour of allColours){
      if (colour === stockColour) {
        //fjern den class der skjuler alt
      }
  }
}


}



function showCatalougeToCustomers(catalougeItemObjects) {
  const classList = createCatalogClasses(catalougeItemObjects, catalogueItem);
  callRenderMethod(classList, "product_catalog");
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
  document.querySelector("#dialog-tradeing-terms").showModal();
}

function showDialogDatapolitik() {
  document.querySelector("#dialog-data-policy").showModal();
}
