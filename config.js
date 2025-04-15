const path = require('path');
require('dotenv').config(); // 加載環境變數

// 資料庫配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bookswap',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// JWT 配置
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

// 上傳文件配置
const uploadConfig = {
  path: process.env.UPLOAD_PATH || './public/uploads',
  maxSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
};

// 導出配置
module.exports = {
  db: dbConfig,
  jwt: jwtConfig,
  upload: uploadConfig,
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
};
