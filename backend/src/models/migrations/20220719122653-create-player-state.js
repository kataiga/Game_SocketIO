'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('player_states', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pos: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('player_states');
  }
};