import { fetchOrdersData } from "../frontpage-model/fetch-data.js";
import { displayOrderInformation } from "../frontpage-view/display-existing-orders.js";

let nameValue;
let emailValue;

async function findExistingOrder(event) {
  event.preventDefault();
  console.log("find the existing customer");

  const form = document.querySelector("#view-order-form");
  nameValue = form.ordernumber.value;
  emailValue = form.email.value;
  console.log(nameValue, emailValue);

  const ordersData = await fetchOrdersData();
  if (ordersData.length === 0) {
    console.log("Error there was no match!");
  } else {
    reorganizeOrderInformation(ordersData);
  }
  console.log("all orders: ", ordersData);
}


function reorganizeOrderInformation(orderData) {
  const customerDetails = retrieveCustomerDetails(orderData[0]);
  const orderDetails = retrieveOrderDetails(orderData[0]);
  const order_lines = [];

  for (let i = 0; orderData.length > i; i++) {
    const colour = orderData[i].stock_Colour;
    const material = orderData[i].stock_Material;
    const name = orderData[i].stock_Name;
    const title = orderData[i].catalogue_Title;
    const amount = orderData[i].order_lines_Amount;
    const price = orderData[i].order_lines_ItemPrice;
    const tax = orderData[i].order_lines_ItemTax;
    const size = orderData[i].order_lines_ProductSize;

    const order_line = {
      colour,
      material,
      name,
      title,
      amount,
      price,
      tax,
      size,
    };

    order_lines.push(order_line);
  }

  const orderInformation = {
    customerDetails,
    orderDetails,
    order_lines,
  };

  displayOrderInformation(orderInformation);
}

function retrieveCustomerDetails(orderData) {
  const firstName = orderData.customers_FirstName;
  const lastName = orderData.customers_LastName;
  const adress = orderData.customers_Adress;
  const zipCode = orderData.customers_ZipCode;
  const city = orderData.customers_City;
  const customerNo = orderData.orders_customer_ID;

  return {
    firstName,
    lastName,
    adress,
    zipCode,
    city,
    customerNo,
  };
}

function retrieveOrderDetails(orderData) {
  const deliveryAdress = orderData.orders_DeliveryAdress;
  const deliveryZipCode = orderData.orders_DeliveryZipCode;
  const deliveryCity = orderData.orders_DeliveryCity;
  const timeDate = orderData.orders_TimeDate;
  const status = orderData.orders_Status;
  const totalPrice = orderData.orders_TotalPrice;
  const totalTax = orderData.orders_TotalTax;
  const shippingPrice = orderData.orders_ShippingPrice;
  const orderNo = orderData.order_lines_Orders_ID;

  return {
    deliveryAdress,
    deliveryZipCode,
    deliveryCity,
    timeDate,
    status,
    totalPrice,
    totalTax,
    shippingPrice,
  };
}


export { nameValue, emailValue, findExistingOrder };
