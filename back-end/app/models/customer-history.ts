// models/CustomerHistory.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import Address from './address';

class CustomerHistory extends Model {
  public id!: string;
  public totalOrder!: number;
  public totalSpent!: number;
  public customerId!: string; // FK to Address.id

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Optional: association
  public customer?: typeof Address;
}

CustomerHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    totalOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSpent: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Addresses', // DB table name of Address
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'CustomerHistory',
    tableName: 'CustomerHistories',
    timestamps: true,
  }
);

export default CustomerHistory;
