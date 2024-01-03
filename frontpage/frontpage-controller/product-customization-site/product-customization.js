// Imports only the stockMaterials that is not sold out
import { getAvailableStockData } from "../../frontpage-model/fetch-data.js";
import { addProductToBasket } from "./shopping-cart.js";

// imports the get-api routes
import {
  getCatalougeItemById,
  getStockItemById,
} from "../../frontpage-model/fetch-data.js";

// imports the existing classes for stock-materials and catalouge-items
import { stockMaterial } from "../../frontpage-view/view-render-classes/stock-class.js";
import { catalogueItem } from "../../frontpage-view/view-render-classes/catalogue-class.js";

// all the materials that are set as active
let stockInStorage;

let catalogueId;
// let size = 15;
// let amount;
// Used to calculate the set price...
let materialPrice = 155.0;
// let price;
let stockId;
// let singleProductPrice;
// the product class
let customizedProduct;

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

class product {
  // There needs to be an order id as well down the line...
  constructor(catalogueId) {
    this.catalogue_ID = catalogueId;
    // html from the catalouge item;
    // this.renderCatalougeHTML = "test";
    this.catalogueInfo = null;
    // this.initCatalogueItem();
    this.size;
    this.amount = 1;
    this.totalPrice;
    this.itemPrice;
  }

  async initCatalogueItem() {
    await this.setCatalougeInfo(this.catalogue_ID);

    this.productImage = this.catalogueInfo.imageLink;
    this.productTitle = this.catalogueInfo.title;

    this.renderCatalougeHTML = this.catalogueInfo.renderBasicInformation();
    console.log(this.renderCatalougeHTML);
  }

  async setCatalougeInfo(id) {
    const catalougeItemData = await this.fetchCatalogueData(id);
    console.log("catalouge data: ", catalougeItemData);
    const catalogueItemClass = this.setCatalougeClass(catalougeItemData);

    console.log("catalouge calss: ", catalogueItemClass);
    this.catalogueInfo = catalogueItemClass;
  }

  async fetchCatalogueData(id) {
    const catalogueData = await getCatalougeItemById(id);
    return catalogueData;
  }

  setCatalougeClass(catalogueItemData) {
    const newDataInstance = new catalogueItem(catalogueItemData);
    return newDataInstance;
  }

  renderCustomizationSite() {
    // const oldHTML = this.renderCatalougeHTML;
    console.log("whats old html: ", this.catalogueInfo);

    const productCustomizationSiteHTML =
      /*html*/
      `

    <article>
    <!-- Here the HTML from the render method of the catalogue item class is inserted -->
    ${this.renderCatalougeHTML}


  
    <h3 id="productPrice"> Samlet Pris: XXX.XX DKK</h3>
    <form>

    <div id="selectAmount">
    <button class="btn_increment_amount"> + </button>
    <p id="selectProductAmount">Antal 1 stk.</p>
    <button class="btn_decrement_amount"> - </button>
    </div>

    <div id="selectMaterial">
    
    <label for="chosenMaterial">Materiale</label>
                <select name="material" id="chosenMaterial">
                <option value="blød">Blød</option>
                <option value="elastisk">Elastisk</option>
                <option value="hård">Hård</option>
                </select>


      <label for="chosenColour">Farve</label>
                <select name="colour" id="chosenColour">
                </select>




    </div>
    <div id="selectProductSize">
    <p id="showSliderSize">Valgte højde 15 cm</p>
       <label for="productSizeSlider">Størrelse</label>
                <input type="range" min="1" max="30" value="15" name="size" id="productSizeSlider">
               
    </div>

    <p id="productWeight"> Udrgenede vægt pr. produkt: XXXX gram </p>
    <p id="produktMaterialName"> Produktet bliver printet i: PLA</p>
    
    </form>
    
        <button class="btn-add-basket" >Læg i kruv</button>
        <button class="btn-return-" >Forstæt shopping</button>

    


</article>
`;

    return productCustomizationSiteHTML;
  }

  incrementProductAmount() {
    this.amount += 1;
    this.showSelectedAmount();
  }

  decrementProductAmount() {
    if (this.amount > 1) {
      this.amount -= 1;
      this.showSelectedAmount();
    }
  }

  showSelectedAmount() {
    document.querySelector("#selectProductAmount").innerHTML = "";
    document.querySelector(
      "#selectProductAmount"
    ).innerHTML = `Antal ${this.amount} stk`;

    this.setCompleteProductPrice();
  }

