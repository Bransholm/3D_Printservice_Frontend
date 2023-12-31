import {
  getCatalougeItemById,
  getStockItemById,
} from "../../frontpage-model/fetch-data.js";
import { stockMaterial } from "../../frontpage-view/view-render-classes/stock-class.js";
import { catalogueItem } from "../../frontpage-view/view-render-classes/catalogue-class.js";
import { resetProductAmount } from "./product-customization.js";

//NB::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::.. pris udregninger... SKAL genbruges!
// import {
//   setSingleProductPrice,
//   setBundleProductPrice,
// } from "./product-customization.js";

// Contains all products added to the cart
const shoppingCart = [];

// Cheks if an product instance has a doublicate in the system
function checkForDoublets(newProduct) {
  // console.log("This is your product: ", newProduct);
  // console.log("number of cart items ", shoppingCart.length);

  // Cheks if the cart is empty
  if (shoppingCart.length > 0) {
    // Sets the unique status
    let itemIsUnique = true;
    for (const product of shoppingCart) {
      // If the products are similar their amount-values are added
      if (compareAttirbutes(product, newProduct)) {
        itemIsUnique = false;
        product.productAmount += newProduct.productAmount;
      }
    }
    // If the unique status is true the item is pushed.
    if (itemIsUnique === true) {
      pushProduct(newProduct);
    } else {
      console.log("Item already found");
    }
  } else {
    // Pushes the item if the cart is already empty
    pushProduct(newProduct);
  }
}

// checks if the material, catalogue item and size are matching
function compareAttirbutes(cartProduct, newProduct) {
  // console.log("This is  product in your mcart: ", product)
  return (
    cartProduct.catalogueId === newProduct.catalogueId &&
    cartProduct.stockId === newProduct.stockId &&
    cartProduct.productSize === newProduct.productSize
  );
}

// Pushes the product to the shoppingCart Array
function pushProduct(selectedProduct) {
  shoppingCart.push(selectedProduct);
  console.log("producted added!");
}

export async function addProductToBasket(
  catalogueId,
  stockId,
  size,
  amount,
  price
) {
  resetProductAmount();
  // creates an instance productOrder class
  const productForBasket = new productOrder(
    catalogueId,
    stockId,
    size,
    amount,
    price
  );

  await productForBasket.init();

  console.log("new attribute ", productForBasket.productName);

  checkForDoublets(productForBasket);
  showItemsInCart();
}

class productOrder {
  constructor(catalogueId, stockId, size, amount, singleProductPrice) {
    this.catalogueId = catalogueId;
    this.stockId = stockId;
    this.productSize = size;
    this.productAmount = amount;
    this.productPrice = singleProductPrice;
    this.stockInfo = null;
    this.catalogueInfo = null;
    this.init();
  }

  async init() {
    await this.setStockInfo(this.stockId);
    await this.setCatalougeInfo(this.catalogueId);

    this.productName = this.stockInfo.name;
    this.productColour = this.stockInfo.colour;
    this.productMaterial = this.stockInfo.material;
    this.productImage = this.catalogueInfo.imageLink;
    this.productTitle = this.catalogueInfo.title;
  }

  getPrice() {}

  // Fetch or find the date based on the ID
  // Get title/ photo
  // Get the material and colour...
  // WE NEVER CALCULATE THE GRAM!

  render() {
    const productOrderHTML =
      /*html*/
      `
    <article>
    <h3>${this.productTitle}</h3>
     <img src="../../../images/${this.productImage}" alt="Produktbillede ${this.productTitle}"/>
    <p>catalogueId - ${this.catalogueId}</p>
    <p>stockId - ${this.stockId}</p>
    <p>Farve: ${this.productColour} Egenskab: ${this.productName}</p>
    <p>Printes i: ${this.productMaterial}</p>
    <p>Valgt størrelse: ${this.productSize} cm</p>
    <button class="btn_increment_amount">+</button>
    <p>Antal: ${this.productAmount}</p>
    <button class="btn_derement_amount">-</button>
    <p>CALCULATE PRICE</p>
    <p>Pris: ${this.productPrice} DKK</p>
    <button class="btn_remove_cart_item">Fjern</button>
    </article>
    `;

    return productOrderHTML;
  }

  async setStockInfo(id) {
    const stockItemData = await this.fetchStockData(id);
    console.log("the data: ", stockItemData);

    const stockItemClass = this.setStockClass(stockItemData);
    console.log("the class: ", stockItemClass);

    this.stockInfo = stockItemClass;
  }

  async fetchStockData(id) {
    const stockData = await getStockItemById(id);
    return stockData;
  }

  setStockClass(stockItemData) {
    const newDataInstance = new stockMaterial(stockItemData);
    return newDataInstance;
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

  incrementProductAmount() {
    this.productAmount++;
  }

  decrementProductAmount() {
    this.productAmount--;
  }
}

function showItemsInCart() {
  document.querySelector("#shopping_cart_view").innerHTML = "";

  for (let i = 0; i < shoppingCart.length; i++) {
    const product = shoppingCart[i];
    console.log("shopping card index ", i, " is ", product);
    const productOrderHTML = product.render();

    // --------------- NEW HTML ID/ PAGE NEEDED!!! --------------------------------------------- OBS!!!!!
    document
      .querySelector("#shopping_cart_view")
      .insertAdjacentHTML("beforeend", productOrderHTML);

    // Eventlisteners!
    document
      .querySelector(
        "#shopping_cart_view article:last-child .btn_increment_amount"
      )
      .addEventListener("click", () => incrementCartProductAmount(product));

    document
      .querySelector(
        "#shopping_cart_view article:last-child .btn_derement_amount"
      )
      .addEventListener("click", () => decrementcartProductAmount(product));

    document
      .querySelector(
        "#shopping_cart_view article:last-child .btn_remove_cart_item"
      )
      .addEventListener("click", () => removeProductFromCart(i));
  }
}

function removeProductFromCart(i) {
  shoppingCart.splice(shoppingCart[i], 1);
  showItemsInCart();
}

function incrementCartProductAmount(product) {
  product.incrementProductAmount();
  showItemsInCart();
}

function decrementcartProductAmount(product) {
  if (product.productAmount > 1) {
    product.decrementProductAmount();
  }
  showItemsInCart();
}

function setSingleProductPrice() {
  singleProductPrice = (materialPrice / 1000) * (size * 1.8);
}

function setBundleProductPrice() {
  return productPrice * amount;
}

export { shoppingCart };
