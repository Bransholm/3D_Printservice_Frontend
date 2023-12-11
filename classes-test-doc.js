// Imports only the stockMaterials that is not sold out
import { getAvailableStockData } from "./fetch-data.js";

// Contains all products added to the cart
const shoppingCart = [];

// // Denne funktion laver klasserne for vores katalog-vare
// export function createCatalogClasses(dataList, classType, htmlId) {
//   console.log("No.1 createCatalogClasses");
//   // Opret en tom liste så hvert objekt vi fetcher kan komme ind som en instans af en klasse
//   const classList = [];

//   // Loop på listen af vores fetchede data:
//   for (const object of dataList) {
//     // Hvert objekt i listen bliver nu lavet til en ny instans.
//     const newInstance = new classType (object);

//     // Enstansen bliver puttet i vores nye liste.
//     classList.push(newInstance);
//   }
//   console.log("classlist: ", classList);

//   //Her køres render metoden for alle vores instances af catalogue klassen.
//   console.log(classList);
//   callRenderMethod(classList, htmlId);

//   // Her laver jeg en instance af Product...
//   // createInstanceOfProdut();
// }

function callRenderMethod(listOfInstances, htmlId) {
  console.log("No3. CallRenderMethod");
  document.querySelector(`#${htmlId}`).innerHTML = "";
  for (const instance of listOfInstances) {
    const classHTML = instance.render();
    //Hvorfor er vores HMTL på danks?!

    document
      .querySelector(`#${htmlId}`)
      .insertAdjacentHTML("beforeend", classHTML);

    document
      .querySelector(`#${htmlId} article:last-child .btn-view-product`)
      .addEventListener("click", () => viewButtonClicked(instance));
  }
}

function createInstanceOfProdut() {
  console.log("CreateInstanceOfProduct");
  // her laver jeg en instance af en produkt-klasse, bare lige for at teste den.
  const productObject = {
    // Attributterne fra det catalog-varen
    Catalogue_Id: "17",
    Title: "Gherkin Skyskraber",
    ItemDescription:
      "Her har du muligheden for at få den verdenskendte Gherkin skyskraber til at pynte dit hjem",
    ImageLink:
      "https://img.thingiverse.com/cdn-cgi/image/fit=contain,quality=95,width=976,height=500/https://cdn.thingiverse.com/renders/78/ef/02/76/7a/Gherkin_Shell_display_large.jpg",
    Category: "Bygninger",
    StandardSize: 18,
    StandardWeight: 40,
    Stock_Id: "21",
    ProductSize: 20,
  };

  //  Name: "Sort Hård",
  //   Material: "PLA",
  //   Colour: "black",
  //   GramInStock: "1000",
  //   MinAmountReached: 0,
  //   SalesPrize: "200"

  // Her laves instansen...
  // const productInstance = new product(productObject, stockMaterialObject);
  // Her kalder jeg render-metoden for produkt klassen for at se HTML'en som metoden returnere.

  // console.log(productInstance.render());
}

/* MIN TANKE er at arve fra 2 klasser - fordi det er sådan mit ERD ser ud - det giver mening at genbruge... 
attributter, men giver det meing at nedarve fra 2 klasser her egentlig, kan jeg ikke bare give den et par attributter mere manuelt...

Der er jo ikke en IS-A relation? Der er en HAS-A relation 
Product has a catalog-item (og is an Item) og has a material.

Er det her hovedpinen værd?
*/

// Produkt klassen skal (ned)arve fra catalogItem (og StockMaterial) klassen - derfor skal der skrives "extends"

class customizedProduct {
  constructor() {
    this.productSize;
    this.amount = 1;
    this.SalesPrice = 155;
  }

