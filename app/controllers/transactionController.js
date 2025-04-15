const { Transaction, Book, User, BookImage } = require('../models');
const { sequelize } = require('../../config/db');

// 獲取用戶的交易記錄
exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type = 'all' } = req.query;

    // 查詢條件
    let where = {};
    if (type === 'bought') {
      where.buyerId = userId;
    } else if (type === 'sold') {
      where.sellerId = userId;
    } else {
      where = {
        [sequelize.Op.or]: [{ buyerId: userId }, { sellerId: userId }],
      };
    }

    // 查詢交易
    const transactions = await Transaction.findAll({
      where,
      include: [
        {
          model: Book,
          as: 'book',
          include: [
            {
              model: BookImage,
              as: 'images',
              attributes: ['id', 'url'],
              limit: 1,
            },
          ],
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username', 'avatar'],
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'username', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // 處理交易數據
    const formattedTransactions = transactions.map(transaction => {
      const transactionData = transaction.toJSON();

      // 處理書籍圖片
      if (
        transactionData.book &&
        transactionData.book.images &&
        transactionData.book.images.length > 0
      ) {
        transactionData.book.image = transactionData.book.images[0].url;
      }

      return transactionData;
    });

    // 返回交易記錄
    res.json(formattedTransactions);
  } catch (error) {
    console.error('獲取交易記錄失敗:', error);
    res.status(500).json({
      success: false,
      message: '獲取交易記錄失敗',
      error: error.message,
    });
  }
};

// 獲取單筆交易詳情
exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 查詢交易
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Book,
          as: 'book',
          include: [
            {
              model: BookImage,
              as: 'images',
              attributes: ['id', 'url'],
            },
          ],
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username', 'avatar'],
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    // 如果找不到交易，返回 404
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: '找不到該交易',
      });
    }

    // 檢查是否為交易參與者
    if (transaction.buyerId !== userId && transaction.sellerId !== userId) {
      return res.status(403).json({
        success: false,
        message: '您沒有權限查看此交易',
      });
    }

    // 返回交易詳情
    res.json(transaction);
  } catch (error) {
    console.error('獲取交易詳情失敗:', error);
    res.status(500).json({
      success: false,
      message: '獲取交易詳情失敗',
      error: error.message,
    });
  }
};

// 創建交易
exports.createTransaction = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { bookId } = req.body;
    const buyerId = req.user.id;

    // 查詢書籍
    const book = await Book.findByPk(bookId, { transaction: t });

    // 如果找不到書籍，返回 404
    if (!book) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: '找不到該書籍',
      });
    }

    // 檢查書籍是否在售
    if (book.status !== 'selling') {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: '該書籍已售出或已預訂',
      });
    }

    // 檢查是否為自己的書籍
    if (book.userId === buyerId) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: '不能購買自己的書籍',
      });
    }

    // 更新書籍狀態為預訂
    await book.update({ status: 'reserved' }, { transaction: t });

    // 創建交易
    const transaction = await Transaction.create(
      {
        bookId,
        sellerId: book.userId,
        buyerId,
        status: 'pending',
      },
      { transaction: t },
    );

    // 提交事務
    await t.commit();

    // 獲取完整的交易信息
    const createdTransaction = await Transaction.findByPk(transaction.id, {
      include: [
        {
          model: Book,
          as: 'book',
          include: [
            {
              model: BookImage,
              as: 'images',
              attributes: ['id', 'url'],
              limit: 1,
            },
          ],
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username', 'avatar'],
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    // 處理交易數據
    const transactionData = createdTransaction.toJSON();
    if (
      transactionData.book &&
      transactionData.book.images &&
      transactionData.book.images.length > 0
    ) {
      transactionData.book.image = transactionData.book.images[0].url;
    }

    // 返回創建的交易
    res.status(201).json(transactionData);
  } catch (error) {
    // 回滾事務
    await t.rollback();

    console.error('創建交易失敗:', error);
    res.status(500).json({
      success: false,
      message: '創建交易失敗',
      error: error.message,
    });
  }
};

// 確認交易
exports.confirmTransaction = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 查詢交易
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Book,
          as: 'book',
        },
      ],
      transaction: t,
    });

    // 如果找不到交易，返回 404
    if (!transaction) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: '找不到該交易',
      });
    }

    // 檢查是否為賣家
    if (transaction.sellerId !== userId) {
      await t.rollback();
      return res.status(403).json({
        success: false,
        message: '只有賣家可以確認交易',
      });
    }

    // 檢查交易狀態
    if (transaction.status !== 'pending') {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: '只能確認待處理的交易',
      });
    }

    // 更新交易狀態
    await transaction.update({ status: 'completed' }, { transaction: t });

    // 更新書籍狀態
    await transaction.book.update(
      {
        status: 'sold',
        soldAt: new Date(),
      },
      { transaction: t },
    );

    // 提交事務
    await t.commit();

    // 獲取更新後的交易
    const updatedTransaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Book,
          as: 'book',
          include: [
            {
              model: BookImage,
              as: 'images',
              attributes: ['id', 'url'],
              limit: 1,
            },
          ],
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username', 'avatar'],
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    // 處理交易數據
    const transactionData = updatedTransaction.toJSON();
    if (
      transactionData.book &&
      transactionData.book.images &&
      transactionData.book.images.length > 0
    ) {
      transactionData.book.image = transactionData.book.images[0].url;
    }

    // 返回更新後的交易
    res.json(transactionData);
  } catch (error) {
    // 回滾事務
    await t.rollback();

    console.error('確認交易失敗:', error);
    res.status(500).json({
      success: false,
      message: '確認交易失敗',
      error: error.message,
    });
  }
};

