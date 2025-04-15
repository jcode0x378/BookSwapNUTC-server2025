const { testConnection } = require('../../config/db');

// 檢查資料庫連接狀態
exports.checkDbStatus = async (req, res) => {
  try {
    const connected = await testConnection();

    const dbStatus = {
      connected,
      timestamp: new Date().toISOString(),
    };

    res.json(dbStatus);
  } catch (error) {
    console.error('檢查資料庫狀態失敗:', error);
    res.status(500).json({
      success: false,
      message: '檢查資料庫狀態失敗',
      error: error.message,
    });
  }
};
