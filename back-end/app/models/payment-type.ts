// models/PaymentType.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import Payment from './payment';
class PaymentType extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
}

PaymentType.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'PaymentType',
  tableName: 'PaymentTypes',
  timestamps: false, // set to true if you want createdAt/updatedAt
});

export default PaymentType;
