'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player_state extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  player_state.init({
    pos: DataTypes.STRING,
    username: DataTypes.STRING,
    model: DataTypes.STRING,
    connected: DataTypes.INTEGER,
    peerId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'player_state',
  });
  return player_state;
};