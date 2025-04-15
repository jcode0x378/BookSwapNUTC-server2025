# BookSwapNUTC-Server 編碼規則

本文檔定義了 BookSwapNUTC-Server 後端專案的編碼規則和開發規範，所有參與開發的人員都應遵循這些規則，以保持代碼的一致性和可維護性。

## 目錄結構

請參考 `docs/folder-structure.md` 文件了解完整的目錄結構和規則。以下是主要目錄的基本要求：

```
BookSwapNUTC-Server/
├── app/
│   ├── controllers/    # 控制器，處理業務邏輯
│   ├── middleware/     # 中間件
│   ├── models/         # 數據模型
│   ├── routes/         # 路由定義
│   └── utils/          # 工具函數
├── config/             # 配置文件
├── public/             # 靜態資源
├── scripts/            # 腳本文件
└── ...
```

**注意**：發現目前同時存在 `middleware` 和 `middlewares` 目錄，以及 `routes` 和 `router` 目錄。為了統一，應使用單數形式 `middleware` 和 `routes`。

## 編碼風格

### 1. 空格和縮進

- 使用 2 個空格進行縮進，不使用 Tab
- 運算符前後應有空格
- 逗號後應有空格
- 括號內應有適當的空格

```javascript
// 好的做法
const sum = (a, b) => {
  return a + b;
};

// 不好的做法
const sum = (a, b) => {
  return a + b;
};
```

### 2. 分號使用

- 每個語句結束應使用分號
- 避免依賴 ASI（自動分號插入）

```javascript
// 好的做法
const name = 'John';
console.log(name);

// 不好的做法
const name = 'John';
console.log(name);
```

### 3. 命名規範

- **變量和函數**：使用小駝峰式（camelCase）

  ```javascript
  const userName = 'John';
  function getUserData() { ... }
  ```

- **類和構造函數**：使用大駝峰式（PascalCase）

  ```javascript
  class UserController { ... }
  ```

- **常量**：使用全大寫下劃線式（UPPER_SNAKE_CASE）

  ```javascript
  const MAX_RETRY_COUNT = 3;
  ```

- **文件名**：

  - 控制器：`userController.js`
  - 模型：`User.js`
  - 路由：`userRoutes.js`
  - 中間件：`auth.js`

- **多詞命名**：使用描述性名稱，避免縮寫（除非是常用縮寫如 HTTP）

  ```javascript
  // 好的做法
  const getUserProfile = () => { ... };

  // 不好的做法
  const getUsrProf = () => { ... };
  ```

### 4. 註釋規範

- 使用 JSDoc 格式為函數和類添加文檔註釋
- 複雜邏輯應添加行內註釋
- 暫時性代碼應標記 `TODO` 或 `FIXME`

```javascript
/**
 * 獲取用戶資料
 * @param {number} userId - 用戶 ID
 * @returns {Promise<Object>} 用戶資料對象
 */
const getUserData = async userId => {
  // TODO: 添加緩存功能
  try {
    // 查詢數據庫
    return await User.findByPk(userId);
  } catch (error) {
    throw new Error(`獲取用戶數據失敗: ${error.message}`);
  }
};
```

## 代碼質量

### 1. 異步代碼

- 優先使用 async/await，而不是回調函數或 Promise 鏈
- 使用 try/catch 捕獲異步操作的錯誤

```javascript
// 好的做法
const getUser = async id => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// 不好的做法
const getUser = id => {
  return User.findByPk(id)
    .then(user => user)
    .catch(error => {
      console.error('Error fetching user:', error);
      throw error;
    });
};
```

### 2. 錯誤處理

- 使用專用的錯誤處理中間件
- 對可預見的錯誤使用自定義錯誤類
- 以不同的 HTTP 狀態碼區分不同類型的錯誤
- 錯誤響應應包含有用的錯誤信息

```javascript
// 路由處理
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '用戶不存在' });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error); // 傳遞給錯誤處理中間件
  }
});

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '服務器錯誤',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});
```

### 3. 安全性

- 使用參數化查詢避免 SQL 注入
- 使用適當的驗證和消毒庫處理用戶輸入
- 敏感信息（如密碼）應進行哈希處理
- 使用 HTTPS 和適當的 CORS 設置
- 避免在響應中暴露敏感信息或技術細節

```javascript
// 密碼哈希範例
const bcrypt = require('bcryptjs');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// 在用戶註冊時
const createUser = async userData => {
  userData.password = await hashPassword(userData.password);
  return await User.create(userData);
};
```

## API 設計

### 1. RESTful 規範

- 使用名詞（複數形式）表示資源
- 使用 HTTP 方法表示操作（GET、POST、PUT、DELETE）
- 使用嵌套表示資源之間的關係

