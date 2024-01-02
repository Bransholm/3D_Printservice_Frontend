// Imports only the stockMaterials that is not sold out
import { getAvailableStockData } from "../../frontpage-model/fetch-data.js";
import { addProductToBasket } from "./shopping-cart.js";

let catalogueId;
let size = 15;
let amount;
// Used to calculate the set price...
let materialPrice = 155.0;
let stockInStorage;
let price;
let stockId;
let singleProductPrice;

// class productCreator {
//   constructor(catalogueId, stockId, size, amount, singleProductPrice) {
//     this.catalogueId = catalogueId;
//     this.stockId = stockId;
//     this.productSize = size;
//     this.productAmount = amount;
//     this.productPrice = singleProductPrice;
//     this.stockInfo = null;
//     this.catalogueInfo = null;
//     this.init();
//   }
// }

export async function viewButtonClicked(instance) {
  console.log("view button clicked: ", instance.id);

  // Sets the id for the chosen catalogue item
  catalogueId = instance.id;

  document.querySelector("#product_id").innerHTML = "";

  // Fetches all the stock materials that are not sold out
  stockInStorage = await getAvailableStockData();
  // console.log("The available stock", stockInStorage);

  // Sets the product DOM with information from the chosen catalogue item
  showCustomizeProductSite(instance);

  // set values for the product before custumization starts
  setDefaultProduct(instance.standardSize);
}

function showCustomizeProductSite(instance) {
  // NB: Vi skal lave et fetch som tjekker om en side er løbet tør for noget bestemt...
  const html =
    /*html*/
    `
<article>
    <article>
    <h3>Produkt Navn: ${instance.title}</h3>
    <img src="./images/${instance.imageLink}" alt="Produktbillede ${instance.title}"/>
    <p>Kategori: ${instance.category}</p>
    <p>Produkt Beskrivelse: ${instance.itemDescription}</p>
    <p>Standard Størrelse: ${instance.standardSize} cm</p>
    <p>Standard vægt: ${instance.standardWeight} gram</p>
        

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

</article>
`;

  document.querySelector("#product_id").insertAdjacentHTML("beforeend", html);
  // Activates all eventlisternes used on the product customization site
  addProductSiteEventListeners();
}

function addProductSiteEventListeners() {
  document
    .querySelector("#selectProductSize")
    .addEventListener("change", setProductSize);

  document
    .querySelector(".btn_increment_amount")
    .addEventListener("click", incrementProductAmount);
  document
    .querySelector(".btn_decrement_amount")
    .addEventListener("click", decrementProductAmount);

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

// Set all the standard product values
function setDefaultProduct(defaultSize) {
  console.log("Set all events");

  // Sets the chosen amount to 1
  resetProductAmount();
  // Set the item size to fit the item.standardSize
  size = defaultSize;
  // Set the size-slider value to the default size
  document.querySelector("#productSizeSlider").value = size;
  // Set the size information shown to the product customization site
  setProductSizeInfo();
  // Show the default material type and colour - set the first available as chosen
  refreshColourSelector(stockInStorage[0].Name.toLowerCase());
  // Set the default
  setCompleteProductPrice();
}

export function resetProductAmount() {
  amount = 1;
  showSelectedAmount();
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

function setProductSize(event) {
  size = Number(event.target.value);
  setProductSizeInfo();
  setCompleteProductPrice();
}

// Alteres the size information showed to the customer
function setProductSizeInfo() {
  document.querySelector("#showSliderSize").innerHTML = "";
  // console.log("The size is ", event.target.value, " CM");
  document.querySelector(
    "#showSliderSize"
  ).innerHTML = `Valgte højde ${size} cm`;
}

function setCompleteProductPrice() {
  const tax = 1.25;
  console.log("pice is calculated!");

  document.querySelector("#productPrice").innerHTML = "";
  // console.log(
  //   `Samlet pris = materiale ${materialPrice}, størrelse${size}, antal${amount}`
  // );
  //der mangler en vloume udregning på baggrund af vægt i forhold til størrelsen.
  setSingleProductPrice();
  const bundlePrice = setBundleProductPrice();

  price = bundlePrice * tax;
  console.log("Total price is: ", price);
  // run op!
  document.querySelector(
    "#productPrice"
  ).innerHTML = `Samlet Pris: ${price} DKK`;
}

function setSingleProductPrice() {
  // calculates price pr. individual item
  singleProductPrice = (materialPrice / 1000) * (size * 1.8);
  // limits the decimal to 2
  singleProductPrice = singleProductPrice.toFixed(2);
}

// calculates the price for all items selected
function setBundleProductPrice() {
  console.log("bundle price: ", singleProductPrice);
  return singleProductPrice * amount;
}

function incrementProductAmount(event) {
  event.preventDefault();
  amount += 1;
  showSelectedAmount();
}

function decrementProductAmount(event) {
  event.preventDefault();
  if (amount > 1) {
    amount -= 1;
    showSelectedAmount();
  }
}

function showSelectedAmount() {
  document.querySelector("#selectProductAmount").innerHTML = "";
  document.querySelector(
    "#selectProductAmount"
  ).innerHTML = `Antal ${amount} stk`;

  setCompleteProductPrice();
}
