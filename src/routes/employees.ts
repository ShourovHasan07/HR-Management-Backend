import express from 'express';
import upload from '../middleware/multer'
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller';

const router = express.Router();

// CREATE
router.post('/create', upload.single('photo'), createEmployee);

// READ
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);

// UPDATE
router.put('/:id', upload.single('photo'), updateEmployee);

// DELETE
router.delete('/:id', deleteEmployee);

export default router;