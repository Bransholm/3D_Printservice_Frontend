import {
  filterValue,
  searchValue,
} from "../frontpage-controller/catalogue-filter-search.js";

import {
  emailValue,
  nameValue,
} from "../frontpage-controller/find-order-site.js";

const endpoint = "https://3dprintservice.azurewebsites.net/";

async function fetchOrdersData() {
  const response = await fetch(`${endpoint}/viewOrdrer?ordrer=${nameValue}&email=${emailValue}`);
  const viewOrderData = await response.json();
  return viewOrderData;
}

async function retrieveCustomerInformation(customerEmail) {
  console.log("retrieveCustomerInformation");
  const promise = await fetch(`${endpoint}/customers/${customerEmail}`);
  const data = await promise.json();
  return data;
}

async function fetchSystemVariables() {
  const response = await fetch(`${endpoint}/variables`);
  const variableData = await response.json();
  return variableData;
}

async function fetchCustomerByEmail(input) {
  const response = await fetch(`${endpoint}/customer?email=${input}`);
  const customerData = await response.json();
  return customerData;
}

async function fetchCustomerEmailData() {
  const response = await fetch(`${endpoint}/customers`);
  const emailData = await response.json();
  return emailData;
}

// fetching catalogue data
async function getCatalogueData() {
  const response = await fetch(
    `${endpoint}/catalogue?filter=${filterValue}&search=${searchValue}`
  );
  const catalogueData = await response.json();
  return catalogueData;
}

// Fetching stock data
async function getStockData() {
  const response = await fetch(`${endpoint}/stock`);
  const stockData = await response.json();
  return stockData;
}

// fetching avaible stock data
async function getAvailableStockData() {
  const response = await fetch(`${endpoint}/availableStock`);
  const stockData = await response.json();
  return stockData;
}

// fetching catalogue items by id
async function getCatalougeItemById(id) {
  const response = await fetch(`${endpoint}/catalogue/${id}`);
  const stockData = await response.json();
  return stockData;
}

// fetching stock items by id
async function getStockItemById(id) {
  const response = await fetch(`${endpoint}/stock/${id}`);
  const catalogueData = await response.json();
  return catalogueData;
}

export {
  fetchOrdersData,
  fetchSystemVariables,
  getCatalogueData,
  getStockData,
  getAvailableStockData,
  getCatalougeItemById,
  getStockItemById,
  fetchCustomerByEmail,
  fetchCustomerEmailData,
  retrieveCustomerInformation,
};
