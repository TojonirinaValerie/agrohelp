// models/TopSelling.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import Product from './product';
class TopSelling extends Model {
  public id!: string;
  public productId!: string;
  public totalOrder!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TopSelling.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Products', // your Product table name
      key: 'id',
    },
  },
  totalOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'TopSelling',
  tableName: 'TopSellings',
  timestamps: true,
});

export default TopSelling;
