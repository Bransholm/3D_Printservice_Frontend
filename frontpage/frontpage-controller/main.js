"use strict";

import { startViews } from "../frontpage-view/spa-router.js";
import {
  getCatalogueData,
  getStockData,
  getAvailableStockData,
} from "../frontpage-model/fetch-data.js";
import { catalogueItem } from "../frontpage-view/view-render-classes/catalogue-class.js";

// import { catalogueData, stockData } from "../../tempoary-data-doc.js";

// Modules for testing af klasse opbygning...
// import { createCatalogClasses } from "./classes-test-doc.js";
import { createCatalogClasses } from "./instance-creator.js";
import { callRenderMethod } from "./render-controller.js";

import { filterContent, searchContent } from "./catalogue-filter-search.js";

// test-function that runs the post-order-API
import { testMakeOrder } from "../frontpage-model/rest-api/make-order.js";
// test-function that creates a new order!
import { testOrderSite } from "./order-site.js";

window.addEventListener("load", start);

function start() {
  startViews();
  activateCustomerEventListeners();
  console.log("Hello Team10");
  // Tester om man kan hente data - Lukas
  getAllData();
  // testMakeOrder();
  testStartNewOrder();
}

function testStartNewOrder() {
  document
    .querySelector("#btn_place_order")
    .addEventListener("click", testOrderSite);
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

  console.log("Der er et fetch");
  callRenderMethod(classList, "product_catalogue");
}

function activateCustomerEventListeners() {
  document.querySelector("#faq-link").addEventListener("click", showDialogFaq);
  document
    .querySelector("#tradeing-terms-link")
    .addEventListener("click", showDialogTradeingTerms);
  document
    .querySelector("#data-policy-link")
    .addEventListener("click", showDialogDataPolicyLink);
  document
    .querySelector("#filter-catagory")
    .addEventListener("change", filterContent);
  document
    .querySelector("#search-button")
    .addEventListener("click", searchContent);
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

export { showCatalougeToCustomers };
