const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

// 從請求的授權頭部獲取 JWT token
const getTokenFromHeader = req => {
  // 檢查授權頭部
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  // 抽取 token
  return authHeader.split(' ')[1];
};

// 從 JWT 中獲取當前用戶 ID
const getCurrentUserId = async req => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      throw new Error('無效的 Token: 未提供');
    }

    // 驗證並解碼 token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.id) {
      throw new Error('無效的 Token: 缺少用戶 ID');
    }

    return decoded.id;
  } catch (error) {
    console.error('從 Token 獲取用戶 ID 時出錯:', error.message);
    throw error;
  }
};

// 從 JWT 中獲取當前用戶資訊
const getCurrentUser = async req => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      throw new Error('無效的 Token: 未提供');
    }

    // 驗證並解碼 token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      throw new Error('無效的 Token: 解碼失敗');
    }

    return decoded;
  } catch (error) {
    console.error('從 Token 獲取用戶資訊時出錯:', error.message);
    throw error;
  }
};

module.exports = {
  getTokenFromHeader,
  getCurrentUserId,
  getCurrentUser,
};
