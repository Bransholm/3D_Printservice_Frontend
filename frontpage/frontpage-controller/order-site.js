const endpoint = "https://3dprintservice.azurewebsites.net/";

// the fetch route for cutsomer by email
import { fetchCustomerEmailData } from "../frontpage-model/fetch-data.js";
// the shopping cart!
import { shoppingCart } from "./product-customization-site/shopping-cart.js";
// ...
// import { postCompleteOrder } from "../frontpage-model/rest-api/make-order.js";

import { clearShoppingCartHTML } from "./product-customization-site/shopping-cart.js";

const shippingCosts = 39.5;

const testEmails = [
  "mikkelHansen@gmail.com",
  "lineKM@live.dk",
  "ulrik@hotmail.se",
];

const testCustomers = [
  {
    id: 1,
    firstName: "Mikkel",
    lastName: "Mikkelsen",
    adress: "Blåvej 213",
    zipCode: 3390,
    city: "Hundested",
    email: "mikkelHansen@gmail.com",
  },
  {
    id: 2,
    firstName: "Line",
    lastName: "Linesen",
    adress: "Rødgade 92",
    zipCode: 3370,
    city: "Melby",
    email: "lineKM@live.dk",
  },
  {
    id: 3,
    firstName: "Ulrik",
    lastName: "Thomsen",
    adress: "Møllevænget 41",
    zipCode: 3300,
    city: "Frederiksværk",
    email: "ulrik@hotmail.se",
  },
];

const orderExistingCustomer = {
  CustomerInfo: {
    id: undefined,
    firstName: "Gilberto jr.",
    lastName: "Gill",
    adress: "Tysklandsgade 7 4tv",
    zipCode: "2200",
    city: "KBH S",
    email: "AliMohammedAntaKazab@gmail.com",
  },
  OdrderInfo: {
    status: "ordered",
    deliveryAdress: "Rentemestervej 7",
    deliveryZipCode: "3300",
    deliveryCity: "KBH S",
    totalTax: 260.0,
    totalPrice: 640.0,
    shippingPrice: 40.0,
  },
  Order_Lines: [
    {
      catalogue_ID: 11,
      amount: 3,
      productSize: 2,
      itemPrice: 400.0,
      itemTax: 45.0,
      stock_ID: 3,
    },
    {
      catalogue_ID: 1,
      amount: 1,
      productSize: 10,
      itemPrice: 100.0,
      itemTax: 22.0,
      stock_ID: 12,
    },
  ],
};

const testDataBugFixing = {
  CustomerInfo: {
    adress: "Fankrigsgade 41",
    city: "Kbh S",
    email: "brietznitz88@cechmail.cz",
    firstName: "Lukaz",
    id: undefined,
    lastName: "Pachovski",
    zipCode: 2200,
  },
  OdrderInfo: {
    deliveryAdress: "Fankrigsgade 41",
    deliveryCity: "Kbh S",
    deliveryZipCode: 2200,
    shippingPrice: 40.1,
    stauts: "ordered",
    totalPrice: 15.3,
    totalTax: 3.05,
  },
  Order_Lines: [
    {
      amount: 5,
      catalogue_ID: 1,
      itemPrice: 3.06,
      itemTax: 0.61,
      productSize: 8,
      stock_ID: 1,
    },
  ],
};

let customer_ID;

// CHECK IF EMAIL IS USED - WHEN UPDATING OR CREATING!
// SEND INFO DEPENDING ON ITS NEW OR EXISTING CUSTOMER
// SHOW THE PAYMENT PAGE - FETCH THE PHONE NO.
// HAVE AN UPDATE BUTTON FOR ORDERS ON ADMIN
// FIX STOCK UPDTE ON ADMIN...

// set if the customer confirms theat they are in the database already
let customerIsNew = true;
let displayedTotalPrice;
// let validationComplete = false;
let emailValdiated = false;

// list that stores all emails
let customerEmialList;

// ----------- functions that controls the chek out flow -------------------------------------

// disables the order-form input
function disableCustomerOrderInput() {
  // document.querySelector("#insert_orderinfo").prop("disabled", true);
  document.querySelector("#first_name_input").disabled = true;
  document.querySelector("#last_name_input").disabled = true;
  document.querySelector("#email_input").disabled = true;
  document.querySelector("#adress_input").disabled = true;
  document.querySelector("#zip_code_input").disabled = true;
  document.querySelector("#city_input").disabled = true;
  document.querySelector("#delivery_adress_input").disabled = true;
  document.querySelector("#delivery_zip_code_input").disabled = true;
  document.querySelector("#delivery_city_input").disabled = true;
  document.querySelector("#accept_payment_details_checkbox").disabled = true;
}

// enables the oder-form input
function enableCustomerOrderInput() {
  document.querySelector("#first_name_input").disabled = false;
  document.querySelector("#last_name_input").disabled = false;
  document.querySelector("#email_input").disabled = false;
  document.querySelector("#adress_input").disabled = false;
  document.querySelector("#zip_code_input").disabled = false;
  document.querySelector("#city_input").disabled = false;
  document.querySelector("#delivery_adress_input").disabled = false;
  document.querySelector("#delivery_zip_code_input").disabled = false;
  document.querySelector("#delivery_city_input").disabled = false;
  document.querySelector("#accept_payment_details_checkbox").disabled = false;
}

