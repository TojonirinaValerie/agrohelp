// models/Contact.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';
class Contact extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public subject!: string;
  public message!: string;
}

Contact.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // optional: validates email format
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Contact',
  tableName: 'Contacts',
  timestamps: true, // adds createdAt and updatedAt
});

export default Contact;
