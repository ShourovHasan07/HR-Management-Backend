
#  HR-Management-Backend

A production-ready **HR Management Backend API** built with **Node.js, Express, TypeScript, Sequelize, and PostgreSQL**.  
This project follows **industry standards** for backend architecture, configuration, and documentation.

## Overview

The **HR-Management-Backend** provides  APIs for managing:

- Employees
- Attendance records
- Attendance reports
- Date-based HR analytics

The project is designed to be **scalable, maintainable, and production-ready**.

## Features

- Employee management
- Attendance tracking
- Attendance report generation
- Date range filtering
- PostgreSQL database
- Sequelize ORM
- TypeScript for type safety
- Environment-based configuration


##Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Sequelize ORM
- dotenv
- Postman (API testing)

---

## Installation & Setup

### 1. Clone the Repository


git clone https://github.com/ShourovHasan07/HR-Management-Backend.git



##Install Dependencies
npm install
#Environment Configuration

#.env.example

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=hr_management_db
DB_USER=postgres
DB_PASSWORD=password

NODE_ENV=development

#Sequelize Migration
npx sequelize-cli db:migrate

# seed All 
#Running the db:seed:all command will populate the database with **20 default users** for testing purposes

npx sequelize-cli db:seed:all
#Running the Application
npm run start


##Running the db:seed:all     command will populate the database with **20 default users** for testing purposes


API Endpoints
Authentication APIs 

[         "email": "hradmin360ict@gmail.com",                 [ Login this email and password ]
          "password": "hr123456"      ]
 POST          http://localhost:3000/auth/login           [ Login system and get token ]
  




Employee APIs

 GET          http://localhost:3000/api/employees           [Get all employees]
 GET          http://localhost:3000/api/employees/3        [Get employee by ID]
 POST       http://localhost:3000/api/employees             [ Create employee ]
 PUT         http://localhost:3000/api/employees/2          [ Update employee ]
 DELETE     http://localhost:3000/api/employees/3         [ Delete employee ]


Attendance APIs

 GET           http://localhost:3000/api/attendance            [Get all attendance]
 GET           http://localhost:3000/api/attendance/3         [Get attendance by ID]
 POST         http://localhost:3000/api/attendance             [ Create attendance]
 PUT           http://localhost:3000/api/attendance/2          [ Update attendance]
 DELETE    http://localhost:3000/api/attendance/3         [ Delete attendance]



Reports APIs

 GET    http://localhost:3000/api/atten-report/attendance?month=2026-02 [Get monthly  reports ]
 GET    http://localhost:3000/api/atten-report/attendance?month=2026-02&employee_id=15 
    							[Get reports  monthly and employee_id ]

