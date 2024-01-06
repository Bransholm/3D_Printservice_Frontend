// the fetch route for cutsomer by email
import {
  fetchCustomerByEmail,
  fetchCustomerEmailData,
} from "../frontpage-model/fetch-data.js";
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

function testOrderSite() {
  console.log("testing-the-order-site!");
  setOrderSiteEventListeners();
  // remove the shoppingcart list
  // const customerEmialList = await fetchCustomerEmailData();
  // console.log("all emails: ", customerEmialList);
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
  for (const email of testEmails) {
    if (input === email) {
      match = true;
      const customer = retrieveCustomerInformation(email);
      autofillCustomerInformation(customer);
    }
  }
  if ((match = true)) {
    console.log("macth found");
  } else {
    console.log("No match found");
  }
}

function retrieveCustomerInformation(customerEmail) {
  for (const customer of testCustomers) {
    if (customer.email === customerEmail) {
      return customer;
    }
  }
}

function autofillCustomerInformation(customer) {
  console.log("Here is the customer: ", customer);
  // here we need to set the information in the customer automatically based on the retrived customer
  const form = document.querySelector("#order_details_form");
  // DISSE VÆRDIER FRA CUSTOMER BLIVER MED STORT FORBOGSTAV NÅR VI FETCHER FRA DATABASEN!
  customer_ID = customer.id;
  form.firstName.value = customer.firstName;
  form.lastName.value = customer.lastName;
  form.adress.value = customer.adress;
  form.zipCode.value = customer.zipCode;
  form.city.value = customer.city;
  form.email.value = customer.email;
}

function orderInformation() {
  document
    .querySelector("#order_details_form")
    .addEventListener("submit", test);
}

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

  //--- the object is with a capital
  const CustomerInfo = {
    id,
    firstName,
    lastName,
    adress,
    zipCode,
    city,
  };

  // consitant typo all the way to the back-end
  const OdrderInfo = {
    stauts: "ordered",
    deliveryAdress,
    deliveryZipCode,
    deliveryCity,
    totalTax: 10.0,
    totalPrice: 80.0,
    shippingPrice: 40.0,
  };

  const Order_Lines = [];
  console.log(shoppingCart);
  for (const product of shoppingCart) {
    console.log(product);
    const newOrderLine = {
      catalogue_ID: product.catalogue_ID,
      amount: product.amount,
      productSize: product.productSize,
      itemPrice: 400.0,
      itemTax: 45.0,
      stock_ID: product.stock_ID,
    };
    Order_Lines.push(newOrderLine);
  }

  const order = {
    CustomerInfo,
    OdrderInfo,
    Order_Lines,
  };

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

const endpoint = "https://3dprintservice.azurewebsites.net/";

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
