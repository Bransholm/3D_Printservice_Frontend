import { deleteCatalogueItem } from "../admin-model/backend-routes/catalouge-routes/catalogue-delete.js";
import { getCatalogueItemsData } from "./admin-main.js";
import { updateCatalogueDataAutofill } from "./create-update-forms/update-catalogue-item.js";

// Calling render methode for catalogue items
function callRenderMethodeForCatalogueItems(listOfInstances, htmlId) {
  console.log("AdminNo1. CallRenderMethodAdmin");
  document.querySelector(`#${htmlId}`).innerHTML = "";

  for (const instance of listOfInstances) {
    const classHTML = instance.adminRender();

    document
      .querySelector(`#${htmlId}`)
      .insertAdjacentHTML("beforeend", classHTML);

    eventListenerForCatalogueItemsButtons(htmlId, instance);
  }

  // add eventlistens for every catalogue items
  function eventListenerForCatalogueItemsButtons(htmlId, classInstance) {
    document
      .querySelector(`#${htmlId} article:last-child .btn_update_product`)
      .addEventListener("click", () =>
        updateCatalogueItemButtonClicked(classInstance)
      );

    document
      .querySelector(`#${htmlId} article:last-child .btn_delete_product`)
      .addEventListener("click", () =>
        deleteCatalogueItemButtonClicked(classInstance)
      );
  }

  // delete the selected catalogue item
  function deleteCatalogueItemButtonClicked(instance) {
    console.log("Delete Item Clicked:", instance.id);
    document.querySelector("#dialog-delete-catalouge-item").showModal();
    document
      .querySelector("#btn-delete-catalouge-item-confirm")
      .addEventListener("click", () =>
        deleteCatalougeItemAccepted(instance.id)
      );
  }

  function deleteCatalougeItemAccepted(id) {
    console.log(id);
    closeConfirmDeleteCatalogueItemDialog();
    deleteCatalogueItemConfirmed(id);
  }

  function closeConfirmDeleteCatalogueItemDialog() {
    document.querySelector("#dialog-delete-catalouge-item").close();
  }

  // update the selected catalogue item
  function updateCatalogueItemButtonClicked(instance) {
    console.log("Update Item Clicked:", instance.id);
    //... Her skal min auto-fill være for update-formen
    updateCatalogueDataAutofill(instance);
  }
}

async function deleteCatalogueItemConfirmed(id) {
  await deleteCatalogueItem(id);
  getCatalogueItemsData();
}

export { callRenderMethodeForCatalogueItems };
