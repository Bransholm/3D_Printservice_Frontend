// disables the order-form input
function disableCustomerOrderInput() {
  // document.querySelector("#insert_orderinfo").prop("disabled", true);
  document.querySelector("#first_name_input").disabled = true;
  document.querySelector("#last_name_input").disabled = true;
  document.querySelector("#adress_input").disabled = true;
  document.querySelector("#zip_code_input").disabled = true;
  document.querySelector("#city_input").disabled = true;
  document.querySelector("#delivery_adress_input").disabled = true;
  document.querySelector("#delivery_zip_code_input").disabled = true;
  document.querySelector("#delivery_city_input").disabled = true;
  document.querySelector("#accept_payment_details_checkbox").disabled = true;
  document.querySelector("#btn_submit_order_details").disabled = true;
}

// enables the oder-form input
function enableCustomerOrderInput() {
  document.querySelector("#first_name_input").disabled = false;
  document.querySelector("#last_name_input").disabled = false;
  document.querySelector("#adress_input").disabled = false;
  document.querySelector("#zip_code_input").disabled = false;
  document.querySelector("#city_input").disabled = false;
  document.querySelector("#delivery_adress_input").disabled = false;
  document.querySelector("#delivery_zip_code_input").disabled = false;
  document.querySelector("#delivery_city_input").disabled = false;
  document.querySelector("#accept_payment_details_checkbox").disabled = false;
  document.querySelector("#btn_submit_order_details").disabled = false;
}

export { disableCustomerOrderInput, enableCustomerOrderInput };
