import { viewButtonClicked } from "../../product-customization-site/product-customization.js";
// import {deleteButtonClicked, updateButtonClicked} from "./admin-main.js"

function callRenderMethod(listOfInstances, htmlId) {
  console.log("No3. CallRenderMethod");

  if (listOfInstances.length === 0) {
    document.querySelector(`#${htmlId}`).innerHTML =
      "Beklager, der er ikke et produkt der matcher din søgning";
  } else {
    document.querySelector(`#${htmlId}`).innerHTML = "";
    for (const instance of listOfInstances) {
      const classHTML = instance.render();

      document
        .querySelector(`#${htmlId}`)
        .insertAdjacentHTML("beforeend", classHTML);

      eventListenerAdder(htmlId, instance);
    }

    // for (const instance of listOfInstances) {
    //   const classHTML = instance.render();
  }

  function eventListenerAdder(htmlId, classInstance) {
    // what eventlisteners to add for a given instance needs to go here...

    document
      .querySelector(`#${htmlId} article:last-child .btn-view-product`)
      .addEventListener("click", () => viewButtonClicked(classInstance));
  }
}

export { callRenderMethod };
