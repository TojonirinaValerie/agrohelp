// models/Revenue.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
class Revenue extends Model {
  public id!: string;
  public shopRevenue!: string;
  public totalPriceOrderEstimated!: number;
  public totalPriceOrderConfirmed!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Revenue.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  shopRevenue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPriceOrderEstimated: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalPriceOrderConfirmed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Revenue',
  tableName: 'Revenues',
  timestamps: true,
});

export default Revenue;
