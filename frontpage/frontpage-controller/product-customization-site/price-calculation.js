import { shoppingCart } from "./shopping-cart.js";

export function calculateTotalPrice() {
  let accumulatedTax = 0;
  let accumulatedPrice = 0;

  for (const item of shoppingCart) {
    accumulatedPrice += Number(item.bundlePrice);
    accumulatedTax += Number(item.bundleTax);
  }

  const totalOrderPrices = {
    totalPrice: accumulatedPrice.toFixed(2),
    totalTax: accumulatedTax.toFixed(2),
  };

  return totalOrderPrices;
}
