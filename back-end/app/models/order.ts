// models/Order.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import OrderList from './order-list';
import Address from './address';
class Order extends Model {
  public id!: string;
  public addressId!: string;
  public status!: string;
  public paymentStatus!: string;
  public paymentId?: string; // nullable FK to CallBackTransaction

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  addressId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Addresses',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'mvola_transaction', // or your CallBackTransaction table name
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'Orders',
  timestamps: true, // automatically manages createdAt and updatedAt
});

export default Order;
