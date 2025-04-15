# BookSwapNUTC 後端專案 YARN 啟動指南

本指南將幫助您使用 YARN 安裝依賴並啟動 BookSwapNUTC 後端專案。

## 安裝 YARN（如果尚未安裝）

### 方法 1：使用 npm 安裝（可能需要管理員權限）

```bash
sudo npm install -g yarn
```

### 方法 2：使用 Homebrew 安裝（macOS 推薦）

```bash
brew install yarn
```

### 方法 3：直接下載安裝程序

訪問 [Yarn 官網](https://classic.yarnpkg.com/en/docs/install) 下載安裝程序。

## 使用 YARN 安裝依賴

1. 進入後端專案目錄：

   ```bash
   cd /Users/linyuxiang/Desktop/NUTC/BookSwapNUTC-Server
   ```

2. 刪除舊的依賴和鎖定文件（如果存在）：

   ```bash
   rm -rf node_modules package-lock.json
   ```

3. 使用 YARN 安裝依賴：
   ```bash
   yarn
   ```

## 使用 YARN 啟動專案

### 方法 1：使用啟動腳本（推薦）

我們提供了一個啟動腳本，它會自動檢查目錄結構、安裝依賴並啟動伺服器：

```bash
# 給腳本執行權限
chmod +x start.sh

# 執行腳本
./start.sh
```

### 方法 2：手動啟動

#### 開發模式

```bash
yarn dev
```

這將使用 nodemon 啟動伺服器，當您修改代碼時，伺服器會自動重啟。

#### 生產模式

```bash
yarn start
```

這將直接啟動伺服器，適用於生產環境。

## 環境變數配置

確保您的 `.env` 文件包含必要的環境變數。您可以參考 `.env.example` 文件進行配置。

主要的環境變數包括：

- `PORT`: 伺服器監聽的端口（默認：3000）
- `NODE_ENV`: 環境模式（development 或 production）
- `DB_HOST`: 資料庫主機地址
- `DB_PORT`: 資料庫端口
- `DB_USER`: 資料庫用戶名
- `DB_PASSWORD`: 資料庫密碼
- `DB_NAME`: 資料庫名稱
- `JWT_SECRET`: JWT 密鑰
- `JWT_EXPIRES_IN`: JWT 過期時間
- `UPLOAD_PATH`: 上傳文件存儲路徑

## 目錄結構

確保您的專案包含以下目錄結構：

```
BookSwapNUTC-Server/
├── app/                 # 應用程式碼
│   ├── controllers/     # 控制器
│   ├── middlewares/     # 中間件
│   ├── models/          # 資料模型
│   ├── routes/          # 路由定義
│   └── utils/           # 工具函數
├── config.js            # 配置文件
├── app.js               # 應用入口文件
├── public/              # 靜態文件
│   └── uploads/         # 上傳文件存儲目錄
├── .env                 # 環境變數
└── package.json         # 依賴配置
```

## 故障排除

### 如果遇到 "Router.use() requires a middleware function but got a Object" 錯誤

這個錯誤通常是因為路由文件沒有正確導出 Express 路由器對象。確保每個路由文件都使用以下格式：

```javascript
const express = require('express');
const router = express.Router();

// 定義路由...

module.exports = router; // 導出路由器對象
```

### 如果遇到資料庫連接問題

確保您的 MySQL 資料庫已經啟動，並且 `.env` 文件中的資料庫連接配置正確。

您可以使用以下命令檢查 MySQL 是否正在運行：

```bash
ps aux | grep mysql
```

### 如果遇到 Node.js 版本兼容性問題

如果您使用的是較新版本的 Node.js（如 v23.x），可能會遇到兼容性問題。建議使用 Node.js LTS 版本（如 v20.x）：

```bash
# 使用 nvm 安裝並切換到 LTS 版本
nvm install 20.11.1
nvm use 20.11.1
```

## 注意事項

- 後端專案使用 Express.js 框架
- 資料庫使用 MySQL
- API 文檔使用 Swagger 生成，可通過 `/api-docs` 路徑訪問
- 確保 `app/routes` 目錄中的每個文件都正確導出 Express 路由器對象

如果您有任何問題，請參考專案的 README.md 文件或聯繫專案維護者。