  interfaceRender(instance) {
    const html =
      /*html*/
      `
<article>
    <article>
    <h3>Produkt Navn: ${instance.title}</h3>
    <img src="./images/${instance.imageLink}" alt="Produktbillede ${instance.title}"/>
    <p>Kategori: ${instance.category}</p>
    <p>Produkt Beskrivelse: ${instance.itemDescription}</p>
    <p>Standard Størrelse: ${instance.standardSize} cm</p>
    <p>Standard vægt: ${instance.standardWeight} gram</p>
        

    <h3 id="productPrice"> Samlet Pris: XXX.XX DKK</h3>
    <form>

    <div id="selectAmount">
    <button class="btn_increment_amount"> + </button>
    <p id="selectProductAmount">Antal 1 stk.</p>
    <button class="btn_decrement_amount"> - </button>
    </div>

    <div id="selectMaterial">
    
    <label for="chosenMaterial">Materiale</label>
                <select name="material" id="chosenMaterial">
                <option value="blød">Blød</option>
                <option value="elastisk">Elastisk</option>
                <option value="hård">Hård</option>
                </select>


      <label for="chosenColour">Farve</label>
                <select name="colour" id="chosenColour">
                </select>




    </div>
    <div id="selectProductSize">
    <p id="showSliderSize">Valgte højde 15 cm</p>
       <label for="chosenSize">Størrelse</label>
                <input type="range" min="1" max="30" value="15" name="size" id="productSizeSlider">
               
    </div>

    <p id="productPrice"> Udrgenede vægt pr. produkt: XXXX gram </p>
    <p id="produktMaterialName"> Produktet bliver printet i: PLA</p>
    
    </form>
    
        <button class="btn-add-basket" >Læg i kruv</button>
        <button class="btn-return-" >Forstæt shopping</button>

    
    </article>

</article>
`;
  }
}

// ALT SKAL RESETTES NÅR VIEW BUTTON & ADD TO BASKET KLIKKES!
// Everything needed to make the product
let catalogueId;
let size = 15;
let amount = 1;
// Used to calculate the set price...
let materialPrice = 155;
let stockInStorage;
let price;
let stockId;

export async function viewButtonClicked(instance) {
  console.log("view button clicked: ", instance.id);

  // Sets the id for the chosen catalogue item
  catalogueId = instance.id;

  document.querySelector("#product_id").innerHTML = "";

  // Fetches all the stock materials that are not sold out
  stockInStorage = await getAvailableStockData();
  // console.log("The available stock", stockInStorage);

  // Sets the product DOM with information from the chosen catalogue item
  showCustomizeProductSite(instance);

  // set values for the product before custumization starts
  setDefaultProduct(instance.standardSize);
}

function showCustomizeProductSite(instance) {
  // NB: Vi skal lave et fetch som tjekker om en side er løbet tør for noget bestemt...
  const html =
    /*html*/
    `
<article>
    <article>
    <h3>Produkt Navn: ${instance.title}</h3>
    <img src="./images/${instance.imageLink}" alt="Produktbillede ${instance.title}"/>
    <p>Kategori: ${instance.category}</p>
    <p>Produkt Beskrivelse: ${instance.itemDescription}</p>
    <p>Standard Størrelse: ${instance.standardSize} cm</p>
    <p>Standard vægt: ${instance.standardWeight} gram</p>
        

    <h3 id="productPrice"> Samlet Pris: XXX.XX DKK</h3>
    <form>

    <div id="selectAmount">
    <button class="btn_increment_amount"> + </button>
    <p id="selectProductAmount">Antal 1 stk.</p>
    <button class="btn_decrement_amount"> - </button>
    </div>

    <div id="selectMaterial">
    
    <label for="chosenMaterial">Materiale</label>
                <select name="material" id="chosenMaterial">
                <option value="blød">Blød</option>
                <option value="elastisk">Elastisk</option>
                <option value="hård">Hård</option>
                </select>


      <label for="chosenColour">Farve</label>
                <select name="colour" id="chosenColour">
                </select>




    </div>
    <div id="selectProductSize">
    <p id="showSliderSize">Valgte højde 15 cm</p>
       <label for="chosenSize">Størrelse</label>
                <input type="range" min="1" max="30" value="15" name="size" id="productSizeSlider">
               
    </div>

    <p id="productPrice"> Udrgenede vægt pr. produkt: XXXX gram </p>
    <p id="produktMaterialName"> Produktet bliver printet i: PLA</p>
    
    </form>
    
        <button class="btn-add-basket" >Læg i kruv</button>
        <button class="btn-return-" >Forstæt shopping</button>

    
    </article>

</article>
`;

  document.querySelector("#product_id").insertAdjacentHTML("beforeend", html);
  // Activates all eventlisternes used on the product customization site
  addProductSiteEventListeners();
}

