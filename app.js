require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// 導入路由
const paymentsRoutes = require('./app/routes/payments');

// 導入資料庫模型
const { syncDatabase } = require('./app/models');

const app = express();

// 準備CORS允許的來源
const allowedOrigins = [];

// 添加開發環境來源
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  allowedOrigins.push(
    'http://localhost:8080',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  );
}

// 添加生產環境來源
if (process.env.CLIENT_URL) {
  // 分解並添加帶www和不帶www的版本
  allowedOrigins.push(process.env.CLIENT_URL);
  // 如果CLIENT_URL包含HTTP協議，解析域名部分
  if (process.env.CLIENT_URL.startsWith('http')) {
    try {
      const url = new URL(process.env.CLIENT_URL);
      const domain = url.hostname;
      // 添加額外可能的域名變體
      if (!domain.startsWith('www.')) {
        allowedOrigins.push(
          `${url.protocol}//www.${domain}${url.port ? ':' + url.port : ''}`,
        );
      } else {
        allowedOrigins.push(
          `${url.protocol}//${domain.replace('www.', '')}${
            url.port ? ':' + url.port : ''
          }`,
        );
      }
    } catch (e) {
      console.warn('無法解析CLIENT_URL:', e);
    }
  }
}

console.log('CORS允許的來源:', allowedOrigins);

// 設定 CORS
app.use(
  cors({
    origin: allowedOrigins, // 使用我們動態構建的來源列表
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 允許發送憑證（如 cookies）
  }),
);

// 解析 JSON 請求體
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 設定靜態文件目錄
app.use(express.static(path.join(__dirname, 'public')));

// Swagger 配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookSwapNUTC API',
      version: '1.0.0',
      description: '二手教科書交換平台 API 文檔',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description:
          process.env.NODE_ENV === 'production'
            ? 'Production server'
            : 'Development server',
      },
    ],
  },
  apis: ['./app/routes/*.js'], // API 路由文件的路徑
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 自動載入路由
const routesPath = path.join(__dirname, 'app/routes');
if (fs.existsSync(routesPath)) {
  fs.readdirSync(routesPath).forEach(file => {
    if (file.endsWith('.js')) {
      try {
        const route = require(path.join(routesPath, file));
        app.use('/api', route);
        console.log(`已載入路由: ${file}`);
      } catch (error) {
        console.error(`載入路由文件 ${file} 時出錯:`, error);
      }
    }
  });
} else {
  console.warn(`警告: 路由目錄 ${routesPath} 不存在`);
  // 創建基本目錄結構
  fs.mkdirSync(routesPath, { recursive: true });
}

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '伺服器內部錯誤',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 處理 404 錯誤
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '找不到請求的資源',
  });
});

// 設定伺服器端口
const PORT = process.env.PORT || 3000;

// 同步資料庫並啟動伺服器
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(
      `伺服器運行在 ${process.env.API_URL || `http://localhost:${PORT}`}`,
    );
    console.log(
      `API 文檔可在 ${
        process.env.API_URL || `http://localhost:${PORT}`
      }/api-docs 查看`,
    );
  });
});

// 不要重複註冊路由，請移除或註釋掉這行
// app.use('/api/payments', paymentsRoutes);

module.exports = app;
