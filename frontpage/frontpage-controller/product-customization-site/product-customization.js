// Imports only the stockMaterials that is not sold out
import { getAvailableStockData } from "../../frontpage-model/fetch-data.js";
import { addProductToBasket } from "./shopping-cart.js";

import { product } from "./product-customization-calss.js";

// all the materials that are set as active
let stockInStorage;

// the pro
let customizedProduct;
let selectedCatalougeItem;

// CREATE TABLE Order_Lines
// (
//     Id           INT AUTO_INCREMENT PRIMARY KEY,
//     Orders_ID    INT,
//     FOREIGN KEY (Orders_ID) REFERENCES Orders (Id),
//     Catalogue_ID INT,
//     FOREIGN KEY (Catalogue_ID) REFERENCES Catalogue (Id),
//     Amount       INTEGER(10),
//     ProductSize  INTEGER(10),
//     ItemPrice    DECIMAL(5,2),
//     ItemTax      DECIMAL(5,2),
//     Stock_ID     INT,
//     FOREIGN KEY (Stock_ID) REFERENCES Stock (Id)
// );

// Is this unnecessarily complex as per usual?!

// price = bundleprice;
// singleProductPrice;

export async function viewButtonClicked(catalougeItem) {
  selectedCatalougeItem = catalougeItem;
  // Sets the id for the chosen catalogue item
  // const catalogueId = instance.id;

  clearProductCustomizationSite();

  // ------------------- DEV NOTE: skal vi fetche hver gang man trykker på knappen? Ja? ---------------------
  // Fetches all the stock materials that are not sold out
  stockInStorage = await getAvailableStockData();
  // console.log("The available stock", stockInStorage);

  // creates an instance of the product-class
  customizedProduct = new product(selectedCatalougeItem.id);
  // calls the method that creates an instance of the catalouge-item-class inside the product-class
  await customizedProduct.initCatalogueItem();

  // Sets the product DOM with information from the chosen catalogue item
  showCustomizeProductSite(customizedProduct);

  // set values for the product before custumization starts
  customizedProduct.setDefaultProduct();
}

function showCustomizeProductSite(instance) {
  const customizationSiteHTML = instance.renderCustomizationSite();

  document
    .querySelector("#product_id")
    .insertAdjacentHTML("beforeend", customizationSiteHTML);

  // Activates all eventlisternes used on the product customization site
  addProductSiteEventListeners();
}

function addProductSiteEventListeners() {
  document
    .querySelector("#selectProductSize")
    .addEventListener("change", productSizeSliderActivated);

  document
    .querySelector(".btn_increment_amount")
    .addEventListener("click", incrementProductAmountClicked);
  document
    .querySelector(".btn_decrement_amount")
    .addEventListener("click", decrementProductAmountClicked);

  document
    .querySelector("#chosenMaterial")
    .addEventListener("change", resetProductMaterialSelector);

  document
    .querySelector("#chosenColour")
    .addEventListener("change", setProductColour);

  document
    .querySelector(".btn-add-basket")
    .addEventListener("click", addProductToBasketBtnClicked);
}

function addProductToBasketBtnClicked() {
  // adds the product instance to the shopping cart
  customizedProduct.initStockMaterial();
  addProductToBasket(customizedProduct);
  // -------------------------------------------------- set the stockInfo...
  // viewButtonClicked(selectedCatalougeItem);
  clearProductCustomizationSite();
}

function clearProductCustomizationSite() {
  document.querySelector("#product_id").innerHTML = "";
}

function incrementProductAmountClicked(event) {
  event.preventDefault();
  customizedProduct.incrementProductAmount();
}

function decrementProductAmountClicked(event) {
  event.preventDefault();
  customizedProduct.decrementProductAmount();
}

// // Sets the chosen amount to 1
// export function resetProductAmount() {
//   amount = 1;
//   customizedProduct.showSelectedAmount();
// }

// Sets the material to the type selected in the "chooseMaterial" drop down
function resetProductMaterialSelector(event) {
  const selectedMaterial = event.target.value;
  // console.log("selected material ", selectedMaterial);

  // Resets the "chosenColour" drop down option
  customizedProduct.refreshColourSelector(selectedMaterial);
}

// Sets the chosen color AND material
function setProductColour(event) {
  // console.log("product colour ID: ", event.target.value);
  const chosenMaterialAndColour = Number(event.target.value);
  customizedProduct.setDefaultMaterialId(chosenMaterialAndColour);
}

// sets the product size based on the size-slider input.
function productSizeSliderActivated(event) {
  const sliderInputValue = Number(event.target.value);
  customizedProduct.setProductSize(sliderInputValue);
}

export { stockInStorage };
