'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.account,{
        foreignKey: {
          name:"customer_id",
          allowNull : false
        }
      })
      // define association here
    }
  }
  user.init({
    user_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};