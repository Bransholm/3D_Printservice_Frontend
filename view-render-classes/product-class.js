class product {
  constructor(productObjekt, stockObject) {
    // super - er noget der reffere til conturctoren fra den parrent-class som vi arver/extender fra
    // super(productObjekt);

    // Kalder constructor af den anden parrent-class (StockMaterial)... her bruger vi "compositions" da JS ikke KAN arve fra 2 klasser
    // StockMaterial.call(this, stockObject);

    // this.stock = new stockMaterial(stockObject);
    // this.catalogue = new catalogueItem(productObjekt);

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
