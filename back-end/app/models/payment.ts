// models/Payment.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import PaymentType from './payment-type';
class Payment extends Model {
  public id!: string;
  public date!: Date;
  public status!: string;
  public orderId!: string;
  public amount!: number;
  public paymentTypeId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true, // Mongoose's `timestamps: true` adds createdAt/updatedAt, so date can be optional or handled separately
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Orders',  // match your Orders table name
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentTypeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'PaymentTypes',  // match your PaymentTypes table name
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'Payments',
  timestamps: true, // adds createdAt and updatedAt
});

export default Payment;
