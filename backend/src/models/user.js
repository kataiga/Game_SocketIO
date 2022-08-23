'use strict';
const bcrypt = require('bcryptjs')
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    attemps: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async function(user, options) {
    const password = await cryptPassword(user.password)
    user.password = password
  })

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
  }

  function cryptPassword(password) {
    return new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, function (err, salt) {
        if(err) return reject(err)
        bcrypt.hash(password, salt, function (err, hash) {
          if(err) return reject(err)
          resolve(hash)
        })
      })
    })
  }

  return User;
};