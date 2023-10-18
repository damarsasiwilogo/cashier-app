'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Account, { foreignKey: 'userId' });
    }
  }
  Transaction.init({
    userId: DataTypes.INTEGER,
    totalAmount: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true,
        min: 0
      }
    },   
    items: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
