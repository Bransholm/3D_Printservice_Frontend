import { catalogueItem } from "./view-render-classes/catalogue-class.js";
import { stockMaterial } from "./view-render-classes/stock-class.js";

// Denne funktion laver klasserne for vores katalog-vare
export function createCatalogClasses(dataList) {
  console.log("No.1 createCatalogClasses");
  // Opret en tom liste så hvert objekt vi fetcher kan komme ind som en instans af en klasse
  const classList = [];

  // Loop på listen af vores fetchede data:
  for (const object of dataList) {
    // Hvert objekt i listen bliver nu lavet til en ny instans.
    const newInstance = new catalogueItem(object);

    // Enstansen bliver puttet i vores nye liste.
    classList.push(newInstance);
  }

  // Her laver jeg et instance - af stock.
  createInstanceOfStock();

  //Her køres render metoden for alle vores instances af catalogue klassen.
  console.log(classList);
  callRenderMethod(classList);

  // Her laver jeg en instance af Product...
  createInstanceOfProdut();
}

function callRenderMethod(listOfInstances) {
  console.log("No3. CallRenderMethod");
  document.querySelector("#produkt_overblik").innerHTML = "";
  for (const instance of listOfInstances) {
    const classHTML = instance.render();
    //Hvorfor er vores HMTL på danks?!

    document
      .querySelector("#produkt_overblik")
      .insertAdjacentHTML("beforeend", classHTML);

    document
      .querySelector("#produkt_overblik article:last-child .btn-view-product")
      .addEventListener("click", () => viewButtonClicked(instance));
  }
}

// PT.lokal-global variabel.
const stockMaterialObject = {
  Name: "Sort Hård",
  Material: "PLA",
  Colour: "black",
  GramInStock: "1000",
  MinAmountReached: 0,
  SalesPrize: "200",
};

let stockMaterialInstance;

function createInstanceOfStock() {
  console.log("no2. createInsanceOfStock");
  stockMaterialInstance = new stockMaterial(stockMaterialObject);
  console.log("Render material: ", stockMaterialInstance.render());
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
  const productInstance = new product(productObject, stockMaterialObject);
  // Her kalder jeg render-metoden for produkt klassen for at se HTML'en som metoden returnere.

  console.log(productInstance.render());
}

/* MIN TANKE er at arve fra 2 klasser - fordi det er sådan mit ERD ser ud - det giver mening at genbruge... 
 attributter, men giver det meing at nedarve fra 2 klasser her egentlig, kan jeg ikke bare give den et par attributter mere manuelt...

 Der er jo ikke en IS-A relation? Der er en HAS-A relation 
Product has a catalog-item (og is an Item) og has a material.

Er det her hovedpinen værd?
 */

// Produkt klassen skal (ned)arve fra catalogItem (og StockMaterial) klassen - derfor skal der skrives "extends"
class product {
  constructor(productObjekt, stockObject) {
    // super - er noget der reffere til conturctoren fra den parrent-class som vi arver/extender fra
    // super(productObjekt);

    // Kalder constructor af den anden parrent-class (StockMaterial)... her bruger vi "compositions" da JS ikke KAN arve fra 2 klasser
    // StockMaterial.call(this, stockObject);
    this.stock = new stockMaterial(stockObject);
    this.catalogue = new catalogueItem(productObjekt);

    // Attributterne fra det catalog-varen
    // this.catalogueId = productObjekt.Id;
    // Attributterne fra stock-materialet burde være her
    this.stock_Id = productObjekt.Stock_Id;
    // Attributterne unikke for produktet:
    this.productSize = productObjekt.ProductSize;
    this.standardWeight;

    // Denne her bør være private og skal have en metode der udregner den - Lukas.
    this.calculatedPrize = this.prizeCalculator(
      this.StandardWeight,
      this.ProductSize
    );
  }

  get catalogue_Id() {
    return this.catalogue.Id;
  }

  render() {
    const productHTML =
      /*html*/
      `
    <article>
    <img href=${this.imageLink}>
    <h3>Produkt Navn: ${this.title}</h3>
    <p>Kategori: ${this.category}</p>
    <p>Produkt Beskrivelse: ${this.itemDescription} </p>
    <p>skal printes i : ${this.name}</p>
    <p>Materiale: ${this.minAmountReachedaterial}</p>
    <p>Farve: ${this.colour}</p>
    <p>Produktets ønskede størrelse: ${this.productSize} cm</p>
    <p>Produktets beregnede pris: ${this.calculatedPrize} dkk</p>
    </article>
    `;
    return productHTML;
  }

  // Her er en metode som giver en attirbut, så en setter?
  prizeCalculator(weight, height) {
    return weight + height * 20;
  }
}

function viewButtonClicked(instance) {
  console.log("view button clicked: ", instance.id);
  // document.querySelector("#produkt_overblik").innerHTML = "";
  document.querySelector("#produkt_tilpasning").innerHTML = "";

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
                <option value="A">MaterialeA</option>
                <option value="B">MaterialeB</option>
                <option value="C">MaterialeC</option>
                <option value="D">MaterialeD</option>
                </select>


      <label for="chosenMaterial">Farve</label>
                <select name="material" id="chosenMaterial">
                <option value="A">FarveA</option>
                <option value="B">FarveB</option>
                <option value="C">FarveC</option>
                <option value="D">FarveD</option>
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
    .querySelector("#produkt_tilpasning")
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
  document.querySelector("#productPrice").innerHTML = "";
  const price = size * 1.8 * amount;
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
