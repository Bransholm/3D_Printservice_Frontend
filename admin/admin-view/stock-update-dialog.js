function showSuccessfullUpdate(stockItem) {
  document.querySelector("#successfull-stock-update-div").innerHTML = " ";

  const dialogHTML =
    /*html*/
    `
  <div>
  <p>Materiale sat til: ${stockItem.material}</p>
  <p>Beskrivelse sat til: ${stockItem.name}</p>
  <p>Farve sat til: ${stockItem.colour}</p>
  <p>Lager beholdning sat til ${stockItem.gramInStock} gram</p>
  <p>Salgs status sat til: ${showStockActiveStatus(stockItem.active)}</p>
  <p>Salgspris sat til: ${stockItem.salesPrice} </p>
  </div>
  `;

  document
    .querySelector("#successfull-stock-update-div")
    .insertAdjacentHTML("beforeend", dialogHTML);

  document.querySelector("#successfull-stock-update-dialog").showModal();
}

function showStockActiveStatus(status) {
  if (status == 1) {
    return "På lager";
  } else if (status == 0){
    return "Udsolgt";
  }
}

function closeUpdateCompleteWindow() {
  document.querySelector("#successfull-stock-update-dialog").close();
}

export { showSuccessfullUpdate, closeUpdateCompleteWindow };
