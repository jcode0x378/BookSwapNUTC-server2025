const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 導入資料庫模型
const { syncDatabase } = require('./models');

const app = express();

// 設定 CORS
app.use(
  cors({
    origin: [
      'http://localhost:8080',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// 解析 JSON 請求體
app.use(express.json());

// 設定靜態文件目錄
app.use(express.static(path.join(__dirname, 'public')));

// 載入所有路由文件
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
  if (file.endsWith('.js')) {
    try {
      console.log(`載入路由文件 ${file}...`);
      const router = require(`./routes/${file}`);
      app.use('/api', router);
    } catch (error) {
      console.error(`載入路由文件 ${file} 時出錯:`, error);
    }
  }
});

// 資料庫連接狀態檢查端點
app.get('/api/db-status', async (req, res) => {
  try {
    await syncDatabase();
    res.json({ status: 'connected', message: '資料庫連接成功' });
  } catch (error) {
    console.error('資料庫連接失敗:', error);
    res.status(500).json({
      status: 'disconnected',
      message: '資料庫連接失敗',
      error: error.message,
    });
  }
});

// 全局錯誤處理
app.use((err, req, res, next) => {
  console.error('全局錯誤:', err);
  res.status(500).json({ message: '伺服器錯誤', error: err.message });
});

// 處理404
app.use((req, res) => {
  res.status(404).json({ message: '找不到請求的資源' });
});

// 啟動服務器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服務器運行於 http://localhost:${PORT}`);

  // 嘗試連接資料庫
  syncDatabase()
    .then(() => console.log('資料庫同步成功'))
    .catch(err => console.error('資料庫同步失敗:', err));
});

module.exports = app;
