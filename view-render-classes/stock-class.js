export class stockMaterial {
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
