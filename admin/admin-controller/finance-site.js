import { getfinanceData } from "../admin-model/fetch-data-admin.js";

let startDateValue;
let endDateValue;

async function submitFianceDates(event) {
  event.preventDefault();

  const form = document.querySelector("#finance-form");

  startDateValue = form.startDate.value;
  endDateValue = form.endDate.value;

  console.log("start", startDateValue);
  console.log("end", endDateValue);

  const financeData = await getfinanceData();
  console.log(financeData);
}



export { submitFianceDates, startDateValue, endDateValue };

