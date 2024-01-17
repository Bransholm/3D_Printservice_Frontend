import { displayedTotalPrice } from "../frontpage-controller/order-site.js";
import { fetchSystemVariables } from "../frontpage-model/fetch-data.js";

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
  <button id="btn_finish_payment" class="change_cursor_to_a_pointer_on_hover">Bekræft</button>
  `;

  document
    .querySelector("#payment-information-message")
    .insertAdjacentHTML("beforeend", messageHTML);
  // add eventlistener for the paymeny-completed screen!
  document
    .querySelector("#btn_finish_payment")
    .addEventListener("click", showFinishPaymentScreen);
}

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
     <p>  Tak for din bestilling. Pengene vil først blive overført når odren er
       produceret og afsendt. Du modtager en mail når odren sendes. Tak fordi du
       valgte at handle hos 3dPrinstServicce.</p>
      
       <a href="#products" class="view-link view-link-menu">
      <button class="change_cursor_to_a_pointer_on_hover">til forsiden</button>
      </a>
     `;

  document
    .querySelector("#payment-information-message")
    .insertAdjacentHTML("beforeend", messageHTML);

  resetSiteAfterSuccessfullPurchase();
}

function resetSiteAfterSuccessfullPurchase() {
  console.log("NOW RESET THE SHOPPING CART AND CLEAR ALL INPUTS");
}

export { showPaymentScreen };
