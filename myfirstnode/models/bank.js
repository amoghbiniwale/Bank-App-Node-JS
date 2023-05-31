'use strict';
const {
  Model
} = require('sequelize');
const account = require('./account');
module.exports = (sequelize, DataTypes) => {
  class bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bank.hasMany(models.account,{
        foreignKey: {
          name:"bank_id",
          allowNull : false
        }
      })
      // define association here
    }
  }
  bank.init({
    name: DataTypes.STRING,
    abbrv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bank',
  });
  return bank;
};