```
GET /api/users         # 獲取所有用戶
POST /api/users        # 創建新用戶
GET /api/users/:id     # 獲取特定用戶
PUT /api/users/:id     # 更新特定用戶
DELETE /api/users/:id  # 刪除特定用戶

GET /api/users/:id/books  # 獲取特定用戶的所有書籍
```

### 2. 響應格式

- 成功響應應使用適當的 HTTP 狀態碼（如 200、201）
- 錯誤響應應使用適當的 HTTP 狀態碼（如 400、401、404、500）
- 響應應使用一致的 JSON 格式

**成功響應**：

```json
{
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**錯誤響應**：

```json
{
  "message": "用戶不存在",
  "error": "找不到 ID 為 123 的用戶"
}
```

### 3. 請求驗證

- 使用驗證中間件檢查請求參數和主體
- 提供清晰的驗證錯誤信息
- 確保驗證在進入業務邏輯前完成

```javascript
const { body, validationResult } = require('express-validator');

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('用戶名不能為空'),
    body('email').isEmail().withMessage('無效的電子郵件'),
    body('password').isLength({ min: 6 }).withMessage('密碼至少需要 6 個字符'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 處理註冊邏輯...
  },
);
```

## 數據庫操作

### 1. Sequelize 最佳實踐

- 使用模型定義清晰的字段類型和約束
- 使用關聯方法定義表之間的關係
- 使用事務處理相關操作

```javascript
// 定義模型
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

// 使用事務
const createUserWithBooks = async (userData, booksData) => {
  const t = await sequelize.transaction();
  try {
    const user = await User.create(userData, { transaction: t });
    const books = await Promise.all(
      booksData.map(bookData =>
        Book.create({ ...bookData, userId: user.id }, { transaction: t }),
      ),
    );
    await t.commit();
    return { user, books };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
```

### 2. 查詢性能

- 避免 N+1 查詢問題，使用 eager loading
- 僅選擇需要的字段
- 對大結果集使用分頁
- 考慮添加適當的索引

```javascript
// 好的做法：使用 eager loading
const getUsers = async () => {
  return await User.findAll({
    include: [
      {
        model: Book,
        as: 'books',
      },
    ],
  });
};

// 不好的做法：N+1 查詢
const getUsers = async () => {
  const users = await User.findAll();
  for (const user of users) {
    user.books = await Book.findAll({ where: { userId: user.id } });
  }
  return users;
};

// 使用分頁
const getBooks = async (page = 1, limit = 10) => {
  return await Book.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    order: [['createdAt', 'DESC']],
  });
};
```

## 單元測試

### 1. 測試框架

- 使用 Jest 或 Mocha 進行單元測試
- 測試文件應與被測試的文件放在相同的目錄下，或者放在專門的 `__tests__` 目錄中
- 測試文件命名：`*.test.js` 或 `*.spec.js`

### 2. 測試覆蓋率

- 控制器方法應有高覆蓋率
- 工具函數應有高覆蓋率
- 中間件應有高覆蓋率

### 3. 測試範例

```javascript
// userController.test.js
const { getUserById } = require('../controllers/userController');
const { User } = require('../models');
jest.mock('../models');

describe('User Controller', () => {
  describe('getUserById', () => {
    it('should return user when user exists', async () => {
      const mockUser = { id: 1, username: 'test' };
      User.findByPk.mockResolvedValue(mockUser);

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user does not exist', async () => {
      User.findByPk.mockResolvedValue(null);

      const req = { params: { id: 999 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: '用戶不存在' });
    });
  });
});
```

## Git 工作流

### 1. 分支命名

- `master` 或 `main`：主分支，永遠保持可部署狀態
- `develop`：開發分支，包含最新的開發代碼
- `feature/*`：功能分支，用於開發新功能
- `bugfix/*`：修復分支，用於修復 bug
- `release/*`：發布分支，用於準備發布

### 2. 提交信息

提交信息應遵循以下格式：

```
<類型>[可選範圍]: <描述>

[可選正文]

[可選頁腳]
```

類型包括：

- `feat`：新功能
- `fix`：錯誤修復
- `docs`：文檔變更
- `style`：不影響代碼含義的變更（空白、格式、缺少分號等）
- `refactor`：既不修復錯誤也不添加功能的代碼變更
- `test`：添加或修正測試
- `chore`：對構建過程或輔助工具和庫的變更

例如：

```
feat(auth): 添加用戶註冊功能

- 添加用戶註冊端點
- 添加密碼哈希功能
- 添加電子郵件驗證

Closes #123
```

## 結論

遵循這些編碼規則和開發規範，將有助於保持代碼庫的一致性和可維護性，減少錯誤，並提高開發效率。所有團隊成員都應熟悉這些規則，並在代碼審查中相互提醒。

如有任何建議或問題，請通過問題跟踪系統提出，以便我們不斷改進這些規則。
