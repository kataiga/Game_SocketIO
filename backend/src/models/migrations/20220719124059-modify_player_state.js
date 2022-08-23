'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
    queryInterface.addColumn(
      'player_states', // table name
      'userId', // new field name
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
      }),
  ]);
  },

  async down (queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('player_states', 'userId'),
      ]);
    }
  }
};
