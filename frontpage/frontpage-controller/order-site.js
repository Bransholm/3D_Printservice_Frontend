const endpoint = "https://3dprintservice.azurewebsites.net/";

// the fetch route for cutsomer by email
import { fetchCustomerEmailData } from "../frontpage-model/fetch-data.js";
// the shopping cart!
import { shoppingCart } from "./product-customization-site/shopping-cart.js";

import { clearShoppingCartHTML } from "./product-customization-site/shopping-cart.js";

// imports the function that calculates total tax and price
import { calculateTotalPrice } from "./product-customization-site/price-calculation.js";

// import the rest-api from the model folder
import {
  postOrderCustomerIsExisting,
  postOrderCustomerIsNew,
} from "../frontpage-model/rest-api/make-order.js";
import { putExistingCustomer } from "../frontpage-model/rest-api/customer.js";

const shippingCosts = 39.5;

let customer_ID;

// set if the customer confirms theat they are in the database already
let customerIsNew = true;
let displayedTotalPrice;

let emailValue;

// list that stores all emails
let customerEmialList;
import { showPaymentScreen } from "../frontpage-view/display-checkout-site.js";
// imports functions that makes it possible or impossible for the user to insert their input
import {
  disableCustomerOrderInput,
  enableCustomerOrderInput,
} from "../frontpage-view/toggle-customer-order-Input.js";

// ----------- functions that controls the chek out flow -------------------------------------

async function launchOrderSite() {
  console.log("testing-the-order-site!");
  // activates the eventlisteners for the checkout-flow
  setOrderSiteEventListeners();

  // her skal vi deaktivere input
  disableCustomerOrderInput();

  // fetches all customer emails
  customerEmialList = await fetchCustomerEmailData();
  console.log("all emails: ", customerEmialList);
  // removes the displayed shopping cart
  hideShoppingCartSite();

  // resetChekOutSite();
}

function hideShoppingCartSite() {
  clearShoppingCartHTML();
  // hides the shopping cart container including the to-chek-out-butten
  document.querySelector("#shopping_cart_site").classList.add("hidden");
}

// function hideFindExistingCustomerSearchbar() {
//   document
//     .querySelector("#search_existing_customer_by_email")
//     .classList.add("hidden");

//   // her skal vi så aktivere input feltet
//   enableCustomerOrderInput();
// }

function setOrderSiteEventListeners() {
  // activates the new-customer and existing-customer buttons

  // adds the order information submit event
  document
    .querySelector("#order_details_form")
    .addEventListener("submit", submitOrderInformation);

  // activates the find customer by email sbumit event
  document
    .querySelector("#retrive_customer_by_email")
    .addEventListener("submit", findCustomerByEmail);
}

// --------------------------------------------------------------------------------------------------------------

async function findCustomerByEmail(event) {
  event.preventDefault();
  emailValue = event.target.existing_email.value;

  console.log("input email is: ", emailValue);

  let match = false;

  for (const customer of customerEmialList) {
    if (emailValue == customer.Email) {
      match = true;
      customerIsNew = false;
      const customerData = await retrieveCustomerInformation(emailValue);
      console.log("customer by email data: ", customerData);
      autofillCustomerInformation(customerData);
    }
  }
  if (match === false) {
    customerIsNew = true;
    // findCustomerByEmailErrorMessage();
  }

  // her skal vi så aktivere input feltet
  console.log("customer is new = ", customerIsNew);
  enableCustomerOrderInput();
}

// search_existing_customer_by_email_error_message

async function retrieveCustomerInformation(customerEmail) {
  console.log("retrieveCustomerInformation");
  const promise = await fetch(`${endpoint}/customers/${customerEmail}`);
  const data = await promise.json();
  return data;
}

// set all the text inputs to blank
function clearOrderForm() {
  const form = document.querySelector("#order_details_form");

  form.firstName.value = " ";
  form.lastName.value = " ";
  form.adress.value = " ";
  form.zipCode.value = " ";
  form.city.value = " ";
  form.deliveryAdress.value = " ";
  form.deliveryZipCode.value = " ";
  form.deliveryCity.value = " ";
}

function autofillCustomerInformation(retrievedCustomer) {
  const customer = retrievedCustomer[0];
  console.log("Here is the customer: ", customer);
  // here we need to set the information in the customer automatically based on the retrived customer
  const form = document.querySelector("#order_details_form");
  customer_ID = customer.Id;
  form.firstName.value = customer.FirstName;
  form.lastName.value = customer.LastName;
  form.adress.value = customer.Adress;
  form.zipCode.value = customer.ZipCode;
  form.city.value = customer.City;
  form.deliveryAdress.value = customer.Adress;
  form.deliveryZipCode.value = customer.ZipCode;
  form.deliveryCity.value = customer.City;
}