  setCompleteProductPrice() {
    document.querySelector("#productPrice").innerHTML = "";
    // console.log(
    //   `Samlet pris = materiale ${materialPrice}, størrelse${size}, antal${amount}`
    // );
    //der mangler en vloume udregning på baggrund af vægt i forhold til størrelsen.
    this.setSingleProductPrice();
    this.totalPrice = this.setBundleProductPrice();
    // price the decimal to 2
    this.totalPrice = this.totalPrice.toFixed(2);
    console.log("Total price is: ", this.totalPrice);
    // run op!
    document.querySelector(
      "#productPrice"
    ).innerHTML = `Samlet Pris: ${this.totalPrice} DKK`;
  }

  setSingleProductPrice() {
    const tax = 1.25;
    // calculates price pr. individual item
    this.itemPrice = (materialPrice / 1000) * (this.size * 1.8) * tax;
  }

  // calculates the price for all items selected
  setBundleProductPrice() {
    console.log("bundle price: ", this.itemPrice);
    return this.itemPrice * this.amount;
  }

  // Alteres the size information showed to the customer
  setProductSizeInfo() {
    document.querySelector("#showSliderSize").innerHTML = "";
    // console.log("The size is ", event.target.value, " CM");
    document.querySelector(
      "#showSliderSize"
    ).innerHTML = `Valgte højde ${this.size} cm`;
  }

  setProductSize(sizeInput) {
    this.size = sizeInput;
    this.setProductSizeInfo();
    this.setCompleteProductPrice();
  }

  // Set all the standard product values
  setDefaultProduct() {
    console.log("Set all events");

    // Sets the chosen amount to 1
    // resetProductAmount();
    // Set the item size to fit the item.standardSize
    this.size = this.catalogueInfo.standardSize;
    // Set the size-slider value to the default size
    document.querySelector("#productSizeSlider").value = this.size;
    // Set the size information shown to the product customization site
    this.setProductSizeInfo();
    // Show the default material type and colour - set the first available as chosen
    refreshColourSelector(stockInStorage[0].Name.toLowerCase());
    // Set the default
    this.setCompleteProductPrice();
  }
}

export async function viewButtonClicked(instance) {
  console.log("view button clicked: ", instance.id);

  // Sets the id for the chosen catalogue item
  catalogueId = instance.id;

  document.querySelector("#product_id").innerHTML = "";

  // ------------------- DEV NOTE: skal vi fetche hver gang man trykker på knappen? Ja? ---------------------
  // Fetches all the stock materials that are not sold out
  stockInStorage = await getAvailableStockData();
  // console.log("The available stock", stockInStorage);

  // creates an instance of the product-class
  customizedProduct = new product(instance.id);
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
  addProductSiteEventListeners(customizedProduct);
}

function addProductSiteEventListeners(instance) {
  document
    .querySelector("#selectProductSize")
    .addEventListener("change", productSizeSliderActivated);

  document
    .querySelector(".btn_increment_amount")
    .addEventListener("click", incrementProductAmountClick);
  document
    .querySelector(".btn_decrement_amount")
    .addEventListener("click", decrementProductAmountClick);

  document
    .querySelector("#chosenMaterial")
    .addEventListener("change", setProductMaterial);

  document
    .querySelector("#chosenColour")
    .addEventListener("change", setProductColour);

  document
    .querySelector(".btn-add-basket")
    .addEventListener("click", () =>
      addProductToBasket(catalogueId, stockId, size, amount, price)
    );
}

function incrementProductAmountClick(event) {
  event.preventDefault();
  customizedProduct.incrementProductAmount();
}

function decrementProductAmountClick(event) {
  event.preventDefault();
  customizedProduct.decrementProductAmount();
}

// // Set all the standard product values
// function setDefaultProduct(defaultSize) {
//   console.log("Set all events");

//   // Sets the chosen amount to 1
//   // resetProductAmount();
//   // Set the item size to fit the item.standardSize
//   size = defaultSize;
//   // Set the size-slider value to the default size
//   document.querySelector("#productSizeSlider").value = size;
//   // Set the size information shown to the product customization site
//   customizedProduct.setProductSizeInfo();
//   // Show the default material type and colour - set the first available as chosen
//   refreshColourSelector(stockInStorage[0].Name.toLowerCase());
//   // Set the default
//   customizedProduct.setCompleteProductPrice();
// }

// Sets the chosen amount to 1
export function resetProductAmount() {
  amount = 1;
  customizedProduct.showSelectedAmount();
}

// Sets the material to the type selected in the "chooseMaterial" drop down
function setProductMaterial(event) {
  const selectedMaterial = event.target.value;
  // console.log("selected material ", selectedMaterial);

  // Resets the "chosenColour" drop down option
  refreshColourSelector(selectedMaterial);
}

