// Skridt 1 indsæt den eksisterende data ind

function updateCatalogueDataAutofill(catalogueItem) {
  console.log(catalogueItem);
  const updateForm = document.querySelector("#updateCatalogueForm");
  // const x = event.target

  // Doublecheck if attirbute needs to be with capital sarting letter...
  updateForm.title.value = catalogueItem.title;
  updateForm.size.value = catalogueItem.standardSize;
  updateForm.weight.value = catalogueItem.standardWeight;
  updateForm.description.value = catalogueItem.itemDescription;
  updateForm.image.value = catalogueItem.imageLink;
  updateForm.category.value = catalogueItem.category;
  updateForm.active.value = catalogueItem.active
}

// Skridt 2 gør indholdet fra forms den opdaterede
function updateCatalogueInputData(event) {
  // event.preventDefault();
  const form = document.querySelector("#updateCatalogueForm");
  const title = form.title.value;
  const standardSize = Number(form.standardSize.value);
  const standardWeight = Number(form.standardWeight.value);
  const itemDescription = from.description.value;
  const imageLink = form.image.value;
  const category = form.category.value;
  const active = Number(form.active.value);

  
  return {
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    category,
    active
  };

}

export { updateCatalogueDataAutofill, updateCatalogueInputData };
