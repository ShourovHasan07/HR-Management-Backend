'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attendances', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      check_in_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Unique constraint
    await queryInterface.addConstraint('attendances', {
      fields: ['employee_id', 'date'],
      type: 'unique',
      name: 'unique_employee_attendance_per_day',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attendances');
  },
};