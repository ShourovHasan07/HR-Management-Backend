import { Request, Response } from 'express';
import { Op, fn, col, literal } from 'sequelize';
import Attendance from '../models/attendance';
import Employee from '../models/employee';
import moment from 'moment';

export const getAttendanceReport = async (req: Request, res: Response) => {
  try {
    const { month, employee_id } = req.query as any;

    //  Validate month
    if (!month || !moment(month, 'YYYY-MM', true).isValid()) {
      return res.status(400).json({ message: 'month query param is required in YYYY-MM format' });
    }

    const startDate = moment(month, 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
    const endDate = moment(month, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');

    //  Build where condition
    const whereCondition: any = {
      date: { [Op.between]: [startDate, endDate] }
    };
    if (employee_id) {
      whereCondition.employee_id = employee_id;
    }

    //  Fetch attendances with employee info
    const attendances = await Attendance.findAll({
      where: whereCondition,
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['id', 'name']
        }
      ]
    });

    //  Process summary per employee
    const reportMap: Record<number, { employee_id: number; name: string; days_present: number; times_late: number }> = {};

    attendances.forEach(att => {
      const emp = att.getDataValue('employee');
      if (!reportMap[emp.id]) {
        reportMap[emp.id] = { employee_id: emp.id, name: emp.name, days_present: 0, times_late: 0 };
      }

      reportMap[emp.id].days_present += 1;

      if (att.check_in_time > '09:45:00') {
        reportMap[emp.id].times_late += 1;
      }
    });

    const report = Object.values(reportMap);

    res.status(200).json({ month, report });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};