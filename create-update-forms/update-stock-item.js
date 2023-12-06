function extractStockDataForUpdate(catalogueItem) {
  const updateForm = document.querySelector("#updateMaterialForm");
  // const x = event.target

  // Doublecheck if attirbute needs to be with capital sarting letter...
  updateForm.name.value = catalogueItem.name;
  updateForm.material.value = catalogueItem.material;
  updateForm.colour.value = catalogueItem.colour;
  updateForm.minAmountReached.value = catalogueItem.inStock;
  updateForm.salesPrize.value = catalogueItem.minAmount;

}


function updateStockData(event) {
  event.preventDefault();
  const form = document.querySelector("#updateMaterialForm").element;

  const name = form.name.value;
  const standardSize = form.material.value;
  const standardWeight = form.inStock.value;
  const minAmountReached = form.minAmount.value;
  const salesPrize = form.price.value;

  return {
    name,
    standardSize,
    standardWeight,
    minAmountReached,
    salesPrize,
  };
}

export { extractStockDataForUpdate, updateStockData };
