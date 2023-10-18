'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Product, { foreignKey: 'productId' });
      Cart.belongsTo(models.Account, { foreignKey: 'userId' }); // Add this line
    }
  }

  Cart.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,  // Add this line
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });

  return Cart;
};