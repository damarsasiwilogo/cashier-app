'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transactionItem.init({
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactionItem',
  });
  return transactionItem;
};