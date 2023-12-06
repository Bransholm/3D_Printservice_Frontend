// This function creates a new catalogue item - is only accessible for the admin.
function createNewMaterial(event) {
  event.preventDefault();
  // Er det nu .target.value?
  const stockForm = event.target;

  const name = stockForm.name.value;
  const material = stockForm.material.value;
  const colour = stockForm.colour.value;
  const gramInStock = stockForm.inStock.value;
  const minAmountReached = stockForm.minAmount.value;
  const salesPrize = stockForm.price.value;

  const object =  {
    name,
    material,
    colour,
    gramInStock,
    minAmountReached,
    salesPrize,
  };

  

}

export { createNewMaterial };
