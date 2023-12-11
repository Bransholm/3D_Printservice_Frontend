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
    filterValue = "Bygninger";
    console.log(filterValue);
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    } else if (value === "Dyr") {
    filterValue = "Dyr";
    console.log(filterValue);
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    } else if (value === "Eventyr") {
    filterValue = "Eventyr";
    console.log(filterValue);
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    } else if (value === "Sci-fi") {
    filterValue = "Sci-fi";
    console.log(filterValue);
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
    } else if (value === "all") {
    filterValue = "all";
    console.log(filterValue);
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
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
