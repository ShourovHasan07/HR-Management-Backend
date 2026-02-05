'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('hr123456', 10);

    await queryInterface.bulkInsert('hr_users', [
      {
        name: 'Admin',
        email: 'hradmin360ict@gmail.com',
        password_hash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hr_users', { email: 'hradmin360ict@gmail.com' }, {});
  },
};