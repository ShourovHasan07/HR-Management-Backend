import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import HRUser from './models/hr_user';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/auth.routes';

import employeeRoutes from './routes/employees';
import attandenceRoutes from './routes/attendance.routes';
import reportRoutes from './routes/report.routes';
import { Employee } from './models/employee';


dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Sync DB first
sequelize.sync({ alter: true }).then(async () => {
  console.log('Database & tables synced');

 
  
})

// Routes
app.use('/auth', authRoutes);

app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attandenceRoutes);
app.use('/api/atten-report', reportRoutes);



app.get('/', (req, res) => {
  res.send('HR Backend Running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));