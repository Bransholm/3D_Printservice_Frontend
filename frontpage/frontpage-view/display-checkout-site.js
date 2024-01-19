import { displayedTotalPrice } from "../frontpage-controller/order-site.js";
import { fetchSystemVariables } from "../frontpage-model/fetch-data.js";
import {
  shoppingCart,
  clearShoppingCartHTML,
} from "../frontpage-controller/product-customization-site/shopping-cart.js";

//import showFinishPaymentScreen
async function showPaymentScreen() {
  document.querySelector("#to-payment-info-link").click();

  // disableCustomerOrderInput();

  const number = await fecthMobilePaymenyNo();
  document.querySelector("#payment-information-message").innerHTML = "";
  const messageHTML =
    /*html*/
    `
  <p> Din ordre er nu booket! For at færdiggøre din bestilling skal du overføre ${displayedTotalPrice} DKK, til 3dprintservice mobilepay på nummeret: ${number}</p>
  <button id="btn_finish_payment" class="change_cursor_to_a_pointer_on_hover">Bekræft din betaling</button>
  `;

  document
    .querySelector("#payment-information-message")
    .insertAdjacentHTML("beforeend", messageHTML);
  // add eventlistener for the paymeny-completed screen!
  document
    .querySelector("#btn_finish_payment")
    .addEventListener("click", showFinishPaymentScreen);

  resetSiteAfterSuccessfullOrder();
}


// ULOVLIGHEDER!!!! 
async function fecthMobilePaymenyNo() {
  const variablesData = await fetchSystemVariables();
  const paymentNumber = variablesData[0].MobilePayNumber;
  return paymentNumber;
}

function showFinishPaymentScreen() {
  document.querySelector("#payment-information-message").innerHTML = "";
  const messageHTML =
    /*html*/
    `
     <p>  Tak for din bestilling.<br>Pengene vil først blive trukket når odren er
       produceret og afsendt.<br>Du modtager en mail når odren sendes.<br>Tak fordi du
       valgte at handle hos 3dPrinstService.</p>
      
       <a href="#products" class="view-link view-link-menu">
      <button class="change_cursor_to_a_pointer_on_hover">til forsiden</button>
      </a>
     `;

  document
    .querySelector("#payment-information-message")
    .insertAdjacentHTML("beforeend", messageHTML);
}

// resets the order site after an order is made
function resetSiteAfterSuccessfullOrder() {
  uncheckTermsAndConditionsCheckBox();
  clearAllShoppingCartItems();
}

// unticks the agree to terms and conditions checkbox
function uncheckTermsAndConditionsCheckBox() {
  document.querySelector("#accept_payment_details_checkbox").checked = false;
}

function clearAllShoppingCartItems() {
  // clear all elements in the shopping cart
  shoppingCart.splice(0, shoppingCart.length);
  // clear the shopping cart html
  clearShoppingCartHTML();
  // removes the totalprice shown at checkout site
 document.querySelector("#shopping_cart_price_iformation").innerHTML = "";
}

export { showPaymentScreen };