function showFindExistingCustomerSearchbar() {
  document
    .querySelector("#search_existing_customer_by_email")
    .classList.remove("hidden");

  // her skal vi deaktivere input
  disableCustomerOrderInput();
}

function hideFindExistingCustomerSearchbar() {
  document
    .querySelector("#search_existing_customer_by_email")
    .classList.add("hidden");

  // her skal vi så aktivere input feltet
  enableCustomerOrderInput();
}

async function testOrderSite() {
  console.log("testing-the-order-site!");
  // activates the eventlisteners for the checkout-flow
  setOrderSiteEventListeners();
  // disables the input-fields
  disableCustomerOrderInput();
  // fetches all customer emails
  customerEmialList = await fetchCustomerEmailData();
  console.log("all emails: ", customerEmialList);
  // removes the displayed shopping cart
  clearShoppingCartHTML();

  resetChekOutSite();
}

function setOrderSiteEventListeners() {
  // activates the new-customer and existing-customer buttons
  document
    .querySelector("#btn_is_new_customer")
    .addEventListener("click", newCustomerButtonClicked);
  document
    .querySelector("#btn_is_existing_customer")
    .addEventListener("click", exsitingCustomerButtonClicked);

  // adds the order information submit event
  document
    .querySelector("#order_details_form")
    .addEventListener("submit", submitOrderInformation);

  // activates the find customer by email sbumit event
  document
    .querySelector("#retrive_customer_by_email")
    .addEventListener("submit", findCustomerByEmail);
}

function resetChekOutSite() {
  newCustomerButtonClicked();
}

function toggleFindCustomerSearchbar() {
  if (customerIsNew === true) {
    hideFindExistingCustomerSearchbar();
    newCustomerBtnIsActive();
  } else {
    showFindExistingCustomerSearchbar();
    existingCustomerBtnIsActive();
  }
}

function removeCustomerBtnClasses() {
  document
    .querySelector("#btn_is_new_customer")
    .classList.remove("btn-selected");
  document
    .querySelector("#btn_is_new_customer")
    .classList.remove("btn-deselected");
  document
    .querySelector("#btn_is_existing_customer")
    .classList.remove("btn-selected");
  document
    .querySelector("#btn_is_existing_customer")
    .classList.remove("btn-deselected");
}

function newCustomerBtnIsActive() {
  removeCustomerBtnClasses();
  document.querySelector("#btn_is_new_customer").classList.add("btn-selected");
  document
    .querySelector("#btn_is_existing_customer")
    .classList.add("btn-deselected");
}

function existingCustomerBtnIsActive() {
  removeCustomerBtnClasses();

  document
    .querySelector("#btn_is_new_customer")
    .classList.add("btn-deselected");
  document
    .querySelector("#btn_is_existing_customer")
    .classList.add("btn-selected");
}

function exsitingCustomerButtonClicked() {
  customerIsNew = false;
  toggleFindCustomerSearchbar();
}

function newCustomerButtonClicked() {
  customerIsNew = true;
  toggleFindCustomerSearchbar();
}

// --------------------------------------------------------------------------------------------------------------

async function findCustomerByEmail(event) {
  event.preventDefault();
  const input = event.target.existing_email.value;
  console.log("input email is: ", input);

  findCustomerByEmailErrorMessageReset();
  // set all the input-fields to blank
  // clearOrderForm();
  // DUMMY CODE finds the email in question
  let match = false;
  for (const customer of customerEmialList) {
    // console.log(`input: ${input} === email: ${customer.Email}`);
    if (input == customer.Email) {
      match = true;
      console.log("macth found");
      const customerData = await retrieveCustomerInformation(input);
      console.log("customer by email data: ", customerData);
      autofillCustomerInformation(customerData);
      // activates the order form input
      enableCustomerOrderInput();
    }
  }
  if (match === false) {
    console.log("No match");
    findCustomerByEmailErrorMessage();
  }
}

function findCustomerByEmailErrorMessageReset() {
  document.querySelector(
    "#search_existing_customer_by_email_error_message"
  ).innerHTML = " ";
}

function findCustomerByEmailErrorMessage() {
  document.querySelector(
    "#search_existing_customer_by_email_error_message"
  ).innerHTML = "<p> Denne email kunne ikke findes i systemet. </p>";
}

// search_existing_customer_by_email_error_message

async function retrieveCustomerInformation(customerEmail) {
  console.log("retrieveCustomerInformation");
  const promise = await fetch(`${endpoint}/customers/${customerEmail}`);
  const data = await promise.json();
  return data;

  // for (const customer of testCustomers) {
  //   if (customer.email === customerEmail) {
  //     return customer;
  //   }
  // }
}

