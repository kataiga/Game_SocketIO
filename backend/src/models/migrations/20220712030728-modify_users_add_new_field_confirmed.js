'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'confirmed', // new field name
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: true,
        },
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'confirmed'),
    ]);
  }
};
