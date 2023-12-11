
function callRenderMethodAdmin(listOfInstances, htmlId) {
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
			.addEventListener("click", () => updateButtonClicked(classInstance));

		document
			.querySelector(`#${htmlId} article:last-child .btn_delete_product`)
			.addEventListener("click", () => deleteButtonClicked(classInstance));
	}

	function deleteButtonClicked(instance) {
		console.log("Delete Item Clicked:", instance.id);
		
	}
	function updateButtonClicked(instance) {
		console.log("Update Item Clicked:", instance.id);
		
	}
}

// function deleteButtonClicked(instance) {
// 	console.log("Delete Item Clicked:", instance.id);
// 	catalogueId = instance.id;
// }
// function updateButtonClicked(instance) {
// 	console.log("Update Item Clicked:", instance.id);
// 	catalogueId = instance.id;
// }


export { callRenderMethodAdmin };