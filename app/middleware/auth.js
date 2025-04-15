const jwt = require('jsonwebtoken');
const { User } = require('../models');

// 驗證 JWT
exports.protect = async (req, res, next) => {
  try {
    let token;

    // 從請求頭獲取 token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 如果沒有 token，返回 401
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未授權，請登入',
      });
    }

    // 驗證 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 查詢用戶
    const user = await User.findByPk(decoded.id);

    // 如果找不到用戶，返回 401
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '未授權，用戶不存在',
      });
    }

    // 將用戶信息添加到請求對象
    req.user = user;

    next();
  } catch (error) {
    console.error('認證失敗:', error);

    // 如果 token 無效，返回 401
    return res.status(401).json({
      success: false,
      message: '未授權，請重新登入',
    });
  }
};
