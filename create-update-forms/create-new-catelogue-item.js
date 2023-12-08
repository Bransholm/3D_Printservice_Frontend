// import { stringify } from "querystring";
const endpoint = "https://3dprintservice.azurewebsites.net/";

// This function creates a new catalogue item - is only accessible for the admin.
function createNewCatalogueItem(event) {
  console.log("Item created");
  // Er det nu .target.value?
  const catelogueForm = event.target;

  const title = catelogueForm.title.value;
  const standardSize = Number(catelogueForm.size.value);
  const standardWeight = Number(catelogueForm.weight.value);
  const itemDescription = catelogueForm.description.value;
  const imageLink = catelogueForm.image.value;
  const category = catelogueForm.category.value;

  event.preventDefault();

  const catalogueItem = createCatelogueItemProduct(
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    category
  );
  event.preventDefault();

  postCatelogueItem(catalogueItem);
}

// ...rest API?
//hvordan fanger jeg en post route...
// async function putCatelogueItem(resquest) {
//   console.log("put item: ", resquest);
//   // if (!result) {
//   //   console.log("No result  ", result);
//   // }
//   const response = await fetch(`${endpoint}catalogue/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     // body: JSON.stringify({ parcel: input.value }),
//     body: JSON.stringify({ resquest }),
//   });

//   const stockData = await response.json();
//   console.log(stockData);

//   // (result) => {
//   //   cosnsole.log(stockData);
//   // };
//   // return stockData;
// }

async function postCatelogueItem(data) {
  console.log("POSTING: ", data);
  try {
    const response = await fetch(`${endpoint}catalogue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      result = response.ok;
      console.log(result);
    }

    // const result = await response.json();
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
}

function createCatelogueItemProduct(
  title,
  standardSize,
  standardWeight,
  itemDescription,
  imageLink,
  category
) {
  return {
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    category,
  };
}

export { createNewCatalogueItem };
