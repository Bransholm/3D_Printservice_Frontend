// stores the item to be updated!
let stockItemToUpdate;
import {
  updateStockDataAtofill,
  stockUpdateInputData,
} from "./create-update-forms/update-stock-item.js";
import { stockUpdateRoute } from "../admin-model/backend-routes/stock-put.js";
import { showSuccessfullUpdate } from "../admin-view/stock-update-dialog.js";
import { getStockMaterialData } from "./admin-main.js";

// The function that update the selected stock material while pussing the update button
function updateStockButtonClicked(instance) {
  console.log("Update your materials! ", instance);

  stockItemToUpdate = instance;

  // autofills the stock-update-form
  updateStockDataAtofill(instance);
}

// completes the update process
async function submitStockUpdate(event) {
  event.preventDefault();

  console.log("update data id:  ", stockItemToUpdate.id);
  const updateInputData = stockUpdateInputData();
  const id = stockItemToUpdate.id;

  // console.log("the update: ", data);
  const updateResponse = await stockUpdateRoute(updateInputData, id);

  if (updateResponse.ok) {
    console.log("things are okay!");

    /* You chanced x from z to y */
    // hent dataen og hvis det hele en gang til!
    showSuccessfullUpdate(updateInputData);
    getStockMaterialData();
  }
}

export { updateStockButtonClicked, submitStockUpdate };
