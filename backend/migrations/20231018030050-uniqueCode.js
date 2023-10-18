"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Accounts", "uniqueCode", {
      type: Sequelize.STRING,
      after: "photoProfile",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Accounts", "uniqueCode");
  },
};
