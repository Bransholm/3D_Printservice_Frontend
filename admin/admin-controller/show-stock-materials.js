let stockClassList;
import { createCatalogClasses } from "./instance-creator-admin.js";
import { stockMaterial } from "../admin-view/admin-view-render-classes/stock-class.js";
import { updateStockButtonClicked } from "./admin-main.js";

// showing all materials
function showStockMaterials(stockMaterialData) {
  stockClassList = createCatalogClasses(stockMaterialData, stockMaterial);
  renderStocks(stockClassList, "adminStockTableBody");
}

// Create instances of the stock material class
function renderStocks(listOfInstances, htmlId) {
  console.log("No3. CallRenderMethod");
  document.querySelector(`#${htmlId}`).innerHTML = "";

  for (const stockInstance of listOfInstances) {
    const stockHTML = stockInstance.render();

    document
      .querySelector(`#${htmlId}`)
      .insertAdjacentHTML("beforeend", stockHTML);

    //Fit the eventlistener first
    eventListenerForStockUpdateButton(htmlId, stockInstance);
  }
}

// function triggered by the eventListener for stock update button.
function eventListenerForStockUpdateButton(htmlId, classInstance) {
  // what eventlisteners to add for a given instance needs to go here...

  document
    .querySelector(`#${htmlId} tr:last-child .btn_update_stock`)
    .addEventListener("click", () => updateStockButtonClicked(classInstance));
}

export { showStockMaterials };
