import { Sequelize } from "sequelize";
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: false,
  define: {
    freezeTableName: true
  },
  /*dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // only if you're getting self-signed cert errors
    },
  },*/
});

export default sequelize;