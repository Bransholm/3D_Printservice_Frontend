const endpoint = "https://3dprintservice.azurewebsites.net/";

// fetching catalogue data
async function getCatalogueData() {
  console.log("get data to admin");
  const response = await fetch(
    `${endpoint}/catalogue`);
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

export { getCatalogueData, getStockData, getAvailableStockData };