// 取消交易
exports.cancelTransaction = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 查詢交易
    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Book,
          as: 'book',
        },
      ],
      transaction: t,
    });

    // 如果找不到交易，返回 404
    if (!transaction) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: '找不到該交易',
      });
    }

    // 檢查是否為交易參與者
    if (transaction.buyerId !== userId && transaction.sellerId !== userId) {
      await t.rollback();
      return res.status(403).json({
        success: false,
        message: '您沒有權限取消此交易',
      });
    }

    // 檢查交易狀態
    if (transaction.status !== 'pending') {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: '只能取消待處理的交易',
      });
    }

    // 更新交易狀態
    await transaction.update({ status: 'cancelled' }, { transaction: t });

    // 更新書籍狀態
    await transaction.book.update({ status: 'selling' }, { transaction: t });

    // 提交事務
    await t.commit();

    // 獲取更新後的交易
    const updatedTransaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Book,
          as: 'book',
          include: [
            {
              model: BookImage,
              as: 'images',
              attributes: ['id', 'url'],
              limit: 1,
            },
          ],
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username', 'avatar'],
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'username', 'avatar'],
        },
      ],
    });

    // 處理交易數據
    const transactionData = updatedTransaction.toJSON();
    if (
      transactionData.book &&
      transactionData.book.images &&
      transactionData.book.images.length > 0
    ) {
      transactionData.book.image = transactionData.book.images[0].url;
    }

    // 返回更新後的交易
    res.json(transactionData);
  } catch (error) {
    // 回滾事務
    await t.rollback();

    console.error('取消交易失敗:', error);
    res.status(500).json({
      success: false,
      message: '取消交易失敗',
      error: error.message,
    });
  }
};

// 獲取交易統計
exports.getTransactionStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // 獲取用戶的書籍數量
    const booksCount = await Book.count({ where: { userId } });

    // 獲取已售出的書籍數量
    const soldCount = await Book.count({
      where: {
        userId,
        status: 'sold',
      },
    });

    // 獲取已購買的書籍數量
    const boughtCount = await Transaction.count({
      where: {
        buyerId: userId,
        status: 'completed',
      },
    });

    // 返回統計數據
    res.json({
      booksCount,
      soldCount,
      boughtCount,
    });
  } catch (error) {
    console.error('獲取交易統計失敗:', error);
    res.status(500).json({
      success: false,
      message: '獲取交易統計失敗',
      error: error.message,
    });
  }
};
