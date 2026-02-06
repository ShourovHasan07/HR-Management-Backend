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
  photo_path?: string;
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
  public photo_path?: string;

  static initModel(sequelize: Sequelize) {
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

        // COMPOSITE UNIQUE 
        indexes: [
          {
            unique: true,
            fields: ['name', 'designation'],
          },
        ],
      }
    );
  }
}

Employee.initModel(sequelize);
export default Employee;