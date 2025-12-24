// models/Product.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
class Product extends Model {
  public id!: string; // UUID primary key
  public name!: string;
  public nameEn!: string;
  public description?: string;
  public descriptionEn?: string;
  public image?: string;
  public barcode!: string;
  public in_stock!: boolean;
  public quantity!: number;
  public retailer_price!: number;
  public consumer_price!: number;
  public featured!: boolean;
  public typeId!: string;  // FK to ProductType
  public userId!: string;  // FK to User

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameEn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  descriptionEn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  in_stock: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  retailer_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  consumer_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  typeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'ProductTypes',  // your ProductType table name
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',  // your User table name
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'Products',
  timestamps: true,
});

export default Product;
