import { viewButtonClicked } from "./classes-test-doc.js";

let runte = 0;

export function callRenderMethod(listOfInstances, htmlId) {
  console.log("No3. CallRenderMethod");
  document.querySelector(`#${htmlId}`).innerHTML = "";

  for (const instance of listOfInstances) {
    const classHTML = instance.render();

    runte += 1;
    console.log("Elementer vist: ", runte);

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
