import express, { Request, Response } from 'express';
import multer from 'multer';
import { Employee } from '../models/employee';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Create employee
router.post('/', upload.single('photo'), async (req: Request, res: Response) => {
  try {
    const { name, age, designation, hiring_date, date_of_birth, salary } = req.body;
    const photo_path = req.file ? req.file.filename : undefined;

    const employee = await Employee.create({
      name,
      age,
      designation,
      hiring_date,
      date_of_birth,
      salary,
      photo_path,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get all employees
router.get('/', async (_req: Request, res: Response) => {
  const employees = await Employee.findAll();
  res.json(employees);
});

// Get single employee
router.get('/:id', async (req: Request, res: Response) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
});

// Update employee
router.put('/:id', upload.single('photo'), async (req: Request, res: Response) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });

  const { name, age, designation, hiring_date, date_of_birth, salary } = req.body;
  const photo_path = req.file ? req.file.filename : employee.photo_path;

  await employee.update({ name, age, designation, hiring_date, date_of_birth, salary, photo_path });

  res.json(employee);
});

// Delete employee
router.delete('/:id', async (req: Request, res: Response) => {
  const employee = await Employee.findByPk(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });

  await employee.destroy();
  res.json({ message: 'Employee deleted successfully' });
});

export default router;