import { getAvailableStockData } from "./fetch-data.js";

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

let stockInStorage;

export async function viewButtonClicked(instance) {
  console.log("view button clicked: ", instance.id);
  // document.querySelector("#produkt_overblik").innerHTML = "";
  document.querySelector("#product_id").innerHTML = "";

  stockInStorage = await getAvailableStockData();
  console.log("The available stock", stockInStorage);

  // NB: Vi skal lave et fetch som tjekker om en side er løbet tør for noget bestemt...
  const productInfromationHTML =
    /*html*/
    `
<article>
    <article>
    <h3>Produkt Navn: ${instance.title}</h3>
    <img src="./images/${instance.imageLink}" alt="Produktbillede ${instance.title}"/>
    <p>Kategori: ${instance.category}</p>
    <p>Produkt Beskrivelse: ${instance.itemDescription}</p>
    <p>Standard Størrelse: ${instance.standardSize} cm</p>
    <p>Standard vægt: ${instance.standardWeight}</p>
        

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
                <input type="range" min="1" max="30" value="15" name="size" id="chosenSize">
               
    </div>

    <p id="productPrice"> Udrgenede vægt pr. produkt: XXXX gram </p>
    <p id="produktMaterialName"> Produktet bliver printet i: PLA</p>
    
    </form>
    
        <button class="btn-add-basket" >Læg i kruv</button>
        <button class="btn-return-" >Forstæt shopping</button>

    
    </article>

</article>
`;
  document
    .querySelector("#product_id")
    .insertAdjacentHTML("beforeend", productInfromationHTML);

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
    
    
// Set product colour - for the drop down 
activateColour()


function setProductMaterial(event) {
  const selectedMaterial = event.target.value;
  console.log("selected material ", selectedMaterial);

  document.querySelector("#chosenColour").innerHTML = "";
  
  for (const material of stockInStorage) {
    console.log("get name: ", material.Name);
    if (selectedMaterial === material.Name.toLowerCase()) {
      activateColour(material.Colour, material.Id);
    }
  }
}

//   document
//     .querySelector("#chosenColour")
//     .insertAdjacentElement("beforeend", html);
// }

function activateColour(colour, id) {
  const newColourOption = document.createElement("option");
  newColourOption.value = id;
  newColourOption.text = colour;

  console.log(colour);
  console.log(newColourOption);
  document.querySelector("#chosenColour").add(newColourOption);
}

// function showSelectableMaterials(stockInStorage) {
//   // Alle farver skal skjules...

//   const allColours = [
//     "rød",
//     "grøn",
//     "blå",
//     "violet",
//     "gul",
//     "orange",
//     "sort",
//     "hvid",
//   ];
//   const stockType = ["blød", "elastisk", "hård"];

//   for (const stock of stockInStorage) {
//     console.log(stock.Name.toLowerCase(), "_", stock.Colour.toLowerCase());
//     const stockName = stock.Name.toLowerCase();
//     const stockColour = stock.Colour.toLowerCase();
//     for (const colour of allColours){
//       if (colour === stockColour) {
//         //fjern den class der skjuler alt
//       }
//   }
// }

// }

function setProductColour(event) {
  console.log("product colour ", event.target.colour.value);
}

function setProductSize(event) {
  size = event.target.value;
  document.querySelector("#showSliderSize").innerHTML = "";
  console.log("The size is ", event.target.value, " CM");
  document.querySelector(
    "#showSliderSize"
  ).innerHTML = `Valgte højde ${size} cm`;

  setProductPrice(size);
}

function setProductPrice() {
  const tax = 1.25;
  const shipping = 39;
  document.querySelector("#productPrice").innerHTML = "";
  const price = size * 1.8 * amount * tax + shipping;
  document.querySelector(
    "#productPrice"
  ).innerHTML = `Samlet Pris: ${price} DKK`;
}

let size;
let amount = 1;

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
