# BookSwapNUTC 後端

這是 BookSwapNUTC 二手教科書交換平台的後端專案，使用 Node.js、Express 和 MySQL 開發。

## 功能特點

- 用戶認證（註冊、登入、獲取用戶信息）
- 書籍管理（創建、查詢、更新、刪除）
- 交易管理（創建交易、確認交易、取消交易）
- 文件上傳（書籍圖片、用戶頭像）
- API 文檔（使用 Swagger）

## 技術棧

- Node.js
- Express
- MySQL
- Sequelize ORM
- JWT 認證
- Multer 文件上傳
- Swagger API 文檔

## 安裝與設置

### 前置條件

- Node.js (v14+)
- MySQL

### 安裝步驟

1. 克隆專案

```bash
git clone https://github.com/yourusername/BookSwapNUTC-Server.git
cd BookSwapNUTC-Server
```

2. 安裝依賴

```bash
npm install
# 或
yarn install
```

3. 配置環境變量

複製 `.env.example` 文件為 `.env`，並根據您的環境進行配置：

```bash
cp .env.example .env
```

編輯 `.env` 文件：

```
# 伺服器配置
PORT=3000
NODE_ENV=development

# 資料庫配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bookswap
DB_DIALECT=mysql

# JWT 配置
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

4. 創建資料庫

在 MySQL 中創建資料庫：

```sql
CREATE DATABASE bookswap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. 初始化資料庫

```bash
node scripts/init-db.js
```

### 啟動伺服器

開發模式：

```bash
npm run dev
# 或
yarn dev
```

生產模式：

```bash
npm start
# 或
yarn start
```

伺服器將在 http://localhost:3000 運行，API 文檔可在 http://localhost:3000/api-docs 查看。

## API 端點

### 認證

- `POST /api/auth/register` - 註冊新用戶
- `POST /api/auth/login` - 用戶登入
- `GET /api/auth/me` - 獲取當前用戶信息
- `PUT /api/users/profile` - 更新用戶資料
- `PUT /api/users/password` - 修改密碼

### 書籍

- `GET /api/books` - 獲取所有書籍
- `GET /api/books/:id` - 獲取單本書籍詳情
- `GET /api/books/user` - 獲取用戶的書籍
- `GET /api/books/search` - 搜索書籍
- `POST /api/books` - 創建書籍
- `PUT /api/books/:id` - 更新書籍
- `DELETE /api/books/:id` - 刪除書籍

### 交易

- `GET /api/transactions` - 獲取用戶的交易記錄
- `GET /api/transactions/:id` - 獲取單筆交易詳情
- `GET /api/transactions/stats` - 獲取交易統計
- `POST /api/transactions` - 創建交易
- `PUT /api/transactions/:id/confirm` - 確認交易
- `PUT /api/transactions/:id/cancel` - 取消交易

### 系統

- `GET /api/db-status` - 檢查資料庫連接狀態

## 開發者

- 您的名字 - [您的郵箱](mailto:your.email@example.com)

## 授權

此專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 文件
