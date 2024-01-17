function updateStockDataAtofill(stockMaterial) {
  console.log(stockMaterial);
  const updateForm = document.querySelector("#updateMaterialForm");
  // const x = event.target



  // ---------------------------------------------- DEV NOTE: We changed minAmountReached = "1" to active = 1 ;
  // Change it i  HTML and all JS... otherwise it will never work...

  // Doublecheck if attirbute needs to be with capital sarting letter...
  updateForm.name.value = stockMaterial.name;
  updateForm.material.value = stockMaterial.material;
  updateForm.colour.value = stockMaterial.colour;
  updateForm.gramInStock.value = stockMaterial.gramInStock;
  updateForm.active.value = stockMaterial.active;
  updateForm.salesPrice.value = stockMaterial.salesPrice;
}

/* ... */

function stockUpdateInputData() {
  const form = document.querySelector("#updateMaterialForm");
  const name = form.name.value;
  const material = form.material.value;
  const colour = form.colour.value;
  const gramInStock = Number(form.gramInStock.value);
  const active = form.active.value;
  const salesPrice = Number(form.salesPrice.value);

  return {
    name,
    material,
    colour,
    gramInStock,
    active,
    salesPrice
  };
}

export { updateStockDataAtofill, stockUpdateInputData};
