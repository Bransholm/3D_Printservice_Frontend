// This function creates a new catalogue item - is only accessible for the admin.
function createNewCatalogueItem(event) {
  
  console.log("Item created");
  // Er det nu .target.value?
  const catalogueForm = event.target;
  
  const title = catalogueForm.title.value;
  const standardSize = catalogueForm.size.value;
  const standardWeight = catalogueForm.weight.value;
  const itemDescription = catalogueForm.description.value;
  const imageLink = catalogueForm.image.value;
  const category = catalogueForm.category.value;
 
  event.preventDefault();
  
  const catalogueItem = createCatelogueItemProduct(
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    category
  );
  event.preventDefault();
  console.log(catalogueItem);
}

function createCatelogueItemProduct(
  title,
  standardSize,
  standardWeight,
  itemDescription,
  imageLink,
  category
) {
  return {
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    category,
  };
}

export { createNewCatalogueItem };
