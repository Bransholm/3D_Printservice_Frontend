# Welcome to the "3D Printservice" Frontend Repository! 👋

Hello and thank you for dropping by! You've landed in the digital home of our frontend application for our exam project: the "3D Printservice."

This is a web-shop, offering a wide range of 3D-printed products right at your fingertips. So if you like 3D-prints, you've come to the right place.

This is our first attempt at creating a web-shop application from scratch.

We're glad to have you here, feel free to dive in and discover what our frontend application "3D Printservice" has to offer!

---

# Introduction

This is our frontend repository for our 2nd semester exam project. The exam project requires the students to contact a business and create web-based application as a functional solution which would either fill a gap where they needed a web based solution, or help make an existing solution better.

We are TEAM10, a trio composed of the following members;

- **[Kenneth Bransholm Schou](https://github.com/Bransholm)**
- **[Lukas Aleksander Maibom](https://github.com/luma0001)**
- **[Thomas Gorm Neermark](https://github.com/Gorm-git)**

We ended up getting into contact with a startup buisness "3D-Printservice. With an entrepreneur minded PO dreaming about starting his own company based around selling 3D-printed products on their own web-shop.
Lacking experience and knowledge of how to make said web-shop, but full of ideas about different functionalities they figured would make a stable fundament for a web-shop. After discussing what we would or wouldn't be able to make, we ended up agreeing to try our best to create a fullstack solution, where we would try our best to make a 3D-webshop from the ground up.

**Let's dive in.**

---

## Table of Contents

- [Essential Links](#essential-links)
- [Installation Manual](#installation-manual)
- [User Features](#usage-guide)
  - [Browsing As A Customer](#browsing-as-a-customer)
  - [Using The Admin View](#using-the-admin-view)
- [Technologies Used](#technologies-used)
- [Conclusion & Contribution](#conclusion-&-contribution)

---

## Essential Links

- Link to the backend repository [3D-Printshop-Backend-Repository](https://github.com/Bransholm/3D_Printservice_Backend)

- Link to the frontend repository [3D-Printshop-Frontend-Repository](https://github.com/Bransholm/3D_Printservice_Frontend)

- Link to the deployed frontend application [3D-Printshop-frontend](https://bransholm.github.io/3D_Printservice_Frontend/)

- Link to the deployed backend application [3D-Printshop-backendAzure](http://3dprintservice.azurewebsites.net)

---

If you don't fancy clicking those links, or they refuse to function as intended, then you can copy the raw link here:

1.  Backend Repository

```bash
 https://github.com/Bransholm/3D_Printservice_Backend
```

2.  Frontend Repository

```bash
 https://github.com/Bransholm/3D_Printservice_Frontend
```

3.  Deployed Frontend

```bash
 https://bransholm.github.io/3D_Printservice_Frontend/
```

4.  Deployed Backend/Azure

```bash
 http://3dprintservice.azurewebsites.net
```

---

## Installation Manual

**Using Github Desktop**

You have to install [GitHub Desktop](https://desktop.github.com/), or else this it won't work

1. Follow the link to the [Frontend Repository](https://github.com/Bransholm/3D_Printservice_Frontend)

2. Now you'll have to clone the repository. Click the big green button: **<>Code**

3. Clone the repository. and choose the option; **Open with GitHub Desktop**

4. Decide a preferred location for the file or modify the name, which ever suits you, then you are ready to go

**Using The Terminal**

You have to install [Git](https://git-scm.com/downloads) in order to make this work

1. First you'll have to open your terminal, preferably the bash terminal.

2. Navigate to a location where you want to save the file
   (having trouble navigating in the terminal? [Terminal guide for dummies](https://www.freecodecamp.org/news/command-line-for-beginners/))

3. Now paste the following bash commandline into your terminal:

```bash
git clone https://github.com/Bransholm/3D_Printservice_Frontend.git
```

**After successfully cloning the repository, you'll be able to run the app locally**

Assuming you're using [Visual Studio Code](https://code.visualstudio.com/)

1. Download the live server extension: "Live Server" copy the following into the extensions searchfield and press "Enter".

```bash
ritwickdey.LiveServer
```

2. Open the explorer

3. Now you can decide to use the app as a customer or as an admin.

4. Rightclick either the index.html form under the admin folder, or the index.html file from the root of the project.

5. Choose "Open with Live Server"

6. The server is now running [locally](http://127.0.0.1:5500/index.html) and your viewing it as a customer.

```bash
http://127.0.0.1:5500/index.html
```

or choose the [admin index](http://127.0.0.1:5500/admin/index.html)

```bash
http://127.0.0.1:5500/admin/index.html
```

**If you intend to run everything locally, make sure you have started the backend using npm start**

---

## User Features

### Browsing As A Customer

---

- **Browse the catalogue**, look for your desired product.

- **Filter for your desired category**, and only browse your favorite category.

- **Search for a specific product**, or narrow the search by applying the filter as well!

- **Click on your desired product**.

- **Get a detailed overview of the specific product**.

- **Choose the desired size, materials and how many prints you desire**.

- **The price will change dynamicly as you choose between different materials, the desired size as well as how many copies you want**.

- **Add it to your shopping cart**, maybe you arent done shopping, well feel free to go back and browse the catalogue.

- **Return to shopping cart whenever you want** The items you've decided to buy is still in there waiting for you.

- **Time to make your purchase** After you've added all your desired products to the shopping cart, then go to your shopping cart.

- **Start by entering your email**, the information you put into the fields specifying delivery and etc, will now be bound.

- **We remember you**, after making a purchase a couple weeks ago, you decide to make another order, after typing in your email, the rest of the fields will autofill the form, based off your last purchase!

- **Remember to update the form**, maybe you've moved or you want your purchase to be delivered somewhere else.

- **Contact us**, go to the info page if you want to know us better.

- **Viewing the products you ordered**. Just remember that you have to contact us manually to obtain your order.ID .

---

## Using The Admin View

<!-- - **View all orders and their state in the order view**(missing) -->

<!-- - **Update the state of specific orders**, did the customer pay for their products? Is the product in transit to its destination? Or maybe it already arrived?(missing) -->

- **Create new products for the catalogue in the products view**, remember to upload the image file to the image folder!

- **Update a product from the catalogue list**

- **Choose which product are active and can be bought by the customer**. Changing the state of a product to inactive will hide/disable it for the customer

- **Delete unused products from the catalogue list**

- **View the current stock of materials**

- **Update the state of stock materiale on the stocklist,making it either "Instock" or "Sold out"**. Enjoy the modal confirming the current changes you just made

- **Clicking on the Opdater button from the stock table will autofill the update form**

---

## Technologies Used

- HTML

- CSS

- JavaScript

- Github pages

- Azure

---

## Conclusion & Contribution

### 1. Conclusion

We aimed to create a our data structure based off of the principles of the MVC software design pattern. While some functionalities might have been placed incorrect, we've been able to make a somewhat coherent program logic.

**This project was made by created in collaboration by Kenneth Brandsholm Schou, Lukas Aleksander Maibom & Thomas Gorm Neermark**

**KEA Dat23V1**

### 2. Contribution

Did you stumble across some bugs, or do you have some insights on how we could expand the funktionality of our web-shop? Then feel free to let us know! Fork the project and start making changes!

This is an open source product, and we appreciate any contributions to further develop the "3D-Printshop" web-shop.

---
