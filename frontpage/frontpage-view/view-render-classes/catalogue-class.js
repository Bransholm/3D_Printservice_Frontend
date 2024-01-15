export class catalogueItem {
  // Klassens constructor tager vores fetchede-data-objekt som argument og sætter Klassens Atrributter lig Objektets properties.
  constructor(catalogueObject) {
    this.id = catalogueObject.Id;
    this.title = catalogueObject.Title;
    this.standardSize = Number(catalogueObject.StandardSize);
    this.standardWeight = Number(catalogueObject.StandardWeight);
    this.itemDescription = catalogueObject.ItemDescription;
    this.imageLink = catalogueObject.ImageLink;
    this.category = catalogueObject.Category;
  }

  calculateStandardPrice(tax, basePrice, stockPrice) {
    const costPrGram = stockPrice / 1000;
    const productPrice = (
      (costPrGram * this.standardWeight + Number(basePrice)) *
      Number(tax) *
      tax
    ).toFixed(2);

    return productPrice;
  }

  // I klassens render-metode bliver HTML'en til vores DOM lavet.
  // Catalog DOM
  render(tax, basePrice, stockPrice) {
    const catalogueHTML =
      /*html*/
      `
    <article>
        <h3>${this.title}</h3>
        <img
          src="../images/${this.imageLink}"
          alt="Produktbillede ${this.title}"
        />
        <p>${this.calculateStandardPrice(tax, basePrice, stockPrice)} DKK</p>
        <p>Kategori: ${this.category}</p>
    <button class="btn-view-product" >Se Produkt</button>
    </article>
    `;
    return catalogueHTML;
  }

  renderBasicInformation() {
    const basicInformationHTML =
      /*html*/
      `<div>
        <img
          src="../images/${this.imageLink}"
          alt="Produktbillede ${this.title}"
        />
        <h3>Produkt Navn: ${this.title}</h3>
        <p>Kategori: ${this.category}</p>
        <p>Standard Størrelse: ${this.standardSize} cm</p>
        <p>Standard Vægt: ${this.standardWeight} gram</p>
        <p>Produkt Beskrivelse: ${this.itemDescription} </p>
      </div>`;

    return basicInformationHTML;
  }
}
