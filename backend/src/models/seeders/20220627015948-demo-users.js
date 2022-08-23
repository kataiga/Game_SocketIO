'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Kataiga',
          email: 'kataiga@wam.com',
          password: 'azerty',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'futaba',
          email: 'futaba@wam.com',
          password: 'azerty',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