// Resets all the colours in the "chosenColour" drop down
function refreshColourSelector(selectedMaterial) {
  document.querySelector("#chosenColour").innerHTML = "";

  // Checks if the match is the first
  let matchValue = 0;

  // Loops through all available materials to find those matching with the selected type
  for (let n = 0; n < stockInStorage.length; n++) {
    const material = stockInStorage[n];

    if (selectedMaterial === material.Name.toLowerCase()) {
      //  For every match available - an option is made available
      activateColour(material.Colour, material.Id);

      // Sets the first avaialbe material as the product default
      if (matchValue === 0) {
        setDeafaultProductMaterial(
          material.Material,
          material.SalesPrice,
          material.Id
        );
        matchValue = 1;
      }
    }
  }
}

// Sets the default material including type, colour and price
function setDeafaultProductMaterial(material, price, id) {
  // Tells the customer what plastic type the product will be printed in
  setMaterialText(material);
  // Sets the value of the product material price
  setProductMaterialPrice(price);
  // Sets the default selected material id - indirectly the chosen colour
  setDefaultMaterialId(id);
}

// Changes the selected maetrial id to the material shown in the "choosenMaterial" drop down with the first available colour in the "choosenColour" drop down
function setDefaultMaterialId(id) {
  stockId = id;
  // console.log("New defaut stockID ", stockId);
}

// Stores the price value of the selected material
function setProductMaterialPrice(newPrice) {
  materialPrice = newPrice;
  customizedProduct.setCompleteProductPrice();
}

//  --- Functions that set the product material and colour
// Clear and shwos the print material on screen
function setMaterialText(material) {
  document.querySelector("#produktMaterialName").innerHTML = "";
  document.querySelector(
    "#produktMaterialName"
  ).innerHTML = `Produktet bliver printet i: ${material}`;
}

// Creates the options for the colour drop down - value is the stockMaterial.id
function activateColour(colour, id) {
  const newColourOption = document.createElement("option");
  newColourOption.value = id;
  newColourOption.text = colour;
  // console.log(newColourOption);
  document.querySelector("#chosenColour").add(newColourOption);
}

// Sets the chosen color AND material
function setProductColour(event) {
  // console.log("product colour ID: ", event.target.value);
  const chosenMaterialAndColour = Number(event.target.value);
  setDefaultMaterialId(chosenMaterialAndColour);
}

//setProductSize;

function productSizeSliderActivated(event) {
  const sliderInputValue = Number(event.target.value);
  customizedProduct.setProductSize(sliderInputValue);
}

// // Alteres the size information showed to the customer
// function setProductSizeInfo() {
//   document.querySelector("#showSliderSize").innerHTML = "";
//   // console.log("The size is ", event.target.value, " CM");
//   document.querySelector(
//     "#showSliderSize"
//   ).innerHTML = `Valgte højde ${size} cm`;
// }

// function setCompleteProductPrice() {
//   document.querySelector("#productPrice").innerHTML = "";
//   // console.log(
//   //   `Samlet pris = materiale ${materialPrice}, størrelse${size}, antal${amount}`
//   // );
//   //der mangler en vloume udregning på baggrund af vægt i forhold til størrelsen.
//   setSingleProductPrice();
//   const bundlePrice = setBundleProductPrice();

//   price = bundlePrice;
//   // price the decimal to 2
//   price = price.toFixed(2);
//   console.log("Total price is: ", price);
//   // run op!
//   document.querySelector(
//     "#productPrice"
//   ).innerHTML = `Samlet Pris: ${price} DKK`;
// }

// function setSingleProductPrice() {
//   const tax = 1.25;
//   // calculates price pr. individual item
//   singleProductPrice = (materialPrice / 1000) * (size * 1.8) * tax;
// }

// // calculates the price for all items selected
// function setBundleProductPrice() {
//   console.log("bundle price: ", singleProductPrice);
//   return singleProductPrice * amount;
// }

// function incrementProductAmount(event) {
//   event.preventDefault();
//   amount += 1;
//   showSelectedAmount();
// }

// function decrementProductAmount(event) {
//   event.preventDefault();
//   if (amount > 1) {
//     amount -= 1;
//     showSelectedAmount();
//   }
// }

// function showSelectedAmount() {
//   document.querySelector("#selectProductAmount").innerHTML = "";
//   document.querySelector(
//     "#selectProductAmount"
//   ).innerHTML = `Antal ${amount} stk`;

//   setCompleteProductPrice();
// }
