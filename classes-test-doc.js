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
  stockMaterialInstance = new StockMaterial(stockMaterialObject);
  console.log("Render material: ", stockMaterialInstance.render());
}

class StockMaterial {
  constructor(stockObject) {
    this.name = stockObject.Name;
    this.material = stockObject.Material;
    this.colour = stockObject.Colour;
    this.gramInStock = stockObject.GramInStock;
    this.minAmountReached = stockObject.MinAmountReached;
    this.salesPrize = stockObject.SalesPrize;
  }

  render() {
    const stockHTML =
      /*html*/
      `
    <article>
    <h3>Produkt Navn: ${this.name}</h3>
    <p>Materiale: ${this.material}</p>
    <p>Farve: ${this.colour} cm</p>
    <:> Mængde på lager: ${this.gramInStock} gram</p>
    <p>Minimum nået: ${this.minAmountReached} </p>
    <p>Salgspris: ${this.salesPrize} dkk/gram</p>
    </article>
    `;
    return stockHTML;
  }
}

// Note til os selv. Denne klasse skal vel kun rigtigt ses af Admin, som skal kunne opdatere dem... - Lukas

// Eksempel på en klasse.
class catalogueItem {
  // Klassens constructor tager vores fetchede-data-objekt som argument og sætter Klassens Atrributter lig Objektets properties.
  constructor(catalogueObject) {
    this.id = catalogueObject.Id;
    this.title = catalogueObject.Title;
    this.standardSize = catalogueObject.StandardSize;
    this.standardWeight = catalogueObject.StandardWeight;
    this.itemDescription = catalogueObject.ItemDescription;
    this.imageLink = catalogueObject.ImageLink;
    this.category = catalogueObject.Category;
  }

  // I klassens render-metode bliver HTML'en til vores DOM lavet.
  render() {
    const catalogueHTML =
      /*html*/
      `
    <article>
    <h3>Produkt Navn: ${this.title}</h3>
    <img src="./images/${this.imageLink}" alt="Produktbillede ${this.title}"/>
    <p>Kategori: ${this.category}</p>
    <p>Standard Størrelse: ${this.standardSize} cm</p>
    <p>Standard Vægt: ${this.standardWeight} gram</p>
    <p>Produkt Beskrivelse: ${this.itemDescription} </p>
    <button class="btn-view-product" >Se Produkt</button>
    </article>
    `;

    return catalogueHTML;
  }
  // Vi skal have en metode til at kunne ændre i samtlige Attirbutter og opdatere databasen der efter - Lukas.
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
    this.stock = new StockMaterial(stockObject);
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
  document.querySelector("#produkt_overblik").innerHTML = "";
  // document.querySelector("#produkt_tilpasning").innerHTML = "";

  // NB: Vi skal lave et fetch som tjekker om en side er løbet tør for noget bestemt...
  const productInfromationHTML =
    /*html*/
    `
<article>
    <article>
    <h3>Produkt Navn: ${instance.title}</h3>
    <img src="${instance.imageLink}" alt="foto"/>
    <p>Kategori: ${instance.category}</p>
    <p>Produkt Beskrivelse: ${instance.itemDescription}</p>
    <p>Standard Størrelse: ${instance.standardSize} cm</p>
    <p>Standard vægt: ${instance.standardWeight}</p>
        

    <h3 id="productPrice"> Samlet Pris: XXX.XX DKK</h3>
    <form>

    <div id="selectAmount">
    <button class="add-extra-product"> - </button>
    <p>Antal valgte 1</p>
    <button class="remove-another-product"> + </button>
    </div>

    <div id="selectMaterial">
    
    <label for="chosenMaterial">Materiale</label>
                <select name="material" id="chosenMaterial">
                <option value="A">MaterialeA</option>
                <option value="B">MaterialeB</option>
                <option value="C">MaterialeC</option>
                <option value="D">MaterialeD</option>

      <label for="chosenMaterial">Farve</label>
                <select name="material" id="chosenMaterial">
                <option value="A">FarveA</option>
                <option value="B">FarveB</option>
                <option value="C">FarveC</option>
                <option value="D">FarveD</option>
    </div>
    <div id="selectProductSize">
       <label for="chosenSize">Størrelse</label>
                <select name="material" id="chosenMaterial">
                <option value="A">5cm</option>
                <option value="B">15cm</option>
                <option value="C">22cm</option>
                <option value="D">30cm</option>
                </select>
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
}
