export class stockMaterial {
  constructor(stockObject) {
    this.name = stockObject.Name;
    this.material = stockObject.Material;
    this.colour = stockObject.Colour;
    this.gramInStock = stockObject.GramInStock;
    this.minAmountReached = stockObject.MinAmountReached;
    this.salesPrice = stockObject.SalesPrice;
  }

  showStockAvailability() {
    if (this.minAmountReached == 0) {
      return "På Lager";
    } else {
      return "Udsolgt";
    }
  }

  render() {
    const availability = this.showStockAvailability();
    const stockHTML =
      /*html*/
      `
  <tr>
    <td>${this.material}</td>
    <td>${this.name}</td>
    <td>${this.colour} cm</td>
    <td>${this.gramInStock} gram</td>
    <td> ${availability} </td>
    <td>${this.salesPrice} dkk/kg</td>
    <td>  <button  class="btn_update_stock">Opdater!</button> </td>

  </tr>
    `;
    return stockHTML;
  }
}