// // all
// let accumulatedItemTax = 0.0;
// let accumulatedItemPrices = 0.0;

// -------------------------------------------- Email validation --------------------------------------------------

// function validateCustomerEmail(emailInput) {
//   console.log("check customer email: ", emailInput);
//   if (customerIsNew === true) {
//     const emailIsUnique = customerEmialList.forEach(checkIfEmailIsUnique);
//     if (emailIsUnique != true) {
//       console.log("ERROR - email is already in system!");
//       emailValdiated = false;
//     } else {
//       emailValdiated = true;
//     }
//   } else if (customerIsNew === false) {
//     emailValdiated = true;
//   }

//   function checkIfEmailIsUnique(emailListElement) {
//     console.log("for each: ", emailListElement.Email, " === ", emailInput);
//     if (emailListElement.Email === emailInput) {
//       return true;
//     }
//   }
//   return emailInput;
// }

// ----------------------------------------------------------------------------------------------------------------------------

function submitOrderInformation(event) {
  event.preventDefault();

  /* --------------------------------------- at this point the customer form should be hidden from the user? There should be a return button! */
  // resets the form
  // clearOrderForm();

  // list for all products linked to the order
  const Order_Lines = [];

  const form = event.target;

  // customer information
  const id = customer_ID;
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const email = emailValue;
  const adress = form.adress.value;
  const zipCode = form.zipCode.value;
  const city = form.city.value;
  // delivery information
  const deliveryAdress = form.deliveryAdress.value;
  const deliveryZipCode = form.deliveryZipCode.value;
  const deliveryCity = form.deliveryCity.value;

  console.log(shoppingCart);
  for (const product of shoppingCart) {
    const newOrderLine = {
      catalogue_ID: product.catalogue_ID,
      amount: product.amount,
      productSize: product.productSize,
      itemPrice: Number(product.itemPrice),
      itemTax: Number(product.itemTax),
      stock_ID: product.stock_ID,
    };
    Order_Lines.push(newOrderLine);

    // I need the bundel versions as well - including the bundled tax. I need to show the end cusomer both? Or just be able to calculate them - when ever???
    console.log("the order line is: ", newOrderLine);
    // const totalPrice = Number(product.bundlePrice);
    // calcualteTotalOrderPrice(totalPrice);
    // const totalTax = Number(product.bundleTax);
    // calcualteTotalOrderTax(totalTax);
  }

  //--- the object is with a capital
  const CustomerInfo = {
    id,
    firstName,
    lastName,
    adress,
    zipCode,
    city,
    email,
  };

  // consitant typo all the way to the back-end

  const totals = calculateTotalPrice();

  const OdrderInfo = {
    status: "ordered",
    deliveryAdress,
    deliveryZipCode,
    deliveryCity,
    totalPrice: Number(totals.totalPrice) + shippingCosts,
    totalTax: Number(totals.totalTax),
    shippingPrice: shippingCosts,
  };

  const order = {
    CustomerInfo,
    OdrderInfo,
    Order_Lines,
  };

  // sets the price to be payed
  displayedTotalPrice = OdrderInfo.totalPrice + shippingCosts;
  processCompleteOrder(order);
}

// function checkIfOrderInformationIsValid() {
//   if (emailValdiated === true) {
//     return true;
//   } else {
//     return false;
//   }
// }

function processCompleteOrder(order) {
  console.log("The complete order is: ", order);
  if (customerIsNew === true) {
    newCustomerOrder(order);
  } else {
    exsitingCustomerOrder(order);
  }
}

async function exsitingCustomerOrder(data) {
  console.log(
    "existing customer needs to be updated, then the order needs to be posted"
  );

  const customerId = data.CustomerInfo.id;
  console.log("customer id is: ", customerId);
  console.log(data);

  const putResponse = await putExistingCustomer(data);
  if (putResponse.ok) {
    const postResponse = await postOrderCustomerIsExisting(data);
    if (!postResponse.ok) {
      console.log(
        "ERROR - Could not post order. Response: ",
        postResponse.status
      );
    } else {
      showPaymentScreen();
    }
  } else {
    console.log(
      "ERROR - Could not update customer infromation. Response: ",
      putResponse.status
    );
  }
}

async function newCustomerOrder(newCustomerData) {
  console.log("new order will now be posed");

  const postOrderResponse = await postOrderCustomerIsNew(newCustomerData);
  if (postOrderResponse.ok) {
    showPaymentScreen();
  }
}

export { launchOrderSite, disableCustomerOrderInput, displayedTotalPrice };
