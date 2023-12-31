// import { stringify } from "querystring";
const endpoint = "http://localhost:4811/";
import { postCatelogueItem } from "../../admin-model/backend-routes/catalouge-routes/catalogue-post.js";

// This function creates a new catalogue item - is only accessible for the admin.
function createNewCatalogueItem(event) {
  // Er det nu .target.value?
  const catelogueForm = event.target;

  // WHERE IS THE ID in all of this???
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

// async function postCatelogueItem(data) {
//   console.log("POSTING: ", data);
//   try {
//     const response = await fetch(`${endpoint}catalogue`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Add any additional headers if needed
//       },
//       body: JSON.stringify(data),
//     });

//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     } else {
//       const result = await response.json();
//       console.log(result);
//     }

//     return;
//   } catch (error) {
//     // Handle errors here
//     console.error("Error:", error);
//   }
// }

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
