"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionItem.init(
    {
      quantity: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionItem",
    }
  );
  return TransactionItem;
};
