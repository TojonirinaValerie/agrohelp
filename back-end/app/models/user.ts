// models/User.ts
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '@/db-config';
export enum Status {
  Pending = 'Pending',
  Active = 'Active',
  Disabled = 'Disabled',
  // Add your other statuses here
}

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public status!: Status;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Override toJSON to remove password field
  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }

  // Check password method (optional helper)
  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(Status)),
    allowNull: false,
    defaultValue: Status.Pending,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user: User) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user: User) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

export default User;
