"use strict";
let faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let categories = [];
    for (let i = 0; i < 10; i++) {
      categories.push({
        name: faker.commerce.department()
      });
    }

    return queryInterface.bulkInsert("Categories", categories);
  },

  down: (queryInterface, Sequelize) => {}
};
