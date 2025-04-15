# BookSwapNUTC-Server 資料夾結構與規則

本文檔描述了 BookSwapNUTC-Server 後端專案的資料夾結構、各資料夾的用途以及相關規則。

## 主要資料夾結構

```
BookSwapNUTC-Server/
├── app/                # 應用程式核心代碼
│   ├── controllers/    # 控制器：處理路由的業務邏輯
│   ├── middleware/     # 中間件：請求處理前的預處理函數
│   ├── models/         # 數據模型：定義數據結構和關係
│   ├── routes/         # 路由：定義 API 端點
│   └── utils/          # 工具函數：共用的輔助函數
├── config/             # 配置文件：數據庫連接等配置
├── public/             # 靜態文件：可公開訪問的資源
│   └── uploads/        # 上傳文件：用戶上傳的圖片等
├── scripts/            # 腳本：數據庫初始化等腳本
├── DB/                 # 數據庫相關：備份、遷移等
└── node_modules/       # 依賴包：第三方模組
```

## 資料夾規則與說明

### 1. app/ - 應用程式核心代碼

這是後端應用的核心目錄，包含所有業務邏輯代碼。

#### 1.1 controllers/ - 控制器

**規則**：

- 每個控制器文件應對應一個資源或業務領域（如 `userController.js`、`bookController.js`）
- 控制器方法應只處理請求參數驗證、調用服務層處理業務邏輯、返回響應
- 命名應使用駝峰式（如 `userController.js`）
- 每個方法應有清晰的錯誤處理
- 控制器不應直接進行數據庫操作，應通過模型層

**範例**：

```javascript
// app/controllers/bookController.js
const { Book } = require('../models');

// 獲取所有書籍
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    return res
      .status(500)
      .json({ message: '獲取書籍失敗', error: error.message });
  }
};
```

#### 1.2 middleware/ - 中間件

**規則**：

- 每個中間件文件應專注於單一功能（如 `auth.js`、`upload.js`）
- 中間件函數應遵循 Express 中間件格式：`(req, res, next) => {}`
- 命名應清晰表示其功能（如 `authMiddleware.js`）
- 中間件應在適當時機調用 `next()`，或在發生錯誤時返回響應

**範例**：

```javascript
// app/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: '身份驗證失敗' });
  }
};
```

#### 1.3 models/ - 數據模型

**規則**：

- 每個模型文件對應一個數據表（如 `User.js`、`Book.js`）
- 模型應明確定義字段、類型、約束和關係
- 模型命名應使用大駝峰式（如 `User.js`）
- 可以在模型中定義與該模型直接相關的方法
- 關係應在 `index.js` 文件中統一設置

**範例**：

```javascript
// app/models/Book.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 其他字段...
});

module.exports = Book;
```

#### 1.4 routes/ - 路由

**規則**：

- 每個路由文件應對應一個資源或業務領域（如 `userRoutes.js`、`bookRoutes.js`）
- 路由定義應清晰，並使用適當的 HTTP 方法
- 命名應使用複數形式（如 `booksRoutes.js`）
- 路由應包含 Swagger 文檔註釋
- 相關的路由應分組在同一文件中

**範例**：

```javascript
// app/routes/booksRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: 獲取所有書籍
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: 成功獲取書籍列表
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: 創建新書籍
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: 書籍創建成功
 */
router.post('/', authMiddleware, bookController.createBook);

module.exports = router;
```

#### 1.5 utils/ - 工具函數

**規則**：

- 工具函數應專注於單一職責
- 應該是純函數，避免副作用
- 命名應清晰表示其功能（如 `fileUtils.js`、`validationUtils.js`）
- 每個函數應有必要的註釋說明用途和參數

**範例**：

```javascript
// app/utils/validationUtils.js

/**
 * 驗證電子郵件格式
 * @param {string} email - 要驗證的電子郵件
 * @returns {boolean} - 是否有效
 */
exports.isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

### 2. config/ - 配置文件

**規則**：

- 配置文件應按功能分類（如 `db.js`、`storage.js`）
- 敏感配置應使用環境變量，避免硬編碼
- 配置應有合理的預設值
- 配置文件應導出配置對象，便於導入使用

**範例**：

```javascript
// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  },
);

module.exports = { sequelize };
```

### 3. public/ - 靜態文件

**規則**：

- 只存放需要公開訪問的資源
- 文件應按類型分類存放
- 上傳文件應存放在 `uploads` 子目錄，並進一步按類型分類（如 `uploads/avatars`、`uploads/books`）
- 應確保文件名唯一，避免衝突
- 敏感文件不應放在此目錄

### 4. scripts/ - 腳本

**規則**：

- 每個腳本應有單一用途（如 `init-db.js`、`add-books.js`）
- 腳本應有清晰的錯誤處理和日誌輸出
- 腳本應在開始和結束時輸出明確的信息
- 腳本應可獨立運行，不依賴於其他腳本的執行

**範例**：

```javascript
// scripts/init-db.js
require('dotenv').config();
const { sequelize, User, Book } = require('../app/models');

const initDatabase = async () => {
  try {
    console.log('開始初始化資料庫...');
    await sequelize.sync({ force: true });
    console.log('資料庫表格已創建');

    // 創建測試數據...

    console.log('資料庫初始化完成');
  } catch (error) {
    console.error('資料庫初始化失敗:', error);
  } finally {
    await sequelize.close();
  }
};

initDatabase();
```

### 5. DB/ - 數據庫相關

**規則**：

- 數據庫備份文件應按日期命名（如 `backup-2023-10-01.sql`）
- 數據庫遷移文件應按順序編號（如 `001-initial.sql`、`002-add-images.sql`）
- 應保留關鍵數據的備份
- 可包含數據庫設計文檔

### 6. node_modules/ - 依賴包

**規則**：

- 不應手動修改此目錄中的文件
- 不應提交到版本控制系統（應在 `.gitignore` 中排除）
- 依賴管理應使用 `yarn` 或 `npm`，並保持 `package.json` 和 `yarn.lock`/`package-lock.json` 文件的同步

## 一般開發規則

1. **命名規範**：

   - 文件名：使用小駝峰式（camelCase）或連字符式（kebab-case）
   - 類名：使用大駝峰式（PascalCase）
   - 變量/函數：使用小駝峰式（camelCase）
   - 常量：使用全大寫下劃線式（UPPER_SNAKE_CASE）

2. **代碼風格**：

   - 使用 2 空格縮進
   - 使用分號結束語句
   - 使用單引號定義字符串
   - 使用 async/await 處理異步代碼

3. **錯誤處理**：

   - 使用 try/catch 處理可能的錯誤
   - 提供有意義的錯誤信息
   - 區分客戶端錯誤（4xx）和服務器錯誤（5xx）

4. **API 響應格式**：

   - 成功響應：`{ data: ... }`
   - 錯誤響應：`{ message: '錯誤信息', error: '詳細錯誤' }`

5. **日誌記錄**：

   - 記錄關鍵操作和錯誤
   - 在生產環境中不記錄敏感信息
   - 使用適當的日誌級別（info、warn、error）

6. **版本控制**：
   - 提交信息應清晰描述變更
   - 遵循語義化版本規範
   - 使用分支進行特性開發和錯誤修復
