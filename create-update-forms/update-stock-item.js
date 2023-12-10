function extractStockDataForUpdate(stockMaterial) {
  console.log(stockMaterial)
  const updateForm = document.querySelector("#updateMaterialForm");
  // const x = event.target

  // Doublecheck if attirbute needs to be with capital sarting letter...
  updateForm.name.value = stockMaterial.name;
  updateForm.material.value = stockMaterial.material;
  updateForm.colour.value = stockMaterial.colour;
  updateForm.gramInStock.value = stockMaterial.gramInStock;
  updateForm.salesPrice.value = stockMaterial.salesPrice;
  updateForm.minAmountReached.value = stockMaterial.minAmountReached;
}

/* ... */

function updateStockData(event) {
  event.preventDefault();
  const form = document.querySelector("#updateMaterialForm").element;

  const name = form.name.value;
  const material = form.material.value;
  const colour = form.colour.value;
  const gramInStock = form.gramInStock.value;
  const minAmountReached = form.minAmount.value;
  const salesPrize = form.price.value;

  return {
    name,
    material,
    colour,
    gramInStock,
    minAmountReached,
    salesPrize,
  };
}

export { extractStockDataForUpdate, updateStockData };
