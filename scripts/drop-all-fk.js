// 引入必要的模組
require('dotenv').config();
const { sequelize } = require('../config/db');

// 刪除所有外鍵約束的腳本
const dropAllForeignKeys = async () => {
  try {
    // 禁用外鍵檢查
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    console.log('已禁用外鍵檢查');

    // 獲取當前數據庫名稱
    const [dbResult] = await sequelize.query('SELECT DATABASE() as dbName');
    const dbName = dbResult[0].dbName;
    console.log(`當前數據庫: ${dbName}`);

    // 獲取所有外鍵約束
    const [constraintsResult] = await sequelize.query(`
      SELECT 
        TABLE_NAME, 
        CONSTRAINT_NAME
      FROM 
        INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
      WHERE 
        CONSTRAINT_TYPE = 'FOREIGN KEY' 
        AND TABLE_SCHEMA = '${dbName}'
    `);

    console.log(`找到 ${constraintsResult.length} 個外鍵約束`);

    // 刪除每個外鍵約束
    for (const constraint of constraintsResult) {
      const { TABLE_NAME, CONSTRAINT_NAME } = constraint;
      console.log(`刪除 ${TABLE_NAME} 表上的 ${CONSTRAINT_NAME} 約束`);
      
      try {
        await sequelize.query(`
          ALTER TABLE \`${TABLE_NAME}\`
          DROP FOREIGN KEY \`${CONSTRAINT_NAME}\`
        `);
        console.log(`成功刪除 ${CONSTRAINT_NAME}`);
      } catch (error) {
        console.error(`刪除 ${CONSTRAINT_NAME} 失敗:`, error.message);
      }
    }

    // 刪除所有表
    console.log('嘗試刪除所有表...');
    const tableNames = [
      'collect', 'order', 'orders', 'cart', 'comment', 'favorite', 'message',
      'Transactions', 'BookImages', 'Books', 'Users'
    ];

    for (const tableName of tableNames) {
      try {
        await sequelize.query(`DROP TABLE IF EXISTS \`${tableName}\``);
        console.log(`成功刪除 ${tableName} 表`);
      } catch (error) {
        console.error(`刪除 ${tableName} 表失敗:`, error.message);
      }
    }

    console.log('完成刪除操作');
  } catch (error) {
    console.error('執行腳本時發生錯誤:', error);
  } finally {
    // 重新啟用外鍵檢查
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      console.log('已重新啟用外鍵檢查');
    } catch (innerError) {
      console.error('重新啟用外鍵檢查失敗:', innerError);
    }

    // 關閉數據庫連接
    try {
      await sequelize.close();
      console.log('已關閉數據庫連接');
    } catch (error) {
      console.error('關閉數據庫連接失敗:', error);
    }
  }
};

// 執行腳本
dropAllForeignKeys(); 