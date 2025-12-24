// models/City.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';

class City extends Model {
  public id!: string;
  public name!: string;
  public region!: string;
}

City.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'City',
  tableName: 'Cities',
  timestamps: false, // Only add if you need createdAt/updatedAt
});

export default City;
