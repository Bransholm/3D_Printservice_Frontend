function showItemCartPriceSection(displayPrices) {
  document.querySelector("#shopping_cart_price_iformation").innerHTML = " ";

  const totalPrice = displayPrices.totalPrice;
  const totalTax = displayPrices.totalTax;

  const shoppingCartPriceSectionHTML =
    /*html*/
    `
   <h3>Total Pris: ${totalPrice} </br> Her af moms: ${totalTax}</h3>
   `;

  document
    .querySelector("#shopping_cart_price_iformation")
    .insertAdjacentHTML("beforeend", shoppingCartPriceSectionHTML);
}

export { showItemCartPriceSection };
