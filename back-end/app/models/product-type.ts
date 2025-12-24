// models/ProductType.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import Category from './category';
import Product from './product';
class ProductType extends Model {
  public id!: string;
  public name!: string;
  public nameEn!: string;
  public description!: string;
  public descriptionEn!: string;
  public categoryId!: string;  // FK to Category

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductType.init({
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
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descriptionEn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Categories',  // table name for Category
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'ProductType',
  tableName: 'ProductTypes',
  timestamps: true,
});

export default ProductType;
