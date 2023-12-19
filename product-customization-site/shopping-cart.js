import {
  getCatalougeItemById,
  getStockItemById,
} from "../frontpage/frontpage-model/fetch-data.js";
import { stockMaterial } from "../view-render-classes/stock-class.js";
import { catalogueItem } from "../view-render-classes/catalogue-class.js";
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

  console.log("new class: ", productForBasket.stockInfo);
  // console.log("What is my size? ", size);
  // const x = new stockMaterial(await getStockItemById(productForBasket.stockId));
  // Check if the product is already in the shopping cart
  checkForDoublets(productForBasket);
  // console.log("this is your shopping cart", shoppingCart);
  // Refreshes the shopping cart html
  showItemsInCart();
}
// const catalogueID = catalogueId;
// const productSize = size;
// const productAmount = amount;
// const productPrice = price;
// const stockID = stockId;

// // Amount needs to be altered
// // Price needs to be altered.

// const productObject = {
//   catalogueID,
//   productSize,
//   productAmount,
//   productPrice,
//   stockID,
// };

class productOrder {
  constructor(catalogueId, stockId, size, amount, singleProductPrice) {
    this.catalogueId = catalogueId;
    this.stockId = stockId;
    this.productSize = size;
    this.productAmount = amount;
    this.productPrice = singleProductPrice;

    // creates an insance of the stockMaterial
    // this.stockInfo = new stockMaterial(await getStockItemById(this.stockId));
    this.stockInfo = this.setStockInfo(this.stockId);
    this.productName = this.stockInfo.Name;
    this.productColour = this.stockInfo.colour;
    this.productMaterial = this.stockInfo.material;

    // creates an insance of the CatalougeItem classes
    this.catalogueInfo = new catalogueItem(
      this.setCatalougeInfo(this.catalogueId)
    );
    this.productImage = this.catalogueInfo.imageLink;
    this.productTitle = this.catalogueInfo.Title;
  }

  /*

   DEV NOTE ----------------------------------------------------------------------------------------------------------------

    Hvis jeg lave product-site til en klasse... kan jeg kalde en instance OG genbruge prisudregningen... jeg kal self. også bare importere 
    funktionen som gør det... 

    PRIS UDREGNING... kan man gå tilbage og ændre på det? hvis det nu VAR det samme objekt/ klasse... så ja? 

    ------------------------------------------------------------------------------------------------------------------------
   */

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
     <img src="../images/${this.productImage}" alt="Produktbillede ${this.productTitle}"/>
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
    const stockItemData = await this.getStockData(id);
    console.log("the data: ", stockItemData);
    const stockItemClass = this.setStockClass(stockItemData);
    console.log("the class: ", stockItemClass);
    return stockItemClass;
  }

  async setCatalougeInfo(id) {
    this.catalogueInfo = await getCatalougeItemById(id);
  }

  async getStockData(id) {
    const stockData = await getStockItemById(id);
    return stockData;
  }

  setStockClass(stockItemData) {
    const newDataInstance = new stockMaterial(stockItemData);
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
  document.querySelector("#special_products").innerHTML = "";

  for (let i = 0; i < shoppingCart.length; i++) {
    const product = shoppingCart[i];
    console.log("shopping card index ", i, " is ", product);
    const productOrderHTML = product.render();

    // --------------- NEW HTML ID/ PAGE NEEDED!!! --------------------------------------------- OBS!!!!!
    document
      .querySelector("#special_products")
      .insertAdjacentHTML("beforeend", productOrderHTML);

    // Eventlisteners!
    document
      .querySelector(
        "#special_products article:last-child .btn_increment_amount"
      )
      .addEventListener("click", () => incrementCartProductAmount(product));

    document
      .querySelector(
        "#special_products article:last-child .btn_derement_amount"
      )
      .addEventListener("click", () => decrementcartProductAmount(product));

    document
      .querySelector(
        "#special_products article:last-child .btn_remove_cart_item"
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
