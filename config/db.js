const { Sequelize } = require('sequelize');
require('dotenv').config();

// 創建 Sequelize 實例
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

// 測試資料庫連接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('資料庫連接成功');
    return true;
  } catch (error) {
    console.error('資料庫連接失敗:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
};
