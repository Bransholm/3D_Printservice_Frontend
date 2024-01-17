let stockClassList;
import { createCatalogClasses } from "./instance-creator-admin.js";
import { stockMaterial } from "../admin-view/admin-view-render-classes/stock-class.js";
import {updateStockButtonClicked} from "./admin-main.js"

// showing all materials
function showStockMaterials(stockMaterialData) {
  stockClassList = createCatalogClasses(stockMaterialData, stockMaterial);

  renderStocks(stockClassList);
}

// Create instances of the stock material class
function renderStocks(listOfInstances) {
  console.log("No3. CallRenderMethod");
  document.querySelector(`#adminStockTableBody`).innerHTML = "";

  for (const stockInstance of listOfInstances) {
    const stockHTML = stockInstance.render();

    document
      .querySelector(`#adminStockTableBody`)
      .insertAdjacentHTML("beforeend", stockHTML);

    //Fit the eventlistener first
    eventListenerForStockUpdateButton( stockInstance);
  }
}

// function triggered by the eventListener for stock update button.
function eventListenerForStockUpdateButton(classInstance) {
  // what eventlisteners to add for a given instance needs to go here...

  document
    .querySelector(`#adminStockTableBody tr:last-child .btn_update_stock`)
    .addEventListener("click", () => updateStockButtonClicked(classInstance));
}



export { showStockMaterials };
