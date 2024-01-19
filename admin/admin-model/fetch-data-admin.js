import { endpoint } from "../../frontpage/frontpage-model/endpoint.js";
import {
  startDateValue,
  endDateValue,
} from "../admin-controller/finance-site.js";

// fetching catalogue data
async function getCatalogueData() {
  console.log("get data to admin");
  const response = await fetch(`${endpoint}/catalogue`);
  const catalogueData = await response.json();
  return catalogueData;
}

// fetching stock data
async function getStockData() {
  console.log("get data to admin");

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

async function getfinanceData() {
  const response = await fetch(
    `http://127.0.0.1:4811/finance?startDate=${startDateValue}&endDate=${endDateValue}`
  );
  console.log(
    `${endpoint}/finance?startDate=${startDateValue}&endDate=${endDateValue}`
  );
  const data = response.json();
  return data;
}

export {
  getCatalogueData,
  getStockData,
  getAvailableStockData,
  getfinanceData,
};
