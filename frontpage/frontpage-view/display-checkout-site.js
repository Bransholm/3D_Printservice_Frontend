import { disableCustomerOrderInput } from "./toggle-customer-order-Input.js";
import { displayedTotalPrice } from "../frontpage-controller/order-site.js";

//import showFinishPaymentScreen
function showPaymentScreen() {
  disableCustomerOrderInput();
  console.log("you have completed the order process and must now pay!");
  document.querySelector("#payment_details_screen").innerHTML = "";
  const number = fecthMobilePaymenyNo();
  const messageHTML =
    /*html*/
    `
  <p> Din ordre er nu booket! For at færdiggøre din bestilling skal du overføre ${displayedTotalPrice} DKK, til 3dprintservice mobilepay på nummeret: ${number}</p>
  <button id="btn_finish_payment">Til forsiden</button>
  `;

  document
    .querySelector("#payment_details_screen")
    .insertAdjacentHTML("beforeend", messageHTML);
  // add eventlistener for the paymeny-completed screen!
  document
    .querySelector("#btn_finish_payment")
    .addEventListener("click", showFinishPaymentScreen);
}

function fecthMobilePaymenyNo() {
  /* ----------------------------------------------------- INSERT FETCH-FUNCTION HERE! */
  const testNo = "70121416";
  return testNo;
}

function showFinishPaymentScreen() {
  console.log("Complete the payment process!");
  document.querySelector("#payment_details_screen").innerHTML = "";

  const html = /*html*/ `<p>
      Tak for din bestilling. Pengene vil først blive overført når odren er
      produceret og afsendt. Du modtager en mail når odren sendes. Tak fordi du
      valgte at handle hos 3dPrinstServicce.
    </p>`;

  document
    .querySelector("#payment_details_screen")
    .insertAdjacentHTML("beforeend", html);
}

export { showPaymentScreen };