function addProductSiteEventListeners() {
  document
    .querySelector("#selectProductSize")
    .addEventListener("change", setProductSize);

  document
    .querySelector(".btn_increment_amount")
    .addEventListener("click", incrementProductAmount);
  document
    .querySelector(".btn_decrement_amount")
    .addEventListener("click", decrementProductAmount);

  document
    .querySelector("#chosenMaterial")
    .addEventListener("change", setProductMaterial);

  document
    .querySelector("#chosenColour")
    .addEventListener("change", setProductColour);

  document
    .querySelector(".btn-add-basket")
    .addEventListener("click", addProductToBasket);
}

// Set all the standard product values
function setDefaultProduct(defaultSize) {
  console.log("Set all events");

  // Set the item size to fit the item.standardSize
  size = defaultSize;
  // Set the size information shown to the product customization site
  setProductSizeInfo();
  // Show the default material type and colour - set the first available as chosen
  refreshColourSelector(stockInStorage[0].Name.toLowerCase());
  // Set the default
  setProductPrice();
}

// Sets the material to the type selected in the "chooseMaterial" drop down
function setProductMaterial(event) {
  const selectedMaterial = event.target.value;
  // console.log("selected material ", selectedMaterial);

  // Resets the "chosenColour" drop down option
  refreshColourSelector(selectedMaterial);
}

//det er ID og materiale der er vigtigt... hvad hvis det jeg sætter den til ikke er tilgængeligt...
// sæt et materiale
// vis alle farver
// vælg en farve...

// Resets all the colours in the "chosenColour" drop down
function refreshColourSelector(selectedMaterial) {
  document.querySelector("#chosenColour").innerHTML = "";

  // Checks if the match is the first
  let matchValue = 0;

  // Loops through all available materials to find those matching with the selected type
  for (let n = 0; n < stockInStorage.length; n++) {
    const material = stockInStorage[n];

    if (selectedMaterial === material.Name.toLowerCase()) {
      //  For every match available - an option is made available
      activateColour(material.Colour, material.Id);

      // Sets the first avaialbe material as the product default
      if (matchValue === 0) {
        setDeafaultProductMaterial(
          material.Material,
          material.SalesPrice,
          material.Id
        );
        matchValue = 1;
      }
    }
  }
}

// Sets the default material including type, colour and price
function setDeafaultProductMaterial(material, price, id) {
  // Tells the customer what plastic type the product will be printed in
  setMaterialText(material);
  // Sets the value of the product material price
  setProductMaterialPrice(price);
  // Sets the default selected material id - indirectly the chosen colour
  setDefaultMaterialId(id);
}

// Changes the selected maetrial id to the material shown in the "choosenMaterial" drop down with the first available colour in the "choosenColour" drop down
function setDefaultMaterialId(id) {
  stockId = id;
  // console.log("New defaut stockID ", stockId);
}

// Stores the price value of the selected material
function setProductMaterialPrice(newPrice) {
  materialPrice = newPrice;
}

//  --- Functions that set the product material and colour
// Clear and shwos the print material on screen
function setMaterialText(material) {
  document.querySelector("#produktMaterialName").innerHTML = "";
  document.querySelector(
    "#produktMaterialName"
  ).innerHTML = `Produktet bliver printet i: ${material}`;
}

// Creates the options for the colour drop down - value is the stockMaterial.id
function activateColour(colour, id) {
  const newColourOption = document.createElement("option");
  newColourOption.value = id;
  newColourOption.text = colour;
  // console.log(newColourOption);
  document.querySelector("#chosenColour").add(newColourOption);
}

// Sets the chosen color AND material
function setProductColour(event) {
  // console.log("product colour ID: ", event.target.value);
  const chosenMaterialAndColour = Number(event.target.value);
  setDefaultMaterialId(chosenMaterialAndColour);
}

function setProductSize(event) {
  size = Number(event.target.value);
  setProductSizeInfo();
  setProductPrice();
}

// Alteres the size information showed to the customer
function setProductSizeInfo() {
  document.querySelector("#showSliderSize").innerHTML = "";
  // console.log("The size is ", event.target.value, " CM");
  document.querySelector(
    "#showSliderSize"
  ).innerHTML = `Valgte højde ${size} cm`;
}

