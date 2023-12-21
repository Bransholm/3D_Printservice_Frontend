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
  }

  // update the selected catalogue item
  function updateCatalogueItemButtonClicked(instance) {
    console.log("Update Item Clicked:", instance.id);
  }
}

export { callRenderMethodeForCatalogueItems };