export class stockMaterial {
  constructor(stockObject) {
    this.name = stockObject.Name;
    this.material = stockObject.Material;
    this.colour = stockObject.Colour;
    this.gramInStock = stockObject.GramInStock;
    this.minAmountReached = stockObject.MinAmountReached;
    this.salesPrice = stockObject.SalesPrice;
  }

  render() {
    const stockHTML =
      /*html*/
      `
  <tr>
    <td>${this.name}</td>
    <td>${this.material}</td>
    <td>${this.colour} cm</td>
    <td>${this.gramInStock} gram</td>
    <td>${this.minAmountReached.data} </td>
    <td>${this.salesPrice} dkk/kg</td>
  </tr>
    `;
    return stockHTML;
  }
}


 