import express from 'express';
import upload from '../middleware/multer';
import { createEmployee } from '../controllers/employee.controller';

const router = express.Router();

router.post(
  '/employees',
  upload.single('photo'),
  createEmployee
);

export default router;