// imports the get-api routes
import {
  getCatalougeItemById,
  getStockItemById,
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
    // this.initCatalogueItem();
    this.productSize;
    this.amount = 1;
    this.bundlePrice;
    this.itemPrice;
    this.itemTax;
    this.materialPrice;
    this.material;
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
    <p id="showSliderSize">Valgte højde 15 cm</p>
       <label for="productSizeSlider">Størrelse</label>
                <input type="range" min="1" max="30" value="15" name="size" id="productSizeSlider">
               
    </div>

    <p id="productWeight"> Udrgenede vægt pr. produkt: XXXX gram </p>
    <p id="produktMaterialName"> Produktet bliver printet i: PLA</p>
    
    
        <button class="btn-add-basket" >Læg i kruv</button>
        <button class="btn-return-" >Forstæt shopping</button>

    


</article>
`;

    return productCustomizationSiteHTML;
  }

  renderShoppingcartInfo() {
    const shoppingcartHTML =
      /*html*/
      `
      <article>
      ${this.renderCatalougeHTML}
      <p>Printes i :${this.material}</p>
      <p>Farve - Hårdhed</p>
      <p>Total pris: ${this.itemPrice}</p>
      ${this.renderAmountSelectionSection()}
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
    // console.log(
    //   `Samlet pris = materiale ${materialPrice}, størrelse${size}, antal${amount}`
    // );
    //der mangler en vloume udregning på baggrund af vægt i forhold til størrelsen.
    this.setSingleProductPrice();
    this.bundlePrice = this.setBundleProductPrice();
    // price the decimal to 2
    this.bundlePrice = this.bundlePrice.toFixed(2);
    console.log("Total price is: ", this.bundlePrice);
    // run op!
    document.querySelector(
      "#productPrice"
    ).innerHTML = `Samlet Pris: ${this.bundlePrice} DKK`;
  }

  setSingleProductPrice() {
    const tax = 1.25;
    // calculates price pr. individual item
    this.itemPrice =
      ((this.materialPrice / 1000) * (this.productSize * 1.8) * tax).toFixed(2);
    this.setSingleProductTax();
  }

  setSingleProductTax() {
    this.itemTax = (this.itemPrice * 0.25).toFixed(2);
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
    ).innerHTML = `Valgte højde ${this.productSize} cm`;
  }

  setProductSize(sizeInput) {
    this.productSize = sizeInput;
    this.setProductSizeInfo();
    this.setCompleteProductPrice();
  }

  // Changes the selected maetrial id to the material shown in the "choosenMaterial" drop down with the first available colour in the "choosenColour" drop down
  setDefaultMaterialId(id) {
    this.stock_ID = id;
    console.log("New defaut stockID ", this.stock_ID);
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
    this.materialPrice = newPrice;
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
    // console.log(newColourOption);
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
    console.log("Set all events");

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
