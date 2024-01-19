import { getfinanceData } from "../admin-model/fetch-data-admin.js";

let startDataeValue;
let endDateValue;

async function submitFianceDates(event) {
  event.preventDefault();

  const form = document.querySelector("#finance-form");

  startDataeValue = form.startDate.value;
  endDateValue = form.endDate.value;

  console.log("start", startDataeValue);
  console.log("end", endDateValue);

  const financeData = await getfinanceData();
  console.log(financeData);
}

export { submitFianceDates, startDataeValue, endDateValue };
