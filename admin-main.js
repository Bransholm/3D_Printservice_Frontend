import {
  extractStockDataForUpdate,
  updateStockData,
} from "./create-update-forms.js";

import { createNewMaterial } from "./create-new-stock-item.js";
import { createNewCatelogueItem } from "./create-new-catalogue-item.js";

function launchAdminFunctions() {
  console.log("Admin site is working");
  activateEventListeners();
}

function activateEventListeners() {
  
  //document.querySelector("#addNewMaterialForm").addEventListener("submit", () => createNewMaterial(event));
 document.querySelector("#addToCatalogueForm").addEventListener("submit", createNewCatelogueItem);
  }


  


export { launchAdminFunctions };
