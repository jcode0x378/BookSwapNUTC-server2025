const User = require('./User');
const Book = require('./Book');
const BookImage = require('./BookImage');
const Transaction = require('./Transaction');
const Order = require('./Order');
const { sequelize } = require('../../config/db');

// 設置關聯
User.hasMany(Book, { foreignKey: 'userId', as: 'books' });
Book.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Book.hasMany(BookImage, { foreignKey: 'bookId', as: 'images' });
BookImage.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

User.hasMany(Transaction, { foreignKey: 'sellerId', as: 'soldTransactions' });
User.hasMany(Transaction, { foreignKey: 'buyerId', as: 'boughtTransactions' });
Transaction.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
Transaction.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });
Transaction.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// 訂單關聯
User.hasMany(Order, { foreignKey: 'buyerId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });
Order.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
Order.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// 同步模型到資料庫
const syncDatabase = async () => {
  try {
    // 禁用外鍵檢查
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    console.log('已禁用外鍵檢查');

    // 刪除可能存在的引用 users 表的表
    try {
      await sequelize.query('DROP TABLE IF EXISTS `collect`');
      await sequelize.query('DROP TABLE IF EXISTS `order`');
      await sequelize.query('DROP TABLE IF EXISTS `cart`');
      await sequelize.query('DROP TABLE IF EXISTS `comment`');
      await sequelize.query('DROP TABLE IF EXISTS `favorite`');
      await sequelize.query('DROP TABLE IF EXISTS `message`');
      console.log('已刪除可能引用 users 表的表');
    } catch (error) {
      console.error('刪除相關表失敗:', error);
    }

    // 使用 force: false 不會刪除並重建所有表，而是保留現有數據
    // 在生產環境中使用 force: false 或 alter: true 進行更安全的同步
    await sequelize.sync({ force: false });
    console.log('資料庫同步成功');

    // 重新啟用外鍵檢查
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('已重新啟用外鍵檢查');
  } catch (error) {
    console.error('資料庫同步失敗:', error);
    // 確保在出錯時也會重新啟用外鍵檢查
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (innerError) {
      console.error('重新啟用外鍵檢查失敗:', innerError);
    }
  }
};

module.exports = {
  User,
  Book,
  BookImage,
  Transaction,
  Order,
  syncDatabase,
};
