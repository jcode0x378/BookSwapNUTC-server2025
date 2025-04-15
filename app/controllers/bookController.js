const { Book, BookImage, User } = require('../models');
const { Op } = require('sequelize');

// 獲取所有書籍
exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'newest' } = req.query;
    const offset = (page - 1) * limit;

    // 排序選項
    let order;
    switch (sort) {
      case 'newest':
        order = [['createdAt', 'DESC']];
        break;
      case 'oldest':
        order = [['createdAt', 'ASC']];
        break;
      case 'price_high':
        order = [['price', 'DESC']];
        break;
      case 'price_low':
        order = [['price', 'ASC']];
        break;
      default:
        order = [['createdAt', 'DESC']];
    }

    // 查詢條件
    const where = {
      status: 'selling', // 只顯示在售的書籍
    };

    // 查詢書籍
    const { count, rows: books } = await Book.findAndCountAll({
      where,
      order,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: BookImage,
          as: 'images',
          attributes: ['id', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });

    // 處理書籍數據
    const formattedBooks = books.map(book => {
      const bookData = book.toJSON();
      // 如果有圖片，使用第一張圖片作為主圖
      if (bookData.images && bookData.images.length > 0) {
        bookData.image = bookData.images[0].url;
      }
      return bookData;
    });

    // 返回書籍列表和分頁信息
    res.json({
      books: formattedBooks,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('獲取書籍失敗:', error);
    res.status(500).json({
      success: false,
      message: '獲取書籍失敗',
      error: error.message,
    });
  }
};

// 獲取單本書籍詳情
exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;

    // 查詢書籍
    const book = await Book.findByPk(id, {
      include: [
        {
          model: BookImage,
          as: 'images',
          attributes: ['id', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    // 如果找不到書籍，返回 404
    if (!book) {
      return res.status(404).json({
        success: false,
        message: '找不到該書籍',
      });
    }

    // 返回書籍詳情
    res.json(book);
  } catch (error) {
    console.error('獲取書籍詳情失敗:', error);
    res.status(500).json({
      success: false,
      message: '獲取書籍詳情失敗',
      error: error.message,
    });
  }
};

// 獲取用戶的書籍
exports.getUserBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    // 查詢條件
    const where = { userId };
    if (status) {
      where.status = status;
    }

    // 查詢書籍
    const books = await Book.findAll({
      where,
      include: [
        {
          model: BookImage,
          as: 'images',
          attributes: ['id', 'url'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // 處理書籍數據
    const formattedBooks = books.map(book => {
      const bookData = book.toJSON();
      // 如果有圖片，使用第一張圖片作為主圖
      if (bookData.images && bookData.images.length > 0) {
        bookData.image = bookData.images[0].url;
      }
      return bookData;
    });

    // 返回書籍列表
    res.json(formattedBooks);
  } catch (error) {
    console.error('獲取用戶書籍失敗:', error);
    res.status(500).json({
      success: false,
      message: '獲取用戶書籍失敗',
      error: error.message,
    });
  }
};

// 創建書籍
exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, price, condition, description } = req.body;
    const userId = req.user.id;

    // 創建書籍
    const book = await Book.create({
      title,
      author,
      isbn,
      price,
      condition,
      description,
      userId,
      status: 'selling',
    });

    // 處理圖片
    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        bookId: book.id,
      }));

      await BookImage.bulkCreate(images);
    }

    // 獲取包含圖片的書籍
    const createdBook = await Book.findByPk(book.id, {
      include: [
        {
          model: BookImage,
          as: 'images',
          attributes: ['id', 'url'],
        },
      ],
    });

    // 返回創建的書籍
    res.status(201).json(createdBook);
  } catch (error) {
    console.error('創建書籍失敗:', error);
    res.status(500).json({
      success: false,
      message: '創建書籍失敗',
      error: error.message,
    });
  }
};

// 更新書籍
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, price, condition, description, status } =
      req.body;
    const userId = req.user.id;

    // 查詢書籍
    const book = await Book.findByPk(id);

    // 如果找不到書籍，返回 404
    if (!book) {
      return res.status(404).json({
        success: false,
        message: '找不到該書籍',
      });
    }

    // 檢查是否為書籍擁有者
    if (book.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: '您沒有權限更新此書籍',
      });
    }

    // 更新書籍
    await book.update({
      title: title || book.title,
      author: author || book.author,
      isbn: isbn || book.isbn,
      price: price || book.price,
      condition: condition || book.condition,
      description: description || book.description,
      status: status || book.status,
      soldAt:
        status === 'sold' && book.status !== 'sold' ? new Date() : book.soldAt,
    });

    // 處理圖片
    if (req.files && req.files.length > 0) {
      // 刪除現有圖片
      if (!req.body.existingImages) {
        await BookImage.destroy({ where: { bookId: id } });
      }

      // 添加新圖片
      const images = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        bookId: book.id,
      }));

      await BookImage.bulkCreate(images);
    }

    // 獲取更新後的書籍
    const updatedBook = await Book.findByPk(id, {
      include: [
        {
          model: BookImage,
          as: 'images',
          attributes: ['id', 'url'],
        },
      ],
    });

    // 返回更新後的書籍
    res.json(updatedBook);
  } catch (error) {
    console.error('更新書籍失敗:', error);
    res.status(500).json({
      success: false,
      message: '更新書籍失敗',
      error: error.message,
    });
  }
};

// 刪除書籍
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 查詢書籍
    const book = await Book.findByPk(id);

    // 如果找不到書籍，返回 404
    if (!book) {
      return res.status(404).json({
        success: false,
        message: '找不到該書籍',
      });
    }

    // 檢查是否為書籍擁有者
    if (book.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: '您沒有權限刪除此書籍',
      });
    }

    // 刪除書籍圖片
    await BookImage.destroy({ where: { bookId: id } });

    // 刪除書籍
    await book.destroy();

    // 返回成功信息
    res.json({
      success: true,
      message: '書籍已成功刪除',
    });
  } catch (error) {
    console.error('刪除書籍失敗:', error);
    res.status(500).json({
      success: false,
      message: '刪除書籍失敗',
      error: error.message,
    });
  }
};

// 搜索書籍
exports.searchBooks = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // 查詢條件
    const where = {
      status: 'selling', // 只搜索在售的書籍
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { author: { [Op.like]: `%${query}%` } },
        { isbn: { [Op.like]: `%${query}%` } },
      ],
    };

    // 查詢書籍
    const { count, rows: books } = await Book.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: BookImage,
          as: 'images',
          attributes: ['id', 'url'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // 處理書籍數據
    const formattedBooks = books.map(book => {
      const bookData = book.toJSON();
      // 如果有圖片，使用第一張圖片作為主圖
      if (bookData.images && bookData.images.length > 0) {
        bookData.image = bookData.images[0].url;
      }
      return bookData;
    });

    // 返回搜索結果
    res.json({
      books: formattedBooks,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('搜索書籍失敗:', error);
    res.status(500).json({
      success: false,
      message: '搜索書籍失敗',
      error: error.message,
    });
  }
};