// set all the text inputs to blank
function clearOrderForm() {
  const form = document.querySelector("#order_details_form");

  form.firstName.value = " ";
  form.lastName.value = " ";
  form.adress.value = " ";
  form.zipCode.value = " ";
  form.city.value = " ";
  form.customer_email.value = " ";
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
  form.customer_email.value = customer.Email;
  form.deliveryAdress.value = customer.Adress;
  form.deliveryZipCode.value = customer.ZipCode;
  form.deliveryCity.value = customer.City;
}

// all
let accumulatedItemTax = 0.0;
let accumulatedItemPrices = 0.0;

// -------------------------------------------- Email validation --------------------------------------------------

function validateCustomerEmail(emailInput) {
  console.log("check customer email: ", emailInput);
  if (customerIsNew === true) {
    const emailIsUnique = customerEmialList.forEach(checkIfEmailIsUnique);
    if (emailIsUnique != true) {
      console.log("ERROR - email is already in system!");
      emailValdiated = false;
    } else {
      emailValdiated = true;
    }
  } else if (customerIsNew === false) {
    emailValdiated = true;
  }

  function checkIfEmailIsUnique(emailListElement) {
    console.log("for each: ", emailListElement.Email, " === ", emailInput);
    if (emailListElement.Email === emailInput) {
      return true;
    }
  }
  return emailInput;
}

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
  const email = form.customer_email.value;
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
    const totalPrice = Number(product.bundlePrice);
    calcualteTotalOrderPrice(totalPrice);
    const totalTax = Number(product.bundleTax);
    calcualteTotalOrderTax(totalTax);
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

  function calcualteTotalOrderPrice(bundlePrice) {
    accumulatedItemPrices += bundlePrice;
    console.log("the calculated price: ", accumulatedItemPrices);
  }

  function calcualteTotalOrderTax(bundleTax) {
    accumulatedItemTax += bundleTax;
    console.log("calcualted tax: ", accumulatedItemTax);
  }

  // consitant typo all the way to the back-end

  const OdrderInfo = {
    status: "ordered",
    deliveryAdress,
    deliveryZipCode,
    deliveryCity,
    totalTax: Number(accumulatedItemTax),
    totalPrice: Number(accumulatedItemPrices),
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
//   const allOrderInformationIsValid = checkIfOrderInformationIsValid();
//   if (allOrderInformationIsValid === true) {
//     processCompleteOrder(order);
//   } else {
//     console.log("An error occured!");
//   }
// }

function checkIfOrderInformationIsValid() {
  if (emailValdiated === true) {
    return true;
  } else {
    return false;
  }
}

function processCompleteOrder(order) {
  console.log("The complete order is: ", order);
  if (customerIsNew === true) {
    newCustomerOrder(order);
  } else {
    exsitingCustomerOrder(order);
  }
}

async function newCustomerOrder(newCustomerData) {
  console.log("new order will now be posed");

  const postOrderResponse = await postOrderCustomerIsNew(newCustomerData);
  if (postOrderResponse.ok) {
    showPaymentScreen();
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

  async function putExistingCustomer(data) {
    try {
      const response = await fetch(
        `${endpoint}customers/${data.CustomerInfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: JSON.stringify(data.CustomerInfo),
        }
      );

      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const result = await response.json();
        console.log(result);
      }

      return response;
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
      throw error;
    }
  }

  async function postOrderCustomerIsExisting(existingCustomerData) {
    try {
      const response = await fetch(`${endpoint}makeOrderExistingCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(existingCustomerData),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const result = await response.json();
        console.log(result);
      }

      return response;
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
      throw error;
    }
  }
}

// rest api - adds a new customer, order and orderlines to the database.
async function postOrderCustomerIsNew(newCustomerData) {
  try {
    const response = await fetch(`${endpoint}makeOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(newCustomerData),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const result = await response.json();
      console.log(result);
    }

    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    throw error;
  }
}

function showPaymentScreen() {
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

// function createNewCustomter() {
//   //...
// }

// function insertHtmlDom() {
//   // Event listeners!
// }

// function toggleHiddenOnForms() {
//   // add class
// }

// // local host endpoint for testing...
// const endpoint = "http://localhost:4811/";

// class orderInfo {
//   constructor() {
//     this.customer_ID;
//     this.status;
//     this.deliveryAdress;
//     this.deliveryZipCode;
//     this.deliveryCity;
//     this.totalTax;
//     this.totalPrice;
//     this.shippingPrice;
//     // SHOPPING CART
//   }
// }

// class customerInfor {
//   constructor() {
//     this.firstName;
//     this.lastName;
//     this.adress;
//     this.city;
//     this.zipCode;
//     this.email;
//   }
// }

// function getOrderInput(event) {
//   const orderForm = event.target.value;
//   /*
//     this.customer_ID;
//     this.status;
//     this.deliveryAdress;
//     this.deliveryZipCode;
//     this.deliveryCity;
//     this.totalTax;
//     this.totalPrice;
//     this.shippingPrice;
//   */
//   const deliveryAdress = orderForm.deliveryAdress.value;
//   const deliveryZipCode = orderForm.deliveryZipCode.value;
//   const deliveryCity = orderForm.deliveryCity.value;
// }

export { testOrderSite };
