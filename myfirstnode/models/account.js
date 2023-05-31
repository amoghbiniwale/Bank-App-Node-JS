'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      account.belongsTo(models.user,{
        foreignKey: {
          name:"customer_id",
          allowNull : false
        }
      })

      account.belongsTo(models.bank,{
        foreignKey: {
          name:"bank_id",
          allowNull : false
        }
      })

      account.hasMany(models.transaction,{
        foreignKey:{
          name:"amount",
          allowNull:false
        }
      })
      // define association here
    }
  }
  account.init({
    account_no: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    is_active: DataTypes.INTEGER,
    bank_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};