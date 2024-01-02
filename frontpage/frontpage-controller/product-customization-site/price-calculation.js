function setCompleteProductPrice() {
  const tax = 1.25;
  const shipping = 39;

  document.querySelector("#productPrice").innerHTML = "";
  // console.log(
  //   `Samlet pris = materiale ${materialPrice}, størrelse${size}, antal${amount}`
  // );
  //der mangler en vloume udregning på baggrund af vægt i forhold til størrelsen.
  setSingleProductPrice();
  const bundlePrice = setBundleProductPrice();

  price = bundlePrice * tax + shipping;
  // run op!
  document.querySelector(
    "#productPrice"
  ).innerHTML = `Samlet Pris: ${Math.round(price)} DKK`;
}

function setSingleProductPrice() {
  singleProductPrice = (materialPrice / 1000) * (size * 1.8);
}

function setBundleProductPrice() {
  return productPrice * amount;
}

function calculateTotalOrderPrice(product){
  const itemPrice = product.price - product.tax
  
}


export {
  setCompleteProductPrice,
  setSingleProductPrice,
  setBundleProductPrice,
};
