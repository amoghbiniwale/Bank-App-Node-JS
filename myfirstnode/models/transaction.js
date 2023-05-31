'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    
    static associate(models) {
      // define association here
      
    }
  }
  transaction.init({
    tid: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING,
    transaction_type: DataTypes.STRING,
    sender_accid: DataTypes.INTEGER,
    reciver_acc_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};