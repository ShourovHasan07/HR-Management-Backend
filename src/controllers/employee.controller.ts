import { Request, Response } from 'express';
import Employee from '../models/employee';

export const createEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      age,
      designation,
      hiring_date,
      date_of_birth,
      salary,
    } = req.body;

    const photo_path = req.file
      ? req.file.filename
      : null;

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
    res.status(500).json({ message: 'Failed', error });
  }
};