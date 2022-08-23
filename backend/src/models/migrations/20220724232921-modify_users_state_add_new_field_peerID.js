'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'player_states', // table name
        'peerId', // new field name
        {
          type: Sequelize.STRING
        }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('player_states', 'peerId'),
      ]);
    }
  }
};
