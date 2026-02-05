import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class HRUser extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
}

HRUser.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'hr_users',
    timestamps: true,
  }
);

export default HRUser;