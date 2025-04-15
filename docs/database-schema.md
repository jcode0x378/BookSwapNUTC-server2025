# BookSwapNUTC-Server 數據庫模式

本文檔描述了 BookSwapNUTC-Server 數據庫的表結構、欄位定義和表之間的關係。

## 數據表概覽

BookSwapNUTC 數據庫包含以下幾個主要表：

1. **Users** - 存儲用戶信息
2. **Books** - 存儲書籍信息
3. **BookImages** - 存儲書籍圖片
4. **Transactions** - 存儲交易記錄

## 表結構詳情

### Users 表

存儲系統中的所有用戶信息。

| 欄位名     | 類型         | 允許空值 | 默認值                        | 描述           |
| ---------- | ------------ | -------- | ----------------------------- | -------------- |
| id         | INTEGER      | 否       | AUTO_INCREMENT                | 主鍵           |
| username   | VARCHAR(255) | 否       |                               | 用戶名，唯一   |
| email      | VARCHAR(255) | 否       |                               | 電子郵件，唯一 |
| password   | VARCHAR(255) | 否       |                               | 密碼（哈希值） |
| phone      | VARCHAR(255) | 是       | NULL                          | 電話號碼       |
| department | VARCHAR(255) | 是       | NULL                          | 系所           |
| bio        | TEXT         | 是       | NULL                          | 自我介紹       |
| avatar     | VARCHAR(255) | 是       | '/uploads/default-avatar.png' | 頭像路徑       |
| createdAt  | DATETIME     | 否       |                               | 創建時間       |
| updatedAt  | DATETIME     | 否       |                               | 更新時間       |

**索引**：

- PRIMARY KEY (`id`)
- UNIQUE INDEX (`username`)
- UNIQUE INDEX (`email`)

### Books 表

存儲系統中的所有書籍信息。

| 欄位名      | 類型         | 允許空值 | 默認值         | 描述                                |
| ----------- | ------------ | -------- | -------------- | ----------------------------------- |
| id          | INTEGER      | 否       | AUTO_INCREMENT | 主鍵                                |
| title       | VARCHAR(255) | 否       |                | 書籍標題                            |
| author      | VARCHAR(255) | 否       |                | 作者                                |
| isbn        | VARCHAR(255) | 是       | NULL           | ISBN 編號                           |
| price       | INTEGER      | 否       |                | 價格                                |
| condition   | ENUM         | 否       | '良好'         | 書籍狀態（全新, 良好, 一般, 破損）  |
| description | TEXT         | 是       | NULL           | 書籍描述                            |
| status      | ENUM         | 否       | 'selling'      | 銷售狀態（selling, sold, reserved） |
| soldAt      | DATETIME     | 是       | NULL           | 售出時間                            |
| userId      | INTEGER      | 否       |                | 賣家 ID                             |
| createdAt   | DATETIME     | 否       |                | 創建時間                            |
| updatedAt   | DATETIME     | 否       |                | 更新時間                            |

**索引**：

- PRIMARY KEY (`id`)
- INDEX (`userId`)
- INDEX (`status`)
- INDEX (`title`)
- INDEX (`author`)

**外鍵約束**：

- `userId` 引用 `Users(id)` ON DELETE CASCADE ON UPDATE CASCADE

### BookImages 表

存儲書籍的圖片信息。

| 欄位名    | 類型         | 允許空值 | 默認值         | 描述     |
| --------- | ------------ | -------- | -------------- | -------- |
| id        | INTEGER      | 否       | AUTO_INCREMENT | 主鍵     |
| url       | VARCHAR(255) | 否       |                | 圖片路徑 |
| bookId    | INTEGER      | 否       |                | 書籍 ID  |
| createdAt | DATETIME     | 否       |                | 創建時間 |
| updatedAt | DATETIME     | 否       |                | 更新時間 |

**索引**：

- PRIMARY KEY (`id`)
- INDEX (`bookId`)

**外鍵約束**：

- `bookId` 引用 `Books(id)` ON DELETE CASCADE ON UPDATE CASCADE

### Transactions 表

存儲用戶之間的交易記錄。

