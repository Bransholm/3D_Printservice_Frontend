// Eksempel på en klasse.
export class catalogueItem {
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
  // Catalog DOM
  render() {
    const catalogueHTML =
      /*html*/
      `
    <article>
    <img src="../images/${this.imageLink}" alt="Produktbillede ${this.title}"/>
    <h3>Produkt Navn: ${this.title}</h3>
    <p>Kategori: ${this.category}</p>
    <p>Standard Størrelse: ${this.standardSize} cm</p>
    <p>Standard Vægt: ${this.standardWeight} gram</p>
    <p>Produkt Beskrivelse: ${this.itemDescription} </p>
    <button class="btn-view-product" >Se Produkt</button>
    </article>
    `;
    return catalogueHTML;
  }

  adminRender() {
    const adminCatalogueHTML =
      /*html*/
      `
    <article>
    <h3>Produkt Navn: ${this.title}</h3>
    <img src="../images/${this.imageLink}" alt="Produktbillede ${this.title}"/>
    <p>Kategori: ${this.category}</p>
    <p>Standard Størrelse: ${this.standardSize} cm</p>
    <p>Standard Vægt: ${this.standardWeight} gram</p>
    <p>Produkt Beskrivelse: ${this.itemDescription} </p>
    <button class="btn_update_product" >Opdater produkt</button>
    <button class="btn_delete_product" >Slet produkt</button>

    </article>
    `;
    return adminCatalogueHTML;
  }

  // Vi skal have en metode til at kunne ændre i samtlige Attirbutter og opdatere databasen der efter - Lukas.
}
