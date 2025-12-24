// models/Address.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
import Order from './order';
import Country from './country';
import City from './city';
import CustomerHistory from './customer-history';

class Address extends Model {
  public id!: string; // UUID
  public fullName!: string;
  public house_address!: string;
  public cityId!: string;
  public countryId!: string;
  public postal_code!: string;
  public phone_number!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  house_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cityId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Cities',
      key: 'id',
    },
  },
  countryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Countries',
      key: 'id',
    },
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Address',
  tableName: 'Addresses',
  timestamps: true,
});

export default Address;
