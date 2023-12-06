// This function creates a new catalogue item - is only accessible for the admin.
function createNewCatalogue(event) {
  // Er det nu .target.value?
  const catalogueForm = event.target;

  const title = catalogueForm.title.value;
  const standardSize = catalogueForm.size.value;
  const standardWeight = catalogueForm.weight.value;
  const itemDescription = catalogueForm.description.value;
  const imageLink = catalogueForm.image.value;
  const catagory = catalogueForm.catergory.value;

  const catalogueItem = createCatalogueItemProduct(
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    catagory
  );

  console.log(catalogueItem);
}

function createCatalogueItemProduct(
  title,
  standardSize,
  standardWeight,
  itemDescription,
  imageLink,
  catagory
) {
  return {
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    catagory,
  };
}

const html =
  /*html*/
  `
<label for="catalogueTitle">Produktnavn</label>
                <input
                  type="text"
                  id="catalogueTitle"
                  name="title"
                  placeholder="Produktnavn"
                  required
                />

                // SKAL DET VÆRE EN DROPDOWN ELLER SKAL HAN HAVE LOV AT VÆLGE..?
<label for="stockCategory">Kategori</label>
                <select name="category" id="stockCategory">
                <option value= "buidlings" >Bygninger</option>
                <option value="animals">Dyr</option>
                <option value="fantasy">Fantasy</option>
                <option value="sciFi">Science-Fiction</option>


                // Kig på den der mulighed for at tilføje ting til sin liste? Men det resetter jo so why bother... 
                // Burde pris ikke være en attribut der er knyttet materiale ?

<label for="standardWeight">Standard Vægt</label>
                <input
                  type="text"
                  id="standardWeight"
                  name="weight"
                  placeholder="Angiv vægt i gram"
                  pattern="[0-9]{4}"
                  required
                />                
                
<label for="standardSize">Standard Højde</label>
                <input
                  type="text"
                  id="standardSize"
                  name="size"
                  placeholder="Angiv højde i centimeter"
                  pattern="[0-9]{4}"
                  required
                />

<label for="salesPrice">salgspris</label>
                <input
                  type="text"
                  id="salesPrice"
                  name="price"
                  placeholder="..."
                  pattern="[0-9]{4}"
                  required
                />

<label for="itemDescription">Produktbeskrivelse</label>
                <input
                  type="text"
                  id="itemDescription"
                  name="size"
                  placeholder="Indsæt en lille beskrivese"
                  pattern="[0-9]{4}"
                  required
                />                


<label for="imageLink">Billede-link</label>
                <input
                  type="text"
                  id="imageLink"
                  name="size"
                  placeholder="link"
                  required
                />                

`;
