import {
  extractStockDataForUpdate,
  updateStockData,
} from "./create-update-forms.js";

import { createNewMaterial } from "./create-new-stock-item.js";
import { createNewCatalogueItem } from "./create-new-catalogue-item.js";

function launchAdminFunctions() {
  console.log("Admin site is working");
  activateEventListeners();
}

function activateEventListeners() {
  document.querySelector("#test_submit_button").addEventListener("click", test);
}



function test(event) {
  event.preventDefault();
  const form = document.querySelector("#test_form");

  const testValue = form.someText.value;

  console.log(testValue);
}




export { launchAdminFunctions };
