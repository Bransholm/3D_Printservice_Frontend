import { viewButtonClicked } from "./product-customization-site/product-customization.js";
// import {deleteButtonClicked, updateButtonClicked} from "./admin-main.js"
import {
  fetchSystemVariables,
  getAvailableStockData,
} from "../frontpage-model/fetch-data.js";

async function callRenderMethod(listOfInstances) {
  console.log("No3. CallRenderMethod");

  const systemVariables = await fetchSystemVariables();
  const itemTax = systemVariables[0].Tax;
  const itemBasePrice = systemVariables[0].PriceCalculationForm;
  console.log(systemVariables);

  const materials = await getAvailableStockData();
  const materialPrice = materials[0].SalesPrice;

  if (listOfInstances.length === 0) {
    document.querySelector(`#product_catalogue`).innerHTML =
      "Beklager, der er ikke et produkt der matcher din søgning";
  } else {
    document.querySelector(`#product_catalogue`).innerHTML = "";
    for (const instance of listOfInstances) {
      const classHTML = instance.render(itemTax, itemBasePrice, materialPrice);

      document
        .querySelector(`#product_catalogue`)
        .insertAdjacentHTML("beforeend", classHTML);

      eventListenerAdder(instance);
    }

    // for (const instance of listOfInstances) {
    //   const classHTML = instance.render();
  }

  function eventListenerAdder(classInstance) {
    // what eventlisteners to add for a given instance needs to go here...

    document
      .querySelector(`#product_catalogue article:last-child .btn-view-product`)
      .addEventListener("click", () => viewButtonClicked(classInstance));
  }
}

export { callRenderMethod };
