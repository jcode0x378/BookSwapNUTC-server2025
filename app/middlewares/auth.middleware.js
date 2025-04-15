const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');

// 驗證 JWT 令牌
exports.verifyToken = async (req, res, next) => {
  try {
    // 從請求頭獲取令牌
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: '未提供認證令牌',
      });
    }

    // 提取令牌
    const token = authHeader.split(' ')[1];

    // 驗證令牌
    const decoded = jwt.verify(token, config.jwt.secret);

    // 檢查用戶是否存在
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '無效的用戶',
      });
    }

    // 將用戶信息添加到請求對象
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '無效的令牌',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '令牌已過期',
      });
    }

    console.error('認證錯誤:', error);
    res.status(500).json({
      success: false,
      message: '認證過程中發生錯誤',
      error: config.env === 'development' ? error.message : undefined,
    });
  }
};
