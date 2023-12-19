// function togglePlaceOrderButton(){

//   document.querySelector("#btn_place_order").addEventListener("click", x);

//   document.querySelector("#btn_place_order").removeEventListener("click", x);

// }

class orderInfo {
  constructor() {
    this.customer_ID;
    this.status;
    this.TimeDate = "2023-06-19 01:03:01.101";
    this.deliveryAdress;
    this.deliveryZipCode;
    this.deliveryCity;
    this.tax;
    this.totalPrice;
  // SHOPPING CART
  }
}

class customerInfor {
 constructor() {
  this.firstName;
  this.lastName;
  this.adress;
  this.city;
  this.zipCode;
  this.email;
  this.timeDate;
 }
}


// LAV EN CREATE FORM TIL DIN ODRE!!!!!!
const placeOrderHTML =
  /*html*/
  `

  <!-- VI SKAL FINDE EN MÅDE AT TILSLUTTE EN KUNDE -->
  <label for="customerIdInput">Kunde Nummer</label>
                <input
                  type="text"
                  id="customerIdInput"
                  name="customer_id"
                  placeholder="id"
                  required
                  />


  <h3> Leverings Adresse </h3>
  <label for="deliveryAdressInput">Adresse</label>
                <input
                  type="text"
                  id="deliveryAdressInput"
                  name="deliveryAdress"
                  placeholder="Adresse"
                  required
                  />
                  
   <label for="deliveryZipCodeInput">Postnummer</label>
                <input
                  type="text"
                  id="deliveryZipCodeInput"
                  name="deliveryZipCode"
                  placeholder="0000"
                  pattern="[0-9]{4}"
                  required
                  />    

   <label for="deliveryCityInput">By/label>
                <input
                  type="text"
                  id="deliveryCityInput"
                  name="deliveryZipCode"
                  placeholder="Bynavn"
                  required
                  />    
`;

const customerInfoHTML = /*html*/
`

  <label for="firstNameInput">Adresse</label>
                <input
                  type="text"
                  id="firstNameInput"
                  name="firstName"
                  placeholder="Fornavn"
                  required
                  />

  <label for="lastNameInput">Adresse</label>
                <input
                  type="text"
                  id="lastNameNameInput"
                  name="lastName"
                  placeholder="Efternavn"
                  required
                  />                  


  <label for="emailInput">Adresse</label>
                <input
                  type="email"
                  id="emailInput"
                  name="email"
                  placeholder="eksempel@mail.dk"
                  required
                  />     

  <h3> Adresse </h3>
  <label for="adressInput">Adresse</label>
                <input
                  type="text"
                  id="adressInput"
                  name="deliveryAdress"
                  placeholder="Adresse"
                  required
                  />
                  
   <label for="zipCodeInput">Postnummer</label>
                <input
                  type="text"
                  id="zipCodeInput"
                  name="deliveryZipCode"
                  placeholder="0000"
                  pattern="[0-9]{4}"
                  required
                  />    

   <label for="cityInput">By/label>
                <input
                  type="text"
                  id="cityInput"
                  name="deliveryZipCode"
                  placeholder="Bynavn"
                  required
                  />    
`