// imports the get-api routes
import {
  getCatalougeItemById,
  getStockItemById,
  fetchSystemVariables,
} from "../../frontpage-model/fetch-data.js";

// imports the existing classes for stock-materials and catalouge-items
import { stockMaterial } from "../../frontpage-view/view-render-classes/stock-class.js";
import { catalogueItem } from "../../frontpage-view/view-render-classes/catalogue-class.js";

import { stockInStorage } from "./product-customization.js";

export class product {
  // There needs to be an order id as well down the line...
  constructor(catalogueId) {
    this.catalogue_ID = catalogueId;
    this.stock_ID;
    // html from the catalouge item;
    // this.renderCatalougeHTML = "test";
    this.catalogueInfo = null;
    this.stockInfo = null;
    // this.initCatalogueItem();
    this.productSize;
    this.amount = 1;
    this.bundlePrice;
    this.bundleTax;
    this.itemPrice;
    this.itemTax;
    this.itemPriceMinusTax;
    // Matieral information
    this.materialPrice;
    this.material;
    this.colour;
    // "name" referes to the material description.
    this.name;
  }

  async initSystemVariables() {
    const systemsData = await fetchSystemVariables();
    this.systemTax = Number(systemsData[0].Tax);
    this.systemBasePrice = Number(systemsData[0].PriceCalculationForm);
  }

  async initCatalogueItem() {
    await this.setCatalougeInfo(this.catalogue_ID);

    this.productImage = this.catalogueInfo.imageLink;
    this.productTitle = this.catalogueInfo.title;

    this.renderCatalougeHTML = this.catalogueInfo.renderBasicInformation();
  }

