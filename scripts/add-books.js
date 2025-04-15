require('dotenv').config();
const { User, Book, BookImage } = require('../app/models');
const { sequelize } = require('../config/db');

// 添加更多書籍數據
const addMoreBooks = async () => {
  try {
    console.log('開始添加更多書籍數據...');

    // 獲取用戶數據
    const users = await User.findAll();
    if (users.length === 0) {
      throw new Error('找不到用戶數據，請先執行 init-db.js');
    }

    // 創建10本新書籍
    const books = await Book.bulkCreate([
      {
        title: 'JavaScript高級程序設計',
        author: '馬特·弗里斯比',
        isbn: '9787115381880',
        price: 450,
        condition: '全新',
        description: '這是學習JavaScript不可缺少的一本書，包含了從基礎到高級的所有內容。',
        status: 'selling',
        userId: users[0].id,
      },
      {
        title: 'Python資料科學手冊',
        author: '杰克·範德普拉斯',
        isbn: '9787302505228',
        price: 380,
        condition: '良好',
        description: '這本書涵蓋了Python在資料科學領域的應用，包括NumPy、Pandas、Matplotlib等庫的使用。',
        status: 'selling',
        userId: users[0].id,
      },
      {
        title: '深入理解計算機系統',
        author: '蘭德爾·布萊恩特',
        isbn: '9787111544937',
        price: 520,
        condition: '全新',
        description: '這是一本深入講解計算機硬件、操作系統和網絡的書籍，被稱為計算機科學的"聖經"。',
        status: 'selling',
        userId: users[1].id,
      },
      {
        title: '演算法導論',
        author: '科爾曼',
        isbn: '9787111407010',
        price: 490,
        condition: '良好',
        description: '這是一本經典的演算法教材，涵蓋了基礎到高級的各種演算法。',
        status: 'selling',
        userId: users[1].id,
      },
      {
        title: '設計模式：可復用面向對象軟件的基礎',
        author: 'Erich Gamma',
        isbn: '9787111213826',
        price: 350,
        condition: '一般',
        description: '本書介紹了23種經典設計模式，對軟件開發人員非常有幫助。',
        status: 'selling',
        userId: users[0].id,
      },
      {
        title: '資料庫系統概念',
        author: '西爾伯沙茨',
        isbn: '9787111375296',
        price: 410,
        condition: '良好',
        description: '本書是資料庫領域的經典教材，介紹了資料庫系統的基本原理和技術。',
        status: 'selling',
        userId: users[0].id,
      },
      {
        title: '人工智能：一種現代方法',
        author: '斯圖爾特·羅素',
        isbn: '9787302275954',
        price: 580,
        condition: '全新',
        description: '這是一本人工智能領域的經典教材，涵蓋了從搜索算法到機器學習的各種主題。',
        status: 'selling',
        userId: users[1].id,
      },
      {
        title: '編譯原理',
        author: '艾霍',
        isbn: '9787111251217',
        price: 320,
        condition: '良好',
        description: '這本書深入講解了編譯器的工作原理，是學習編譯技術的必讀書籍。',
        status: 'selling',
        userId: users[1].id,
      },
      {
        title: '數字電路與計算機體系結構',
        author: '大衛·帕特森',
        isbn: '9787111478645',
        price: 380,
        condition: '一般',
        description: '這本書從數字電路基礎講起，深入淺出地介紹了計算機體系結構。',
        status: 'selling',
        userId: users[0].id,
      },
      {
        title: '軟件工程：實踐者的研究方法',
        author: '羅傑·普雷斯曼',
        isbn: '9787115358134',
        price: 400,
        condition: '全新',
        description: '這是一本關於軟件工程實踐的書籍，涵蓋了從需求分析到測試的整個軟件生命週期。',
        status: 'selling',
        userId: users[1].id,
      },
    ]);

    console.log('成功添加10本新書籍');

    // 為每本書添加圖片
    const bookImages = [];
    for (let i = 0; i < books.length; i++) {
      bookImages.push({
        url: `/uploads/book${i + 4}-image1.jpg`, // 從book4開始，因為前3本已在init-db中添加
        bookId: books[i].id,
      });
    }

    await BookImage.bulkCreate(bookImages);
    console.log('成功添加書籍圖片');

    // 添加一些隨機類別的書籍到系統
    const categories = ['程式設計', '資料庫', '網路', '人工智能', '作業系統', '軟體工程'];
    const conditions = ['全新', '良好', '一般', '破損'];
    const randomBooks = [];

    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomPrice = Math.floor(Math.random() * 500) + 100; // 100-600的價格
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

      randomBooks.push({
        title: `${randomCategory}實用指南 ${i + 1}`,
        author: `作者${i + 1}`,
        isbn: `978${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        price: randomPrice,
        condition: randomCondition,
        description: `這是一本關於${randomCategory}的實用指南，適合初學者和有經驗的開發者。`,
        status: 'selling',
        userId: randomUser.id,
      });
    }

    const additionalBooks = await Book.bulkCreate(randomBooks);
    console.log('成功添加10本隨機書籍');
    
    // 為每本隨機書籍添加圖片
    const additionalImages = [];
    for (let i = 0; i < additionalBooks.length; i++) {
      additionalImages.push({
        url: `/uploads/random-book${i + 1}-image.jpg`,
        bookId: additionalBooks[i].id,
      });
    }

    await BookImage.bulkCreate(additionalImages);
    console.log('成功添加隨機書籍圖片');

    console.log('書籍數據添加完成！');
  } catch (error) {
    console.error('添加書籍數據失敗:', error);
  } finally {
    // 關閉資料庫連接
    await sequelize.close();
  }
};

// 執行腳本
addMoreBooks();
