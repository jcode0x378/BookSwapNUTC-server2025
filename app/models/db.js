const mysql = require('mysql2/promise');
const config = require('../../config');

// 創建連接池
const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 測試資料庫連接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 資料庫連接成功!');
    console.log(
      `📊 已連接到 MySQL 資料庫: ${config.db.host}:${config.db.port}/${config.db.database}`,
    );
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ 資料庫連接失敗!');
    console.error(`🔴 錯誤信息: ${error.message}`);
    console.error('請檢查您的資料庫配置和連接信息。');
    console.error(`主機: ${config.db.host}`);
    console.error(`端口: ${config.db.port}`);
    console.error(`用戶: ${config.db.user}`);
    console.error(`資料庫: ${config.db.database}`);
    return false;
  }
}

// 執行 SQL 查詢
async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('SQL 查詢錯誤:', error.message);
    throw error;
  }
}

module.exports = {
  pool,
  query,
  testConnection,
};
