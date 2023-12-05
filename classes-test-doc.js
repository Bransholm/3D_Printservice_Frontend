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
      .addEventListener(
        "click",
        ()=> viewButtonClicked(instance));

    console.log(classHTML);

  }
}

function viewButtonClicked(instance) {
  console.log("view button clicked: ", instance.Title);
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
    this.Name = stockObject.Name;
    this.Material = stockObject.Material;
    this.Colour = stockObject.Colour;
    this.GramInStock = stockObject.GramInStock;
    this.MinAmountReached = stockObject.MinAmountReached;
    this.SalesPrize = stockObject.SalesPrize;
  }

  render() {
    const stockHTML =
      /*html*/
      `
    <article>
    <h3>Produkt Navn: ${this.Name}</h3>
    <p>Materiale: ${this.Material}</p>
    <p>Farve: ${this.Colour} cm</p>
    <:> Mængde på lager: ${this.GramInStock} gram</p>
    <p>Minimum nået: ${this.MinAmountReached} </p>
    <p>Salgspris: ${this.SalesPrize} dkk/gram</p>
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
    this.Id = catalogueObject.Id;
    this.Title = catalogueObject.Title;
    this.StandardSize = catalogueObject.StandardWeight;
    this.StandardWeight = catalogueObject.StandardSize;
    this.ItemDescription = catalogueObject.ItemDescription;
    this.ImageLink = catalogueObject.ImageLink;
    this.Category = catalogueObject.Category;
  }

  // I klassens render-metode bliver HTML'en til vores DOM lavet.
  render() {
    const catalogueHTML =
      /*html*/
      `
    <article>
    <h3>Produkt Navn: ${this.Title}</h3>
    <img href='${this.ImageLink}' alt= "foto"/>
    <p>Kategori: ${this.Category}</p>
    <p>Standard Størrelse: ${this.StandardSize} cm</p>
    <p>Standard Vægt: ${this.StandardWeight} gram</p>
    <p>Produkt Beskrivelse: ${this.ItemDescription} </p>
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
    new StockMaterial(stockObject);
    new catalogueItem(productObjekt);

    // Attributterne fra det catalog-varen
    this.Catalogue_Id = productObjekt.Id;
    // Attributterne fra stock-materialet burde være her
    this.Stock_Id = productObjekt.Stock_Id;
    // Attributterne unikke for produktet:
    this.ProductSize = productObjekt.ProductSize;
    this.StandardWeight;

    // Denne her bør være private og skal have en metode der udregner den - Lukas.
    this.CalculatedPrize = this.prizeCalculator(
      this.StandardWeight,
      this.ProductSize
    );
  }

  render() {
    const productHTML =
      /*html*/
      `
    <article>
    <img href=${this.ImageLink}>
    <h3>Produkt Navn: ${this.Title}</h3>
    <p>Kategori: ${this.Category}</p>
    <p>Produkt Beskrivelse: ${this.ItemDescription} </p>
    <p>skal printes i : ${this.Name}</p>
    <p>Materiale: ${this.Material}</p>
    <p>Farve: ${this.Colour}</p>
    <p>Produktets ønskede størrelse: ${this.ProductSize} cm</p>
    <p>Produktets beregnede pris: ${this.CalculatedPrize} dkk</p>
    </article>
    `;
    return productHTML;
  }

  // Her er en metode som giver en attirbut, så en setter?
  prizeCalculator(weight, height) {
    return weight + height * 20;
  }
}
