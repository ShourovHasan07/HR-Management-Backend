import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Attendance extends Model {
  public id!: number;
  public employee_id!: number;
  public date!: string;
  public check_in_time!: string;
}

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    check_in_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'attendances',
  }
);

export default Attendance;