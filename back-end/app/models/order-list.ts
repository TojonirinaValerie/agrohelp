// models/OrderList.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import Product from './product';
import Order from './order';
class OrderList extends Model {
  public id!: string;
  public productId!: string;
  public orderId!: string;
  public quantity!: number;
}

OrderList.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Products',  // make sure this matches your actual table name
      key: 'id',
    },
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Orders',  // make sure this matches your actual table name
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'OrderList',
  tableName: 'OrderLists',
  timestamps: false, // Add timestamps: true if you want createdAt/updatedAt
});

export default OrderList;