| 欄位名    | 類型     | 允許空值 | 默認值         | 描述                                      |
| --------- | -------- | -------- | -------------- | ----------------------------------------- |
| id        | INTEGER  | 否       | AUTO_INCREMENT | 主鍵                                      |
| bookId    | INTEGER  | 否       |                | 書籍 ID                                   |
| sellerId  | INTEGER  | 否       |                | 賣家 ID                                   |
| buyerId   | INTEGER  | 否       |                | 買家 ID                                   |
| status    | ENUM     | 否       | 'pending'      | 交易狀態（pending, completed, cancelled） |
| createdAt | DATETIME | 否       |                | 創建時間                                  |
| updatedAt | DATETIME | 否       |                | 更新時間                                  |

**索引**：

- PRIMARY KEY (`id`)
- INDEX (`bookId`)
- INDEX (`sellerId`)
- INDEX (`buyerId`)
- INDEX (`status`)

**外鍵約束**：

- `bookId` 引用 `Books(id)` ON DELETE NO ACTION ON UPDATE CASCADE
- `sellerId` 引用 `Users(id)` ON DELETE CASCADE ON UPDATE CASCADE
- `buyerId` 引用 `Users(id)` ON DELETE CASCADE ON UPDATE CASCADE

## 表關係

### 一對多關係

1. **User - Books**

   - 一個用戶可以有多本書籍
   - 關係: `Users.id` <-> `Books.userId`

2. **Book - BookImages**

   - 一本書可以有多張圖片
   - 關係: `Books.id` <-> `BookImages.bookId`

3. **User - SoldTransactions**

   - 一個用戶可以有多筆賣出交易
   - 關係: `Users.id` <-> `Transactions.sellerId`

4. **User - BoughtTransactions**
   - 一個用戶可以有多筆購買交易
   - 關係: `Users.id` <-> `Transactions.buyerId`

### 多對一關係

1. **Transaction - Book**

   - 每筆交易對應一本書
   - 關係: `Transactions.bookId` <-> `Books.id`

2. **Transaction - Seller**

   - 每筆交易對應一個賣家
   - 關係: `Transactions.sellerId` <-> `Users.id`

3. **Transaction - Buyer**
   - 每筆交易對應一個買家
   - 關係: `Transactions.buyerId` <-> `Users.id`

## ER 圖 (實體關係圖)

```
+---------+       +---------+       +------------+
|         |       |         |       |            |
|  Users  +-------+ Books   +-------+ BookImages |
|         |       |         |       |            |
+----+----+       +----+----+       +------------+
     |                 |
     |                 |
     |                 |
+----v-----------------v----+
|                           |
|       Transactions        |
|                           |
+---------------------------+
```

## Sequelize 模型定義

### User 模型

```javascript
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: '/uploads/default-avatar.png',
  },
});
```

### Book 模型

```javascript
const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  condition: {
    type: DataTypes.ENUM('全新', '良好', '一般', '破損'),
    defaultValue: '良好',
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('selling', 'sold', 'reserved'),
    defaultValue: 'selling',
    allowNull: false,
  },
  soldAt: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
```

### BookImage 模型

```javascript
const BookImage = sequelize.define('BookImage', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
```

### Transaction 模型

```javascript
const Transaction = sequelize.define('Transaction', {
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
  },
});
```

## 關聯設置

```javascript
// User - Book 關聯
User.hasMany(Book, { foreignKey: 'userId', as: 'books' });
Book.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Book - BookImage 關聯
Book.hasMany(BookImage, { foreignKey: 'bookId', as: 'images' });
BookImage.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

// User - Transaction 關聯 (賣家)
User.hasMany(Transaction, { foreignKey: 'sellerId', as: 'soldTransactions' });
Transaction.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

// User - Transaction 關聯 (買家)
User.hasMany(Transaction, { foreignKey: 'buyerId', as: 'boughtTransactions' });
Transaction.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

// Book - Transaction 關聯
Transaction.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
```

## 數據庫遷移注意事項

1. **索引優化**：根據查詢模式添加適當的索引，提高查詢性能。

2. **外鍵約束**：在刪除操作時要特別小心，特別是涉及到交易記錄的情況。

3. **枚舉值變更**：修改枚舉類型的值需要特別小心，最好在初始設計時就考慮完善。

4. **字段增加**：添加新字段時，應考慮是否允許空值或提供默認值，以避免與現有數據衝突。

5. **字段刪除**：刪除字段前應確保沒有代碼依賴該字段，且數據不再需要保留。