  async setCatalougeInfo(id) {
    const catalougeItemData = await this.fetchCatalogueData(id);
    const catalogueItemClass = this.setCatalougeClass(catalougeItemData);

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

  // stocks
  async initStockMaterial() {
    await this.setStockInfo(this.stock_ID);

    // console.log("the stock class: ", this.stockInfo);
    this.colour = this.stockInfo.colour;
    this.name = this.stockInfo.name;
    this.matieral = this.stockInfo.material;
    // this.renderCatalougeHTML = this.catalogueInfo.renderBasicInformation();
  }

  async setStockInfo(id) {
    const stockData = await this.fetchStockData(id);
    const stockClass = this.setStockClass(stockData);

    this.stockInfo = stockClass;
  }

  async fetchStockData(id) {
    const stockData = await getStockItemById(id);
    return stockData;
  }

  setStockClass(stockMaterialData) {
    const newDataInstance = new stockMaterial(stockMaterialData);
    return newDataInstance;
  }
  //-------------------------------------------------------------
  renderAmountSelectionSection() {
    const amountSelectionHTML = /*html*/ `
    <div id="selectAmount">
    <button class="btn_increment_amount"> + </button>
    <p id="selectProductAmount">Antal ${this.amount} stk</p>
    <button class="btn_decrement_amount"> - </button>
    </div>
    `;
    return amountSelectionHTML;
  }

  renderPriceView() {
    const priceHTML =
      /*html*/
      `
   <h3 id="productPrice"> Pris: ${this.bundlePrice} DKK</h3>
   `;
    return priceHTML;
  }

  renderCustomizationSite() {
    // const oldHTML = this.renderCatalougeHTML;

    const productCustomizationSiteHTML =
      /*html*/
      `

    <article>
    <!-- Here the HTML from the render method of the catalogue item class is inserted -->
    ${this.renderCatalougeHTML}


    ${this.renderPriceView()}
   

    ${this.renderAmountSelectionSection()}

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
    <p id="showSliderSize">Valgte størrelse 15 cm</p>
       <label for="productSizeSlider">Størrelse</label>
                <input type="range" min="5" max="30" value="15" name="size" id="productSizeSlider">
               
    </div>

    <p id="produktMaterialName"> Produktet bliver printet i: PLA</p>
    
    
        <button class="btn-add-basket" >Læg i kruv</button>
        <button class="btn-return-" >Forstæt shopping</button>

    


</article>
`;

    return productCustomizationSiteHTML;
  }

  // this.colour = this.stockInfo.colour;
  // this.porperty = this.catalogueInfo.name;
  // this.matieral = this.catalogueInfo.material;

  renderShoppingcartInfo() {
    const shoppingcartHTML =
      /*html*/
      `
      <article>
      ${this.renderCatalougeHTML}
      <p> Ønskede størrelse: ${this.productSize} cm</p>
      <p> Farve: ${this.colour}</p>
      <p> Materale beskrivele: ${this.name}</p>
      <p> Platsik type: ${this.material}</p>
      ${this.renderPriceView()}
      ${this.renderAmountSelectionSection()}
      <button class="btn_remove_cart_item">Fjern</button>
      </article>
  `;
    return shoppingcartHTML;
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

    this.setItemBasePrice();
  }

  calculateSizeDifference() {
    const result =
      Number(this.productSize) - Number(this.catalogueInfo.standardSize);
    return result;
  }

  calculateDifferenceConstant(sizeDifference) {
    const differenceConstant = sizeDifference / 10;
    console.log("diffConst ", differenceConstant);
    return differenceConstant;
  }

  setItemBasePrice() {
    const sizeDifference = this.calculateSizeDifference();
    console.log("sizeDiff: ", sizeDifference);
    if (sizeDifference >= 0) {
      console.log("number is positive");
      this.itemPriceWithoutTax =
        this.setItemPriceIfSizeDifferenceIsPositive(sizeDifference);
    } else {
      console.log("number is negative");
      this.itemPriceWithoutTax =
        this.setItemPriceIfSizeDifferenceIsNegative(sizeDifference);
    }
    this.setItemPrice();
  }

  setItemPriceIfSizeDifferenceIsNegative(sizeDifference) {
    const negativeDifferance =
      -this.calculateDifferenceConstant(sizeDifference);
    console.log("negative: ", negativeDifferance);
    return (
      (this.materialPrice / 1000) *
        (this.catalogueInfo.standardWeight / (1 + negativeDifferance)) +
      this.systemBasePrice
    );
  }

  setItemPriceIfSizeDifferenceIsPositive(sizeDifference) {
    return (
      (this.materialPrice / 1000) *
        (this.catalogueInfo.standardWeight *
          (1 + this.calculateDifferenceConstant(sizeDifference))) +
      this.systemBasePrice
    );
  }

  setItemPrice() {
    // calculates price pr. individual item
    this.itemPrice = (this.itemPriceWithoutTax * this.systemTax).toFixed(2);
    this.setSingleProductTax();
  }

  setSingleProductTax() {
    this.itemTax = (this.itemPrice - this.itemPriceWithoutTax).toFixed(2);
    this.setBundleProductPrice();
  }

  // calculates the price for all items selected
  setBundleProductPrice() {
    this.bundlePrice = (this.itemPrice * this.amount).toFixed(2);
    this.showPriceToPay();
    this.calculateBudleTax();
  }

  calculateBudleTax() {
    this.bundleTax = (this.itemTax * this.amount).toFixed(2);
  }

  showPriceToPay() {
    document.querySelector(
      "#productPrice"
    ).innerHTML = `Pris: ${this.bundlePrice} DKK`;
  }

  /* WILL THIS WORK.................................................................*/
  // limitDecimals(numb) {
  //   numb = numb.toFixed(2);
  //   notString(numb);
  // }

  // notString(numb) {
  //  numb = Number(numb);
  // }

  // first of we calculate the price without tax.
  // then we calculate the price with the tax - then subtract to know what the tax is.

  // Alteres the size information showed to the customer
  setProductSizeInfo() {
    document.querySelector("#showSliderSize").innerHTML = "";
    // console.log("The size is ", event.target.value, " CM");
    document.querySelector(
      "#showSliderSize"
    ).innerHTML = `Valgte størrelse ${this.productSize} cm`;
  }

  setProductSize(sizeInput) {
    this.productSize = Number(sizeInput);
    this.setProductSizeInfo();
    this.setCompleteProductPrice();
  }

  // Changes the selected maetrial id to the material shown in the "choosenMaterial" drop down with the first available colour in the "choosenColour" drop down
  setDefaultMaterialId(id) {
    this.stock_ID = id;
  }

  // Sets the default material including type, colour and price
  setDeafaultProductMaterial(material, price, id) {
    // sets the selected material
    this.setMaterial(material);
    // Sets the value of the product material price
    this.setProductMaterialPrice(price);
    // Sets the default selected material id - indirectly the chosen colour
    this.setDefaultMaterialId(id);
  }

  // Stores the price value of the selected material
  setProductMaterialPrice(newPrice) {
    this.materialPrice = Number(newPrice);
    this.setCompleteProductPrice();
  }

  //  --- Functions that set the product material and colour
  // Clear and shwos the print material on screen
  setMaterialText() {
    document.querySelector("#produktMaterialName").innerHTML = "";
    document.querySelector(
      "#produktMaterialName"
    ).innerHTML = `Produktet bliver printet i: ${this.material}`;
  }

  setMaterial(material) {
    // changes the material attribute to the selected material
    this.material = material;
    // Tells the customer what plastic type the product will be printed in
    this.setMaterialText();
  }

  // Creates the options for the colour drop down - value is the stockMaterial.id
  activateColour(colour, id) {
    const newColourOption = document.createElement("option");
    newColourOption.value = id;
    newColourOption.text = colour;
    document.querySelector("#chosenColour").add(newColourOption);
  }

  // Resets all the colours in the "chosenColour" drop down
  refreshColourSelector(selectedMaterial) {
    document.querySelector("#chosenColour").innerHTML = "";

    // Checks if the match is the first
    let matchValue = 0;

    // Loops through all available materials to find those matching with the selected type
    for (let n = 0; n < stockInStorage.length; n++) {
      const material = stockInStorage[n];

      if (selectedMaterial === material.Name.toLowerCase()) {
        //  For every match available - an option is made available

        this.activateColour(material.Colour, material.Id);

        // Sets the first avaialbe material as the product default
        if (matchValue === 0) {
          this.setDeafaultProductMaterial(
            material.Material,
            material.SalesPrice,
            material.Id
          );
          matchValue = 1;
        }
      }
    }
  }

  // Set all the standard product values
  setDefaultProduct() {
    // Sets the chosen amount to 1
    // resetProductAmount();
    // Set the item size to fit the item.standardSize
    this.productSize = this.catalogueInfo.standardSize;
    // Set the size-slider value to the default size
    document.querySelector("#productSizeSlider").value = this.productSize;
    // Set the size information shown to the product customization site
    this.setProductSizeInfo();
    // Show the default material type and colour - set the first available as chosen
    this.refreshColourSelector(stockInStorage[0].Name.toLowerCase());
    // Set the default
    this.setCompleteProductPrice();
  }
}
