const endpoint = "https://3dprintservice.azurewebsites.net/";

// the fetch route for cutsomer by email
import { fetchCustomerEmailData } from "../frontpage-model/fetch-data.js";
// the shopping cart!
import { shoppingCart } from "./product-customization-site/shopping-cart.js";
// ...
// import { postCompleteOrder } from "../frontpage-model/rest-api/make-order.js";

import { clearShoppingCartHTML } from "./product-customization-site/shopping-cart.js";

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
    id: 2,
    firstName: "Mikkel",
    lastName: "Mikkelsen",
    adress: "Bådhavnsvej 3",
    zipCode: 3390,
    city: "Hundested",
    email: "LL431@gmail.com",
  },
  OdrderInfo: {
    status: "ordered",
    deliveryAdress: "Bådhavnsvej 3",
    deliveryZipCode: 3390,
    deliveryCity: "Hundested",
    totalTax: 260.0,
    totalPrice: 640.0,
    shippingPrice: 40.0,
  },
  Order_Lines: [
    {
      catalogue_ID: 1,
      amount: 3,
      productSize: 2,
      itemPrice: 400.0,
      itemTax: 45.0,
      stock_ID: 3,
    },
    {
      catalogue_ID: 12,
      amount: 1,
      productSize: 10,
      itemPrice: 100.0,
      itemTax: 22.0,
      stock_ID: 12,
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
let totalPriceToPay;

// function selectCustomerTypeRouter() {
//   document.querySelector("#choose_customer_type").classList.add("hidden");
// }

function showFindExistingCustomerSearchbar() {
  document
    .querySelector("#search_existing_customer_by_email")
    .classList.remove("hidden");
}

function hideFindExistingCustomerSearchbar() {
  document
    .querySelector("#search_existing_customer_by_email")
    .classList.add("hidden");
}

let customerEmialList;

async function testOrderSite() {
  console.log("testing-the-order-site!");
  setOrderSiteEventListeners();
  // remove the shoppingcart list
  customerEmialList = await fetchCustomerEmailData();
  console.log("all emails: ", customerEmialList);
  clearShoppingCartHTML();
  searchForExistingCustomerInfo();
  orderInformation();
}

function setOrderSiteEventListeners() {
  document
    .querySelector("#btn_is_new_customer")
    .addEventListener("click", newCustomerButtonClicked);
  document
    .querySelector("#btn_is_existing_customer")
    .addEventListener("click", exsitingCustomerButtonClicked);
}

function exsitingCustomerButtonClicked() {
  showFindExistingCustomerSearchbar();
  customerIsNew = false;
}

function newCustomerButtonClicked() {
  hideFindExistingCustomerSearchbar();
  customerIsNew = true;
}

function searchForExistingCustomerInfo() {
  document
    .querySelector("#retriveCustomerByEmail")
    .addEventListener("submit", findCustomerByEmail);
}

async function findCustomerByEmail(event) {
  event.preventDefault();
  const input = event.target.email.value;
  console.log("input email is: ", input);

  // DUMMY CODE finds the email in question
  let match = false;
  for (const customer of customerEmialList) {
    console.log(`input: ${input} === email: ${customer.Email}`);
    if (input == customer.Email) {
      // match = true;
      console.log("macth found");
      const customerData = await retrieveCustomerInformation(input);
      console.log("customer by email data: ", customerData);
      autofillCustomerInformation(customerData);
    }
  }
}

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

function autofillCustomerInformation(retrievedCustomer) {
  const customer = retrievedCustomer[0];
  console.log("Here is the customer: ", customer);
  // here we need to set the information in the customer automatically based on the retrived customer
  const form = document.querySelector("#order_details_form");
  // DISSE VÆRDIER FRA CUSTOMER BLIVER MED STORT FORBOGSTAV NÅR VI FETCHER FRA DATABASEN!
  customer_ID = customer.Id;
  form.firstName.value = customer.FirstName;
  form.lastName.value = customer.LastName;
  form.adress.value = customer.Adress;
  form.zipCode.value = customer.ZipCode;
  form.city.value = customer.City;
  form.email.value = customer.Email;
  form.deliveryAdress.value = customer.Adress;
  form.deliveryZipCode.value = customer.ZipCode;
  form.deliveryCity.value = customer.City;
}

function orderInformation() {
  document
    .querySelector("#order_details_form")
    .addEventListener("submit", test);
}

// all
let accumulatedItemTax = 0.0;
let accumulatedItemPrices = 0.0;

function test(event) {
  event.preventDefault();
  console.log("test!");

  const form = event.target;

  // new customer information
  const id = customer_ID;
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const adress = form.adress.value;
  const zipCode = form.zipCode.value;
  const city = form.city.value;
  // order information
  // delivery adress
  const deliveryAdress = form.deliveryAdress.value;
  const deliveryZipCode = form.deliveryZipCode.value;
  const deliveryCity = form.deliveryCity.value;

  // list for all products linked to the order
  const Order_Lines = [];

  console.log(shoppingCart);
  for (const product of shoppingCart) {
    console.log(product);
    const newOrderLine = {
      catalogue_ID: product.catalogue_ID,
      amount: product.amount,
      productSize: product.productSize,
      itemPrice: product.itemPrice,
      itemTax: product.itemTax,
      stock_ID: product.stock_ID,
    };
    Order_Lines.push(newOrderLine);

    // I need the bundel versions as well - including the bundled tax. I need to show the end cusomer both? Or just be able to calculate them - when ever???
    console.log("the order line is: ", newOrderLine);
    calcualteTotalOrderPrice(Number(product.bundlePrice));
    calcualteTotalOrderTax(Number(product.bundleTax));
  }

  //--- the object is with a capital
  const CustomerInfo = {
    id,
    firstName,
    lastName,
    adress,
    zipCode,
    city,
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
    stauts: "ordered",
    deliveryAdress,
    deliveryZipCode,
    deliveryCity,
    totalTax: accumulatedItemTax,
    totalPrice: accumulatedItemPrices,
    // skal indlæses fra databasen
    shippingPrice: 40.0,
  };

  const order = {
    CustomerInfo,
    OdrderInfo,
    Order_Lines,
  };

  // sets the price to be payed
  totalPriceToPay = OdrderInfo.totalPrice;

  processCompleteOrder(order);
}

function processCompleteOrder(order) {
  console.log("The complete order is: ", order);
  if (customerIsNew === true) {
    newCustomerOrder(order);
  } else {
    exsitingCustomerOrder(order);
  }
}

async function newCustomerOrder(data) {
  console.log(
    "new customer needs to be posted, then the order needs to be posted"
  );

  // try {
  //   const response = await fetch(`${endpoint}makeOrder`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Add any additional headers if needed
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   console.log(response);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   } else {
  //     const result = await response.json();
  //     console.log(result);
  //   }

  //   return;
  // } catch (error) {
  //   // Handle errors here
  //   console.error("Error:", error);
  // }
  showPaymentScreen();
}

async function exsitingCustomerOrder(data) {
  console.log(
    "existing customer needs to be updated, then the order needs to be posted"
  );
  // try {
  //   const response = await fetch(`${endpoint}makeOrder`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Add any additional headers if needed
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   console.log(response);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   } else {
  //     const result = await response.json();
  //     console.log(result);
  //   }

  //   return;
  // } catch (error) {
  //   // Handle errors here
  //   console.error("Error:", error);
  // }
  showPaymentScreen();
}

function showPaymentScreen() {
  console.log("you have completed the order process and must now pay!");
  document.querySelector("#payment_details_screen").innerHTML = "";
  const number = fecthMobilePaymenyNo();
  const messageHTML =
    /*html*/
    `
  <p> Din ordre er nu booket! For at færdiggøre din bestilling skal du overføre ${totalPriceToPay} DKK, til 3dprintservice mobilepay på nummeret: ${number}</p>
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

// const data = {
//   CustomerInfo: {
//     firstName: "Kasper",
//     lastName: "Bordal",
//     adress: "Kildebakken 23",
//     zipCode: 3390,
//     city: "Hundested",
//     email: "LL431@gmail.com",
//   },
//   OdrderInfo: {
//     status: "ordered",
//     deliveryAdress: "Kildebakken 23",
//     deliveryZipCode: 3390,
//     deliveryCity: "Hundested",
//     totalTax: 260.0,
//     totalPrice: 640.0,
//     shippingPrice: 40.0,
//   },
//   Order_Lines: [
//     {
//       catalogue_ID: 1,
//       amount: 3,
//       productSize: 2,
//       itemPrice: 400.0,
//       itemTax: 45.0,
//       stock_ID: 3,
//     },
//     {
//       catalogue_ID: 12,
//       amount: 1,
//       productSize: 10,
//       itemPrice: 100.0,
//       itemTax: 22.0,
//       stock_ID: 12,
//     },
//   ],
// };

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