function setProductPrice() {
  const tax = 1.25;
  const shipping = 39;

  document.querySelector("#productPrice").innerHTML = "";
  // console.log(
  //   `Samlet pris = materiale ${materialPrice}, størrelse${size}, antal${amount}`
  // );
  //der mangler en vloume udregning på baggrund af vægt i forhold til størrelsen.
  const productPrice = (materialPrice / 1000) * (size * 1.8);
  const bundlePrice = productPrice * amount;
  price = bundlePrice * tax + shipping;
  // run op!
  document.querySelector(
    "#productPrice"
  ).innerHTML = `Samlet Pris: ${Math.round(price)} DKK`;
}

function incrementProductAmount(event) {
  event.preventDefault();
  amount += 1;
  showSelectedAmount();
}

function decrementProductAmount(event) {
  event.preventDefault();
  if (amount > 1) {
    amount -= 1;
    showSelectedAmount();
  }
}

function showSelectedAmount() {
  document.querySelector("#selectProductAmount").innerHTML = "";
  document.querySelector(
    "#selectProductAmount"
  ).innerHTML = `Antal ${amount} stk`;

  setProductPrice();
}

/*
Først prisen per produkt
(Materialet og vægt -- på baggrund af størrelsen * konstant)
Så prisen for hvor mange du har
Så regner du mom ud
Så lægger vi porto til
*/

// THE PRODUCT BASKET

/*
    this.catalogueId = catalogueId;
    this.stockId = stockId;
    this.productSize = size;
    this.productAmount = amount;
    this.productPrice = price;
  }
*/

// There is 0 items -> Push
// There are itesm...
// I need to loop through the entire list before i push

function checkForDoublets(newProduct) {
  console.log("This is your product: ", newProduct);
  console.log("number of cart items ", shoppingCart.length);

  // Cheks if the cart is empty
  if (shoppingCart.length > 0) {
    shoppingCart.foreach(compareAttirbutes(newProduct));
    for (const product of shoppingCart) {
      if (!compareAttirbutes(product, newProduct)) {
        shoppingCart.push(newProduct);
      } else {
        console.log("Exists!");
      }
    }
  } else {
    shoppingCart.push(newProduct);
  }
}

function compareAttirbutes(cartProduct, newProduct) {
  // console.log("This is  product in your mcart: ", product)
  return (
    cartProduct.catalogueId === newProduct.catalogueId &&
    cartProduct.stockId === newProduct.stockId &&
    cartProduct.productSize === newProduct.productSize
  );
  // console.log(
  //   `Item in cart catalogue ${cartProduct.catalogueId} === ${newProduct.catalogueId}`
  // );
  // // If the catalouge items are the same - make a new check
  // if (cartProduct.catalogueId === newProduct.catalogueId) {
  //   console.log("catalogue item is the same");
  //   console.log(
  //     `Item in cart material ${cartProduct.stockId} === ${newProduct.stockId}`
  //   );
  //   if (cartProduct.stockId === newProduct.stockId) {
  //     console.log("the material is also the same");
  //     console.log(
  //       `Item in cart size ${cartProduct.productSize} === ${newProduct.productSize}`
  //     );
  //     if (cartProduct.productSize === newProduct.productSize) {
  //       console.log("Even the size is the same");
  //     }
  //   }
  // }
}

// Check det er falsk...

function pushProduct(selectedProduct) {
  shoppingCart.push(selectedProduct);
  console.log("producted added!");
}

function addProductToBasket() {
  const productForBasket = new productOrder(
    catalogueId,
    stockId,
    size,
    amount,
    price
  );

  checkForDoublets(productForBasket);
  console.log("this is your shopping cart", shoppingCart);

  // const catalogueID = catalogueId;
  // const productSize = size;
  // const productAmount = amount;
  // const productPrice = price;
  // const stockID = stockId;

  // // Amount needs to be altered
  // // Price needs to be altered.

  // const productObject = {
  //   catalogueID,
  //   productSize,
  //   productAmount,
  //   productPrice,
  //   stockID,
  // };
}

class productOrder {
  constructor(catalogueId, stockId, size, amount, price) {
    this.catalogueId = catalogueId;
    this.stockId = stockId;
    this.productSize = size;
    this.productAmount = amount;
    this.productPrice = price;
  }

  // test this!
  setAmount(newAmount) {
    this.productAmount = newAmount;
  }
}
