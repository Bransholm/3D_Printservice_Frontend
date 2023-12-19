import { getCatalogueData } from "./fetch-data.js";
import { showCatalougeToCustomers } from "./main.js";

// This file handles the filter and search on the product catalogue page

// The filter and search variables used with the filter and search on the product catalogue page
let filterValue = "all";
let searchValue = "";

/*
 NB --- KENNETH & THOMAS: Det eneste denne funktion gør er at sætte FILTERVALUE = EVENT.TARGET.VALUE og exportere det....
  Koden:
    const catalougeItemObjects = await getCatalogueData();
    showCatalougeToCustomers(catalougeItemObjects);
  Er den samme, så den kan bare kaldes EFTER alle IF-statements-ne.
  De kan evt. få deres egen funktion - så vi kuin skal kalde 1 linje i hver if-statement....

 */


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

export {
    filterContent,
    searchContent,
    filterValue,
    searchValue,
};
