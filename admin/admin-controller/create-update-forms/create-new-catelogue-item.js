// import { stringify } from "querystring";
const endpoint = "http://localhost:4811/";
import { postCatelogueItem } from "../../admin-model/backend-routes/catalouge-routes/catalogue-post.js";

// This function creates a new catalogue item - is only accessible for the admin.
function createNewCatalogueItem(event) {
  // Er det nu .target.value?
  const catelogueForm = event.target;

  // WHERE IS THE ID in all of this??? The id is made through the route, which gives the newly created catalogue item
  // a unique id
  const title = catelogueForm.title.value;
  const standardSize = Number(catelogueForm.size.value);
  const standardWeight = Number(catelogueForm.weight.value);
  const itemDescription = catelogueForm.description.value;
  const imageLink = catelogueForm.image.value;
  const category = catelogueForm.category.value;
  const active = Number(catalogueItem.active.vlaue);

  event.preventDefault();

  const catalogueItem = createCatelogueItemProduct(
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    category,
    active
  );
  event.preventDefault();

  postCatelogueItem(catalogueItem);
}

function createCatelogueItemProduct(
  title,
  standardSize,
  standardWeight,
  itemDescription,
  imageLink,
  category,
  active
) {
  return {
    title,
    standardSize,
    standardWeight,
    itemDescription,
    imageLink,
    category,
    active,
  };
}

export { createNewCatalogueItem };
