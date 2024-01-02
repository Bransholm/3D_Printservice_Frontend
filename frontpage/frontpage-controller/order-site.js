// the fetch route for cutsomer by email
import { fetchCustomerByEmail } from "../frontpage-model/fetch-data.js";
// the shopping cart!
import { shoppingCart } from "./product-customization-site/shopping-cart.js";
// ...
import { postCompleteOrder } from "../frontpage-model/rest-api/make-order.js";

function testOrderSite() {
  console.log("testing-the-order-site!");
  searchForExistingCustomerInfo();
  orderInformation();
}

function searchForExistingCustomerInfo() {
  document
    .querySelector("#retriveCustomerByEmail")
    .addEventListener("submit", findCustomerByEmail);
}

async function findCustomerByEmail(event) {
  event.preventDefault();
  const input = event.target.email.value;
  console.log(input);
  const customerData = await fetchCustomerByEmail(input);
  console.log(customerData);
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
      catalogue_ID: product.catalogueId,
      amount: product.productAmount,
      productSize: product.productSize,
      itemPrice: 400.0,
      itemTax: 45.0,
      stock_ID: product.stockId,
    };
    Order_Lines.push(newOrderLine);
  }

  const order = {
    CustomerInfo,
    OdrderInfo,
    Order_Lines,
  };

  postCompleteOrder(order);
}

function createNewCustomter() {
  //...
}

function insertHtmlDom() {
  // Event listeners!
}

function toggleHiddenOnForms() {
  // add class
}

// local host endpoint for testing...
const endpoint = "http://localhost:4811/";

const data = {
  CustomerInfo: {
    firstName: "Kasper",
    lastName: "Bordal",
    adress: "Kildebakken 23",
    zipCode: 3390,
    city: "Hundested",
    email: "LL431@gmail.com",
  },
  OdrderInfo: {
    status: "ordered",
    deliveryAdress: "Kildebakken 23",
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

class orderInfo {
  constructor() {
    this.customer_ID;
    this.status;
    this.deliveryAdress;
    this.deliveryZipCode;
    this.deliveryCity;
    this.totalTax;
    this.totalPrice;
    this.shippingPrice;
    // SHOPPING CART
  }
}

class customerInfor {
  constructor() {
    this.firstName;
    this.lastName;
    this.adress;
    this.city;
    this.zipCode;
    this.email;
  }
}

function getOrderInput(event) {
  const orderForm = event.target.value;
  /*
    this.customer_ID;
    this.status;
    this.deliveryAdress;
    this.deliveryZipCode;
    this.deliveryCity;
    this.totalTax;
    this.totalPrice;
    this.shippingPrice;
  */
  const deliveryAdress = orderForm.deliveryAdress.value;
  const deliveryZipCode = orderForm.deliveryZipCode.value;
  const deliveryCity = orderForm.deliveryCity.value;
}

export { testOrderSite };
