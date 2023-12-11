const endpoint = "https://3dprintservice.azurewebsites.net/";


async function getCatalogueData() {
  const response = await fetch(`${endpoint}/catalogue`);
  const catalogueData = await response.json();
  return catalogueData;
}


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


export {
	getCatalogueData,
	getStockData,
	getAvailableStockData,
};
