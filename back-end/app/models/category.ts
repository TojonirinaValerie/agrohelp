// models/Category.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import ProductType from './product-type';

class Category extends Model {
  public id!: string;
  public name!: string;
  public nameEn!: string;
  public description!: string;
  public descriptionEn!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init({
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
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'Categories',
  timestamps: true,
});

export default Category;
