import {
  filterValue,
  searchValue,
} from "../frontpage-controller/catalogue-filter-search.js";

const endpoint = "https://3dprintservice.azurewebsites.net/";

const localEndpoint = "http://localhost:4811/";

async function fetchSystemVariables() {
  const response = await fetch(`${localEndpoint}/variables`);
  const variableData = await response.json();
  return variableData;
}

async function fetchCustomerByEmail(input) {
  const response = await fetch(`${localEndpoint}/customer?email=${input}`);
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
  fetchSystemVariables,
  getCatalogueData,
  getStockData,
  getAvailableStockData,
  getCatalougeItemById,
  getStockItemById,
  fetchCustomerByEmail,
  fetchCustomerEmailData,
};
