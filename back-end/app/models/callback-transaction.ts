// models/CallBackTransaction.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '@/db-config';

class CallBackTransaction extends Model {
  public id!: string; // UUID
  public orderId!: string; // UUID
  public transactionStatus!: string;
  public serverCorrelationId!: string;
  public transactionReference?: string;
  public requestDate?: string;
  public debitParty?: string;
  public creditParty?: string;
  public fees?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CallBackTransaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Orders', // Ensure this matches the table name
      key: 'id',
    },
  },
  transactionStatus: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  serverCorrelationId: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  transactionReference: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  requestDate: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  debitParty: {
    type: DataTypes.STRING(13),
    allowNull: true,
    validate: {
      len: [10, 13],
    },
  },
  creditParty: {
    type: DataTypes.STRING(13),
    allowNull: true,
    validate: {
      len: [10, 13],
    },
  },
  fees: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'CallBackTransaction',
  tableName: 'mvola_transaction',
  timestamps: true,
});

export default CallBackTransaction;
