const { Order, Book, User } = require('../models');
const { Op } = require('sequelize'); // 引入 Sequelize 操作符

// 獲取用戶的訂單列表（購買或銷售）
exports.getUserOrders = async (req, res) => {
  try {
    // 從中間件獲取當前用戶ID
    const userId = req.user.id;

    // 獲取查詢參數
    const { type = 'all' } = req.query;

    let whereClause = {};

    // 根據類型過濾訂單
    if (type === 'bought') {
      whereClause.buyerId = userId;
    } else if (type === 'sold') {
      whereClause.sellerId = userId;
    } else {
      // 如果類型是 'all'，獲取用戶的所有訂單
      whereClause = {
        [Op.or]: [{ buyerId: userId }, { sellerId: userId }],
      };
    }

    // 查詢訂單
    const orders = await Order.findAll({
      where: whereClause,
      include: [
        { model: Book, as: 'book' },
        { model: User, as: 'buyer', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'seller', attributes: ['id', 'username', 'email'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (error) {
    console.error('獲取用戶訂單失敗:', error);
    res.status(500).json({ message: '獲取訂單列表失敗', error: error.message });
  }
};

// 獲取單個訂單詳情
exports.getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // 從中間件獲取當前用戶ID
    const userId = req.user.id;

    // 查詢訂單詳情
    const order = await Order.findOne({
      where: { id },
      include: [
        { model: Book, as: 'book' },
        { model: User, as: 'buyer', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'seller', attributes: ['id', 'username', 'email'] },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: '找不到訂單' });
    }

    // 檢查用戶是否有權限查看此訂單
    if (order.buyerId !== userId && order.sellerId !== userId) {
      return res.status(403).json({ message: '您沒有權限查看此訂單' });
    }

    res.json(order);
  } catch (error) {
    console.error('獲取訂單詳情失敗:', error);
    res.status(500).json({ message: '獲取訂單詳情失敗', error: error.message });
  }
};

// 更新訂單狀態
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 從中間件獲取當前用戶ID
    const userId = req.user.id;

    // 查詢訂單
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: '找不到訂單' });
    }

    // 檢查用戶是否為賣家（只有賣家可以更新訂單狀態）
    if (order.sellerId !== userId) {
      return res.status(403).json({ message: '只有賣家可以更新訂單狀態' });
    }

    // 更新訂單狀態
    await order.update({ status });

    // 返回更新後的訂單
    const updatedOrder = await Order.findOne({
      where: { id },
      include: [
        { model: Book, as: 'book' },
        { model: User, as: 'buyer', attributes: ['id', 'username', 'email'] },
        { model: User, as: 'seller', attributes: ['id', 'username', 'email'] },
      ],
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('更新訂單狀態失敗:', error);
    res.status(500).json({ message: '更新訂單狀態失敗', error: error.message });
  }
};
