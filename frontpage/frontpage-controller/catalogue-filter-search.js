import { getCatalogueData } from "../frontpage-model/fetch-data.js";
import { showCatalougeToCustomers } from "./main.js";

// This file handles the filter and search on the product catalogue page

// The filter and search variables used with the filter and search on the product catalogue page
let filterValue = "all";
let searchValue = "";

// Sets the filter term from the product catalogue  page filter input into the filter variable
async function filterContent(event) {
  filterValue = event.target.value;
  console.log(`filterValue: ${filterValue}`);
  const catalougeItemObjects = await getCatalogueData();
  showCatalougeToCustomers(catalougeItemObjects);
}

// Sets the search term from the product catalogue page search input into the search variable
async function searchContent() {
  searchValue = document.querySelector("#search").value;
  const catalougeItemObjects = await getCatalogueData();
  showCatalougeToCustomers(catalougeItemObjects);
  console.log(searchValue);
  searchValue = "";
  document.querySelector("#search").value = "";
}

export { filterContent, searchContent, filterValue, searchValue };
