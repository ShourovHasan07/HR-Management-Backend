import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import HRUser from './models/hr_user';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/auth';
import { Employee } from './models/employee';
import employeeRoutes from './routes/employees';


dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Sync DB first
sequelize.sync({ alter: true }).then(async () => {
  console.log('Database & tables synced');

  // Create default HR user after table exists
  
})

// Routes
app.use('/auth', authRoutes);

app.use('/employees', employeeRoutes);



app.get('/', (req, res) => {
  res.send('HR Backend Running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));