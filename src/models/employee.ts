import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import sequelize from '../config/db';

interface EmployeeAttributes {
  id: number;
  name: string;
  age: number;
  designation: string;
  hiring_date: string;
  date_of_birth: string;
  salary: number;
  photo_path?: string | null;
}

interface EmployeeCreationAttributes
  extends Optional<EmployeeAttributes, 'id' | 'photo_path'> {}

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes {

  public id!: number;
  public name!: string;
  public age!: number;
  public designation!: string;
  public hiring_date!: string;
  public date_of_birth!: string;
  public salary!: number;
  public photo_path?: string | null;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Model initialization
  public static initModel(sequelize: Sequelize) {
    Employee.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        designation: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        hiring_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        date_of_birth: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        salary: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        photo_path: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'employees',
        indexes: [
          {
            unique: true,
            fields: ['name', 'designation'], // composite unique
          },
        ],
      }
    );
  }

  // Associations
  public static associate(models: any) {
    Employee.hasMany(models.Attendance, {
      foreignKey: 'employee_id',
      as: 'attendances',
    });
  }
}

// Initialize model
Employee.initModel(sequelize);

export default Employee;