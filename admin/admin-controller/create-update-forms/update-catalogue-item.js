// Skridt 1 indsæt den eksisterende data ind

function extractCatalogueDataForUpdate(catalogueItem) {
  const updateForm = document.querySelector("#INSERT-ID");
  // const x = event.target

  // Doublecheck if attirbute needs to be with capital sarting letter...
  updateForm.title.value = catalogueItem.title;
  updateForm.size.value = catalogueItem.standardSize;
  updateForm.weight.value = catalogueItem.standardWeight;
  updateForm.description.value = catalogueItem.itemDescription;
  updateForm.image.value = catalogueItem.imageLink;
  updateForm.category.value = catalogueItem.category;
}

// Skridt 2 gør indholdet fra forms den opdaterede
function updateCatalogueData(event) {
  event.preventDefault();
  const form = document.querySelector("#INSERT-ID").element;

  const title = form.title.value;
  const standardSize = form.standardSize.value;
  const standardWeight = form.standardWeight.value;
  const itemDescription = from.description.value;
  const imageLink = form.image.value;
  const category = form.category.value;

  const updatedCatalogObject = createUpdatedCatalogObject(
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    category
  );
}

function createUpdatedCatalogObject(
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
