require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User, Book, BookImage, Transaction } = require('../app/models');
const { sequelize } = require('../config/db');

// 初始化資料庫
const initDatabase = async () => {
  try {
    // 禁用外鍵檢查
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    console.log('已禁用外鍵檢查');

    // 手動刪除所有可能引用 users 表的表
    try {
      // 刪除 collect 表
      await sequelize.query('DROP TABLE IF EXISTS `collect`');
      console.log('已刪除 collect 表');

      // 刪除 order 表
      await sequelize.query('DROP TABLE IF EXISTS `order`');
      console.log('已刪除 order 表');

      // 刪除其他可能引用 users 表的表
      await sequelize.query('DROP TABLE IF EXISTS `cart`');
      await sequelize.query('DROP TABLE IF EXISTS `comment`');
      await sequelize.query('DROP TABLE IF EXISTS `favorite`');
      await sequelize.query('DROP TABLE IF EXISTS `message`');
      console.log('已刪除其他可能引用 users 表的表');
    } catch (error) {
      console.error('刪除相關表失敗:', error);
    }

    // 同步資料庫模型
    await sequelize.sync({ force: true });
    console.log('資料庫已重置');

    // 重新啟用外鍵檢查
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('已重新啟用外鍵檢查');

    // 創建測試用戶
    const users = await User.bulkCreate([
      {
        username: '測試用戶1',
        email: 'user1@example.com',
        password: await bcrypt.hash('password123', 10),
        phone: '0912345678',
        department: '資訊工程系',
        bio: '這是測試用戶1的自我介紹',
        avatar: '/uploads/default-avatar.png',
      },
      {
        username: '測試用戶2',
        email: 'user2@example.com',
        password: await bcrypt.hash('password123', 10),
        phone: '0923456789',
        department: '電機工程系',
        bio: '這是測試用戶2的自我介紹',
        avatar: '/uploads/default-avatar.png',
      },
    ]);

    console.log('已創建測試用戶');

    // 創建測試書籍
    const books = await Book.bulkCreate([
      {
        title: '數據結構',
        author: '張三',
        isbn: '9787302444541',
        price: 300,
        condition: '良好',
        description:
          '這是一本關於數據結構的教科書，包含了基本的數據結構和算法。',
        status: 'selling',
        userId: users[0].id,
      },
      {
        title: '計算機網絡',
        author: '李四',
        isbn: '9787302444542',
        price: 250,
        condition: '全新',
        description:
          '這是一本關於計算機網絡的教科書，包含了基本的網絡協議和架構。',
        status: 'selling',
        userId: users[0].id,
      },
      {
        title: '操作系統',
        author: '王五',
        isbn: '9787302444543',
        price: 280,
        condition: '一般',
        description:
          '這是一本關於操作系統的教科書，包含了基本的操作系統概念和原理。',
        status: 'sold',
        soldAt: new Date(),
        userId: users[1].id,
      },
    ]);

    console.log('已創建測試書籍');

    // 創建測試書籍圖片
    await BookImage.bulkCreate([
      {
        url: '/uploads/book1-image1.jpg',
        bookId: books[0].id,
      },
      {
        url: '/uploads/book2-image1.jpg',
        bookId: books[1].id,
      },
      {
        url: '/uploads/book3-image1.jpg',
        bookId: books[2].id,
      },
    ]);

    console.log('已創建測試書籍圖片');

    // 創建測試交易
    await Transaction.bulkCreate([
      {
        bookId: books[2].id,
        sellerId: users[1].id,
        buyerId: users[0].id,
        status: 'completed',
      },
    ]);

    console.log('已創建測試交易');

    console.log('資料庫初始化完成');
  } catch (error) {
    console.error('資料庫初始化失敗:', error);
  } finally {
    try {
      // 確保外鍵檢查被重新啟用
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      // 關閉資料庫連接
      await sequelize.close();
    } catch (error) {
      console.error('關閉資料庫連接失敗:', error);
    }
  }
};

// 執行初始化
initDatabase();
