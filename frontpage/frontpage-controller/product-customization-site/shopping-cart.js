import { calculateTotalPrice } from "./price-calculation.js";
import { showItemCartPriceSection } from "../../frontpage-view/display-calculated-total-price.js";
// Contains all products added to the cart
const shoppingCart = [];

// Cheks if an product instance has a doublicate in the system
function checkForDoublets(newProduct) {
  // Cheks if the cart is empty
  if (shoppingCart.length > 0) {
    // Sets the unique status
    let itemIsUnique = true;
    for (const product of shoppingCart) {
      // If the products are similar their amount-values are added
      if (compareAttirbutes(product, newProduct)) {
        itemIsUnique = false;
        product.amount += newProduct.amount;
        product.setCompleteProductPrice();
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
  return (
    cartProduct.catalogue_ID === newProduct.catalogue_ID &&
    cartProduct.stock_ID === newProduct.stock_ID &&
    cartProduct.productSize === newProduct.productSize
  );
}

// Pushes the product to the shoppingCart Array
function pushProduct(selectedProduct) {
  shoppingCart.push(selectedProduct);
  console.log("producted added!");
}

export async function addProductToBasket(productInstance) {
  console.log("item to push: ", productInstance);
  checkForDoublets(productInstance);
  console.log("cart items ", shoppingCart);
  showItemsInCart();
}

function clearShoppingCartHTML() {
  document.querySelector("#shopping_cart_view").innerHTML = "";
}

function showItemsInCart() {
  clearShoppingCartHTML();
  for (let i = 0; i < shoppingCart.length; i++) {
    const product = shoppingCart[i];
    const productNo = i + 1;
    console.log("shopping card index ", i, " is ", product);
    const productOrderHTML =
      /*html*/
      `
     <h4>Produkt ${productNo}</h4>
     ${product.renderShoppingcartInfo()}
     `;

    document
      .querySelector("#shopping_cart_view")
      .insertAdjacentHTML("beforeend", productOrderHTML);

    // Eventlisteners!
    document
      .querySelector(
        "#shopping_cart_view article:last-child .btn_increment_amount"
      )
      .addEventListener("click", () => incrementProductAmountClicked(product));

    document
      .querySelector(
        "#shopping_cart_view article:last-child .btn_decrement_amount"
      )
      .addEventListener("click", () => decrementProductAmountClicked(product));

    document
      .querySelector(
        "#shopping_cart_view article:last-child .btn_remove_cart_item"
      )
      .addEventListener("click", () => removeProductFromCart(i));
  }

  const totalTaxAndPrice = calculateTotalPrice();
  showItemCartPriceSection(totalTaxAndPrice);
}

function incrementProductAmountClicked(productInstance) {
  productInstance.incrementProductAmount();
  showItemsInCart();
}

function decrementProductAmountClicked(productInstance) {
  productInstance.decrementProductAmount();
  showItemsInCart();
}

function removeProductFromCart(i) {
  console.log("cut: ", shoppingCart[i]);
  shoppingCart.splice(i, 1);
  showItemsInCart();
}

export { shoppingCart, clearShoppingCartHTML };
