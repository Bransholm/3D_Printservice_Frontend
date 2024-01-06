// local host endpoint for testing...
const endpoint = "http://localhost:4811/";

function testMakeOrder() {
  const data = {
    CustomerInfo: {
      firstName: "Kasper",
      lastName: "Bordal",
      adress: "Kildebakken 23",
      zipCode: 3390,
      city: "Hundested",
      email: "LL431@gmail.com",
    },
    OdrderInfo: {
      status: "ordered",
      deliveryAdress: "Kildebakken 23",
      deliveryZipCode: 3390,
      deliveryCity: "Hundested",
      totalTax: 260.0,
      totalPrice: 640.0,
      shippingPrice: 40.0,
    },
    Order_Lines: [
      {
        catalogue_ID: 1,
        amount: 3,
        productSize: 2,
        itemPrice: 400.0,
        itemTax: 45.0,
        stock_ID: 3,
      },
      {
        catalogue_ID: 12,
        amount: 1,
        productSize: 10,
        itemPrice: 100.0,
        itemTax: 22.0,
        stock_ID: 12,
      },
    ],
  };
  postCompleteOrder(data);
}

// REST PRINCIPERNE: SKAL VI IKKE HAVE 2 ROTUES SÅ ELLERS - HVAD SÅ MED VORES REST API??!

async function postCompleteOrder(data) {
  console.log("POSTING: ", data);
  try {
    const response = await fetch(`${endpoint}makeOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(data),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      const result = await response.json();
      console.log(result);
    }

    return;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
}

export { postCompleteOrder, testMakeOrder };
