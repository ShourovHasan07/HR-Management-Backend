'use strict';
const moment = require('moment');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Dynamic import for faker
    const { faker } = await import('@faker-js/faker');

    // Create 20 employees
    const employees = [];
    for (let i = 0; i < 20; i++) {
      employees.push({
        name: faker.person.fullName(),
        age: faker.number.int({ min: 22, max: 50 }),
        designation: faker.person.jobTitle(),
        hiring_date: moment(faker.date.past({ years: 5 })).format('YYYY-MM-DD'),
        date_of_birth: moment(faker.date.birthdate({ min: 22, max: 50, mode: 'age' })).format('YYYY-MM-DD'),
        salary: faker.number.float({ min: 30000, max: 150000, precision: 0.01 }),
        photo_path: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('employees', employees, {});

    // Fetch inserted employee IDs
    const insertedEmployees = await queryInterface.sequelize.query(
      `SELECT id FROM employees;`
    );
    const employeeIds = insertedEmployees[0].map(emp => emp.id);

    // Create random attendances for Feb 2026
    const attendances = [];
    for (const empId of employeeIds) {
      const numDays = faker.number.int({ min: 10, max: 20 });
      for (let i = 0; i < numDays; i++) {
        const day = faker.number.int({ min: 1, max: 28 });
        const check_in_hour = faker.number.int({ min: 8, max: 10 });
        const check_in_minute = faker.number.int({ min: 0, max: 59 });
        const check_in_time = `${check_in_hour.toString().padStart(2, '0')}:${check_in_minute
          .toString()
          .padStart(2, '0')}:00`;

        attendances.push({
          employee_id: empId,
          date: `2026-02-${day.toString().padStart(2, '0')}`,
          check_in_time,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('attendances', attendances, {});
    console.log('Seeded 20 employees with random attendance.');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attendances', null, {});
    await queryInterface.bulkDelete('employees', null, {});
  },
};