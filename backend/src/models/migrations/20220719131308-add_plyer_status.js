'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'player_states', // table name
        'connected', // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('player_states', 'connected'),
      ]);
    }
  }
};
