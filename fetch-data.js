import { filterValue, searchValue, } from "./catalogue-filter-search.js";

const endpoint = "https://3dprintservice.azurewebsites.net/";

// Kenneths get
async function getCatalogueData() {
  const response = await fetch(`${endpoint}/catalogue?filter=${filterValue}&search=${searchValue}`);
  const catalogueData = await response.json();
  return catalogueData;
}





//127.0.0.1:4811/Catalogue?filter=${filterValue}&search=${searchValue}

// ${endpoint}/search ?filter=${filterValue}Name&q=${searchValue}

// Lukases get
// async function getCatalogueData() {
//   const response = await fetch(`${endpoint}/catalogue`);
//   const catalogueData = await response.json();
//   return catalogueData;
// }


// async function fetchSearchContent(filterValue, searchValue) {
// 	const response = await fetch(
// 		`${endpoint}/search?type=${filterValue}Name&q=${searchValue}`
// 	);
// 	const data = await response.json();
// 	return data;
// }

async function getStockData() {
  const response = await fetch(`${endpoint}/stock`);
  const stockData = await response.json();
  return stockData;
}

async function getAvailableStockData(){
  const response = await fetch(`${endpoint}/availableStock`);
  const stockData = await response.json();
  return stockData;
}

async function getCatalougeItemById(id) {
  const response = await fetch(`${endpoint}/catalogue/${id}`);
  const stockData = await response.json();
  return stockData;
}

async function getStockItemById(id) {
  const response = await fetch(`${endpoint}/stock/${id}`);
  const catalogueData = await response.json();
  return catalogueData;
}


export {
  getCatalogueData,
  getStockData,
  getAvailableStockData,
  getCatalougeItemById,
  getStockItemById
};
