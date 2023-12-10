function extractStockDataForUpdate(stockMaterial) {
  console.log(stockMaterial);
  const updateForm = document.querySelector("#updateMaterialForm");
  // const x = event.target

  // Doublecheck if attirbute needs to be with capital sarting letter...
  updateForm.name.value = stockMaterial.name;
  updateForm.material.value = stockMaterial.material;
  updateForm.colour.value = stockMaterial.colour;
  updateForm.gramInStock.value = stockMaterial.gramInStock;
  updateForm.minAmountReached.value = stockMaterial.minAmountReached;
  updateForm.salesPrice.value = stockMaterial.salesPrice;
}

/* ... */

function updateStockDataThroughForm() {
  const form = document.querySelector("#updateMaterialForm");

  const name = form.name.value;
  const material = form.material.value;
  const colour = form.colour.value;
  const gramInStock = form.gramInStock.value;
  const minAmountReached = form.minAmountReached.value;
  const salesPrice = form.salesPrice.value;

  return {
    name,
    material,
    colour,
    gramInStock,
    minAmountReached,
    salesPrice,
  };
}

export { extractStockDataForUpdate, updateStockDataThroughForm };
