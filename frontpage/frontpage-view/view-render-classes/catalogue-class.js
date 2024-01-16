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
        <div class="catalogue-display-text">${this.calculateStandardPrice(
          tax,
          basePrice,
          stockPrice
        )} DKK
        <br>        
       Kategori: ${this.category}</div>
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
        <div class="catalouge-item-text">Produkt Navn: ${this.title}</div>
        <div class="catalouge-item-text">Kategori: ${this.category}</div>
        <div class="catalouge-item-text">Standard Størrelse: ${this.standardSize} cm</div>
        <div class="catalouge-item-text">Standard Vægt: ${this.standardWeight} gram</div>
        <div class="catalouge-item-text">Produkt Beskrivelse: ${this.itemDescription} </div>
      </div>`;

    return basicInformationHTML;
  }
}
