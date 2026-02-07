import { Request, Response } from 'express';
import Employee from '../models/employee';
import moment from 'moment';
import { Op } from 'sequelize';

//create
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, age, designation, hiring_date, date_of_birth, salary } =
      req.body;

    if (!name || !designation)
      return res.status(400).json({ message: 'Name & designation required' });

    // Date validation
    if (
      !moment(hiring_date, 'YYYY-MM-DD', true).isValid() ||
      !moment(date_of_birth, 'YYYY-MM-DD', true).isValid()
    ) {
      return res.status(400).json({
        message: 'Date format must be YYYY-MM-DD',
      });
    }

    // Duplicate check
    const exists = await Employee.findOne({
      where: { name, designation },
    });

    if (exists) {
      return res.status(409).json({
        message: 'Employee with same name & designation already exists',
      });
    }

    const photo_path = req.file ? req.file.filename :undefined;

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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    //  Read query params
    const {
      search = '',
      page = '1',
      limit = '10',
      sortBy = 'id',
      sortOrder = 'ASC',
    } = req.query as any;

    //  Pagination calculation
    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.max(Number(limit), 1);
    const offset = (pageNumber - 1) * pageSize;

    //  Search condition 
    const whereCondition: any = {};

    if (search) {
      whereCondition[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { designation: { [Op.iLike]: `%${search}%` } },
      ];
    }

    //  DB query 
    const { rows, count } = await Employee.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset,
      order: [[sortBy, sortOrder]],
    });

    //  Pagination meta
    const totalPages = Math.ceil(count / pageSize);

    //  Final response 
    res.status(200).json({
      items: rows,
      pagination: {
        currentPage: pageNumber,
        pageSize,
        totalItems: count,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to fetch employees',
      error: error.message,
    });
  }
};

//get by id 
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });

    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//update
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });

    const {
      name,
      age,
      designation,
      hiring_date,
      date_of_birth,
      salary,
    } = req.body;

    // Duplicate check 
    // if (name && designation) {
    //   const duplicate = await Employee.findOne({
    //     where: { name, designation },
    //   });

    //   if (duplicate && duplicate.id !== employee.id) {
    //     return res.status(409).json({
    //       message: 'Duplicate employee detected',
    //     });
    //   }
    // }

    const photo_path = req.file
      ? req.file.filename
      : employee.photo_path;

    await employee.update({
      name,
      age,
      designation,
      hiring_date,
      date_of_birth,
      salary,
      photo_path,
    });

    res.json({
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// delete 
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee)
      return res.status(404).json({ message: 'Employee not found' });

    await employee.destroy();

    res.json({ message: 'Employee deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};