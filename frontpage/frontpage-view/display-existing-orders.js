function displayOrderInformation(orderData) {
  console.log("here is your order ", orderData);

  document.querySelector("#view-order-information-overivew").innerHTML = "";

  const customer = orderData.customerDetails;
  const order = orderData.orderDetails;
  const productsList = orderData.order_lines;

  const viewOrderHTML =
    /*html*/
    `
  <div>
  <div>Kundeinformation</div>
  <div>Kundenummer: ${customer.customerNo}</div>
  <div>Fornavn: ${customer.firstName}</div>
  <div>Efternavn: ${customer.lastName}</div>
  <div>Adresse: ${customer.adress}</div>
  <div>Postnummer: ${customer.zipCode}</div>
  <div>By: ${customer.city}</div>

  <div>Ordre Information</div>
  <div>Bestillings Adresse: ${order.deliveryAdress}</div>
  <div>Bestillings Postnummer: ${order.deliveryZipCode}</div>
  <div>Bestillings By: ${order.deliveryCity}</div>
  <div>Tidspunk: ${order.timeDate}</div>
  <div>Ordrens status: ${order.status}</div>
  <div>Total Pris: ${order.totalPrice}</div>
  <div>Heraf Moms: ${order.totalTax}</div>
  <div>Porto: ${order.shippingPrice}</div>
  `;

  document
    .querySelector("#view-order-information-overivew")
    .insertAdjacentHTML("beforeend", viewOrderHTML);

  displayOrderLines(productsList);
}

function displayOrderLines(productsList) {
  console.log("productlist is this long", productsList.length);
  document.querySelector("#oder_lines_overview").innerHTML = "";
  for (let i = 0; productsList.length > i; i++) {
    const product = productsList[i];
    console.log(product);
    const orderLineHTML =
      /*html*/
      `
    <div>
    <div>Produkt ${i + 1}</div>
    <div>Produktnavn: ${product.title}</div>
    <div>Størrelse: ${product.size}</div>
    <div>Farve: ${product.colour}</div>
    <div>Antal: ${product.amount}</div>
    <div>Materiale: ${product.material}</div>
    <div>Kvalitet: ${product.name}</div>
    <div>Pris: ${product.price}</div>
    <div>Moms: ${product.tax}</div>
    </div>
    `;
    document
      .querySelector("#oder_lines_overview")
      .insertAdjacentHTML("beforeend", orderLineHTML);
  }
}

export { displayOrderInformation };
