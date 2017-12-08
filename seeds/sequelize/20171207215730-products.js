"use strict";
let faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let products = [];
    for (let i = 0; i < 30; i++) {
      products.push({
        sku: faker.random.number(),
        name: faker.commerce.productName(),
        price: Math.floor(faker.commerce.price()),
        description: "example description", //faker.lorem.text(),
        picture:
          "https://cdn.pixabay.com/photo/2014/09/24/14/29/mac-459196_640.jpg",
        categoryId: Math.floor(Math.random() * 10) + 1 //double check
      });
    }

    return queryInterface.bulkInsert("Products", products);
  },

  down: (queryInterface, Sequelize) => {}
};
