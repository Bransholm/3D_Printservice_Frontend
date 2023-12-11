import { getCatalogueData } from "./fetch-data.js";
import { showCatalougeToCustomers } from "./main.js";

// This file handles the filter and search on the product catalogue page

// The filter and search variables used with the filter and search on the product catalogue page
let filterValue = "all";
let searchValue = "";

// Sets the filter term from the product catalogue  page filter input into the filter variable
async function filterContent(event) {
  const value = event.target.value;
  if (value === "Bygninger") {
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "Bygninger";
    console.log(filterValue);
  } else if (value === "Dyr") {
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "Dyr";
    console.log(filterValue);
  } else if (value === "Eventyr") {
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "Eventyr";
    console.log(filterValue);
  } else if (value === "Sci-fi") {
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "Sci-fi";
    console.log(filterValue);
  } else if (value === "all") {
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    filterValue = "all";
    console.log(filterValue);
  }
}

// Sets the search term from the product catalogue page search input into the search variable
async function searchContent() {
  searchValue = document.querySelector("#search").value;
  const catalougeItemObjects = await getCatalogueData();
  showCatalougeToCustomers(catalougeItemObjects);
  console.log(searchValue);
}

export {
    filterContent,
    searchContent,
    filterValue,
    searchValue,
};
