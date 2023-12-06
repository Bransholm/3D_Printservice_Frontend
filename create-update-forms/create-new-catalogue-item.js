// This function creates a new catalogue item - is only accessible for the admin.
function createNewCatalogueItem(event) {
  
  console.log("Item created");
  // Er det nu .target.value?
  const catelogueForm = event.target;
  
  const title = catelogueForm.title.value;
  const standardSize = catelogueForm.size.value;
  const standardWeight = catelogueForm.weight.value;
  const itemDescription = catelogueForm.description.value;
  const imageLink = catelogueForm.image.value;
  const category = catelogueForm.category.value;
 
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
