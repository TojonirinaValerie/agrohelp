// models/Country.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
class Country extends Model {
  public id!: string;
  public name!: string;
}

Country.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Country',
  tableName: 'Countries',
  timestamps: false, // set to true if you want createdAt/updatedAt
});

export default Country;
