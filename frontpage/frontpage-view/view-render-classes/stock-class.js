export class stockMaterial {
  constructor(stockObject) {
    this.id = stockObject.Id;
    this.name = stockObject.Name;
    this.material = stockObject.Material;
    this.colour = stockObject.Colour;
    this.gramInStock = stockObject.GramInStock;
    this.active = stockObject.Active;
    this.salesPrice = stockObject.SalesPrice;
  }
}
