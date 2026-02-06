import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Attendance from '../models/attendance';
import Employee from '../models/employee';

/* ================= GET LIST ================= */
export const getAttendances = async (req: Request, res: Response) => {
  try {
    const { employee_id, date, startDate, endDate } = req.query;

    const where: any = {};

    if (employee_id) where.employee_id = employee_id;
    if (date) where.date = date;

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [startDate, endDate],
      };
    }

    const data = await Attendance.findAll({
      where,
      include: [{ model: Employee, attributes: ['id', 'name'] }],
      order: [['date', 'DESC']],
    });

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET BY ID ================= */
export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);

    if (!attendance)
      return res.status(404).json({ message: 'Attendance not found' });

    res.json(attendance);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CREATE OR UPSERT ================= */
export const createOrUpdateAttendance = async (
  req: Request,
  res: Response,
) => {
  try {
    const { employee_id, date, check_in_time } = req.body;

    if (!employee_id || !date || !check_in_time) {
      return res.status(400).json({
        message: 'employee_id, date & check_in_time required',
      });
    }

    //  UPSERT LOGIC
    const [attendance, created] = await Attendance.findOrCreate({
      where: { employee_id, date },
      defaults: { check_in_time },
    });

    if (!created) {
      attendance.check_in_time = check_in_time;
      await attendance.save();
    }

    res.status(created ? 201 : 200).json({
      message: created
        ? 'Attendance created'
        : 'Attendance updated',
      data: attendance,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateAttendance = async (req: Request, res: Response) => {

    //console.log(req.body)

  try {
    const attendance = await Attendance.findByPk(req.params.id);

    if (!attendance)
      return res.status(404).json({ message: 'Attendance not found' });

    const { check_in_time } = req.body;

    await attendance.update({ check_in_time });

    res.json({
      message: 'Attendance updated successfully',
      data: attendance,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);

    if (!attendance)
      return res.status(404).json({ message: 'Attendance not found' });

    await attendance.destroy();

    res.json({ message: 'Attendance deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};