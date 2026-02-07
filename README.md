
#  HR-Management-Backend

A production-ready **HR Management Backend API** built with **Node.js, Express, TypeScript, Sequelize, and PostgreSQL**.  
This project follows **industry standards** for backend architecture, configuration, and documentation.

## Overview

The **HR-Management-Backend** provides RESTful APIs for managing:

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

## 📂 Project Structure
HR-Management-Backend/
│
├── src/
│ ├── controllers/
│ │ └── report.controller.ts
│ ├── routes/
│ │ └── report.routes.ts
│ ├── models/
│ │ ├── employee.ts
│ │ └── attendance.ts
│ ├── config/
│ │ └── database.ts
│ ├── app.ts
│ └── server.ts
│
├── migrations/
│ └── 001_create_hr_tables.sql
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md



---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/HR-Management-Backend.git
cd HR-Management-Backend



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

npx sequelize-cli db:seed:all
#Running the Application
npm run start
