import { viewButtonClicked } from "./classes-test-doc.js";
import {deleteButtonClicked, updateButtonClicked} from "./admin-main.js"


export function callRenderMethod(listOfInstances, htmlId) {
  console.log("No3. CallRenderMethod");
  document.querySelector(`#${htmlId}`).innerHTML = "";

  for (const instance of listOfInstances) {
    const classHTML = instance.render();



    document
      .querySelector(`#${htmlId}`)
      .insertAdjacentHTML("beforeend", classHTML);

    eventListenerAdder(htmlId, instance);
  }

  function eventListenerAdder(htmlId, classInstance) {
    // what eventlisteners to add for a given instance needs to go here...

    document
      .querySelector(`#${htmlId} article:last-child .btn-view-product`)
      .addEventListener("click", () => viewButtonClicked(classInstance));
  }
}

export function callRenderMethodAdmin(listOfInstances, htmlId) {
	console.log("AdminNo1. CallRenderMethodAdmin");
	document.querySelector(`#${htmlId}`).innerHTML = "";

	for (const instance of listOfInstances) {
		const classHTML = instance.adminRender();

		document
			.querySelector(`#${htmlId}`)
			.insertAdjacentHTML("beforeend", classHTML);

		eventListenerAdderAdmin(htmlId, instance);
	}

	function eventListenerAdderAdmin(htmlId, classInstance) {
		// what eventlisteners to add for a given instance needs to go here...

		document
			.querySelector(`#${htmlId} article:last-child .btn_update_product`)
			.addEventListener("click", () =>
				updateButtonClicked(classInstance)
			);

    document
			.querySelector(`#${htmlId} article:last-child .btn_delete_product`)
			.addEventListener("click", () => deleteButtonClicked(classInstance));
	}
}
