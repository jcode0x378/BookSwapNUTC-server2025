# BookSwapNUTC-Server API 文檔

本文檔詳細說明了 BookSwapNUTC-Server 提供的 API 端點、請求參數、響應格式和認證要求。

## 基本信息

- **基礎 URL**: `http://localhost:3000/api`
- **認證方式**: JWT (JSON Web Token)
- **請求格式**: JSON
- **響應格式**: JSON

## 認證相關

### 註冊新用戶

```
POST /auth/register
```

**請求體**:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "0912345678",
  "department": "資訊工程系"
}
```

**響應** (200 OK):

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "0912345678",
  "department": "資訊工程系",
  "avatar": "/uploads/default-avatar.png",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**錯誤響應** (400 Bad Request):

```json
{
  "message": "註冊失敗",
  "error": "電子郵件已被使用"
}
```

### 用戶登入

```
POST /auth/login
```

**請求體**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**響應** (200 OK):

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "0912345678",
  "department": "資訊工程系",
  "avatar": "/uploads/default-avatar.png",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**錯誤響應** (401 Unauthorized):

```json
{
  "message": "登入失敗",
  "error": "電子郵件或密碼錯誤"
}
```

### 獲取當前用戶信息

```
GET /auth/me
```

**請求頭**:

```
Authorization: Bearer {token}
```

**響應** (200 OK):

```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "0912345678",
  "department": "資訊工程系",
  "bio": "這是我的自我介紹",
  "avatar": "/uploads/avatars/john_doe.jpg",
  "createdAt": "2023-10-01T12:00:00Z",
  "updatedAt": "2023-10-10T15:30:00Z"
}
```

**錯誤響應** (401 Unauthorized):

```json
{
  "message": "身份驗證失敗"
}
```

## 用戶相關

### 更新用戶資料

```
PUT /users/profile
```

**請求頭**:

```
Authorization: Bearer {token}
```

**請求體**:

```json
{
  "username": "john_smith",
  "phone": "0923456789",
  "department": "電機工程系",
  "bio": "Hello World!"
}
```

**響應** (200 OK):

```json
{
  "id": 1,
  "username": "john_smith",
  "email": "john@example.com",
  "phone": "0923456789",
  "department": "電機工程系",
  "bio": "Hello World!",
  "avatar": "/uploads/avatars/john_doe.jpg",
  "updatedAt": "2023-10-15T10:30:00Z"
}
```

### 修改密碼

```
PUT /users/password
```

**請求頭**:

```
Authorization: Bearer {token}
```

**請求體**:

```json
{
  "currentPassword": "password123",
  "newPassword": "newPassword456"
}
```

**響應** (200 OK):

```json
{
  "message": "密碼已成功更新"
}
```

**錯誤響應** (400 Bad Request):

```json
{
  "message": "密碼更新失敗",
  "error": "當前密碼不正確"
}
```

### 上傳頭像

```
POST /users/avatar
```

**請求頭**:

```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**請求參數**:

- `avatar`: 文件

**響應** (200 OK):

```json
{
  "avatarUrl": "/uploads/avatars/user1-1634567890.jpg",
  "message": "頭像上傳成功"
}
```

## 書籍相關

### 獲取所有書籍

```
GET /books
```

**查詢參數**:

- `page`: 頁碼 (默認: 1)
- `limit`: 每頁數量 (默認: 10)
- `status`: 書籍狀態 (可選: selling, sold, reserved)

**響應** (200 OK):

```json
{
  "total": 100,
  "totalPages": 10,
  "currentPage": 1,
  "books": [
    {
      "id": 1,
      "title": "數據結構",
      "author": "張三",
      "isbn": "9787302444541",
      "price": 300,
      "condition": "良好",
      "status": "selling",
      "images": [
        {
          "id": 1,
          "url": "/uploads/books/book1-image1.jpg"
        }
      ],
      "user": {
        "id": 1,
        "username": "john_doe"
      },
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
    // ... 更多書籍
  ]
}
```

### 獲取單本書籍詳情

```
GET /books/:id
```

**響應** (200 OK):

```json
{
  "id": 1,
  "title": "數據結構",
  "author": "張三",
  "isbn": "9787302444541",
  "price": 300,
  "condition": "良好",
  "description": "這是一本關於數據結構的教科書，包含了基本的數據結構和算法。",
  "status": "selling",
  "soldAt": null,
  "images": [
    {
      "id": 1,
      "url": "/uploads/books/book1-image1.jpg"
    }
  ],
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "0912345678"
  },
  "createdAt": "2023-10-01T12:00:00Z",
  "updatedAt": "2023-10-01T12:00:00Z"
}
```

**錯誤響應** (404 Not Found):

```json
{
  "message": "書籍不存在"
}
```

### 搜索書籍

```
GET /books/search
```

**查詢參數**:

- `q`: 搜索關鍵詞
- `page`: 頁碼 (默認: 1)
- `limit`: 每頁數量 (默認: 10)

**響應** (200 OK):

```json
{
  "total": 5,
  "totalPages": 1,
  "currentPage": 1,
  "books": [
    {
      "id": 1,
      "title": "數據結構",
      "author": "張三",
      "isbn": "9787302444541",
      "price": 300,
      "condition": "良好",
      "status": "selling",
      "images": [
        {
          "id": 1,
          "url": "/uploads/books/book1-image1.jpg"
        }
      ],
      "user": {
        "id": 1,
        "username": "john_doe"
      },
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
    // ... 更多書籍
  ]
}
```

### 獲取用戶的書籍

```
GET /books/user
```

**請求頭**:

```
Authorization: Bearer {token}
```

**查詢參數**:

- `status`: 書籍狀態 (可選: selling, sold, reserved)
- `page`: 頁碼 (默認: 1)
- `limit`: 每頁數量 (默認: 10)

**響應** (200 OK):

```json
{
  "total": 3,
  "totalPages": 1,
  "currentPage": 1,
  "books": [
    {
      "id": 1,
      "title": "數據結構",
      "author": "張三",
      "isbn": "9787302444541",
      "price": 300,
      "condition": "良好",
      "status": "selling",
      "images": [
        {
          "id": 1,
          "url": "/uploads/books/book1-image1.jpg"
        }
      ],
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
    // ... 更多書籍
  ]
}
```

### 創建書籍

```
POST /books
```

**請求頭**:

```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**請求參數**:

- `title`: 書籍標題
- `author`: 作者
- `isbn`: ISBN (可選)
- `price`: 價格
- `condition`: 書籍狀態 (全新, 良好, 一般, 破損)
- `description`: 描述 (可選)
- `images`: 文件列表 (最多 5 張)

**響應** (201 Created):

```json
{
  "id": 4,
  "title": "計算機網絡",
  "author": "李四",
  "isbn": "9787302444542",
  "price": 250,
  "condition": "全新",
  "description": "這是一本關於計算機網絡的教科書，包含了基本的網絡協議和架構。",
  "status": "selling",
  "userId": 1,
  "images": [
    {
      "id": 4,
      "url": "/uploads/books/book4-image1.jpg"
    }
  ],
  "createdAt": "2023-10-15T14:30:00Z",
  "updatedAt": "2023-10-15T14:30:00Z"
}
```

### 更新書籍

```
PUT /books/:id
```

**請求頭**:

```
Authorization: Bearer {token}
Content-Type: application/json
```

**請求體**:

```json
{
  "title": "計算機網絡（第二版）",
  "price": 280,
  "description": "這是一本關於計算機網絡的教科書，包含了基本的網絡協議和架構。本書已更新至第二版。"
}
```

**響應** (200 OK):

```json
{
  "id": 4,
  "title": "計算機網絡（第二版）",
  "author": "李四",
  "isbn": "9787302444542",
  "price": 280,
  "condition": "全新",
  "description": "這是一本關於計算機網絡的教科書，包含了基本的網絡協議和架構。本書已更新至第二版。",
  "status": "selling",
  "userId": 1,
  "images": [
    {
      "id": 4,
      "url": "/uploads/books/book4-image1.jpg"
    }
  ],
  "updatedAt": "2023-10-16T09:15:00Z"
}
```

**錯誤響應** (403 Forbidden):

```json
{
  "message": "無權限更新此書籍"
}
```

### 刪除書籍

```
DELETE /books/:id
```

**請求頭**:

```
Authorization: Bearer {token}
```

**響應** (200 OK):

```json
{
  "message": "書籍已成功刪除"
}
```

**錯誤響應** (403 Forbidden):

```json
{
  "message": "無權限刪除此書籍"
}
```

## 交易相關

### 獲取交易記錄

```
GET /transactions
```

**請求頭**:

```
Authorization: Bearer {token}
```

**查詢參數**:

- `type`: 交易類型 (bought, sold)
- `status`: 交易狀態 (pending, completed, cancelled)
- `page`: 頁碼 (默認: 1)
- `limit`: 每頁數量 (默認: 10)

**響應** (200 OK):

```json
{
  "total": 2,
  "totalPages": 1,
  "currentPage": 1,
  "transactions": [
    {
      "id": 1,
      "status": "completed",
      "book": {
        "id": 3,
        "title": "操作系統",
        "author": "王五",
        "price": 280,
        "condition": "一般",
        "images": [
          {
            "id": 3,
            "url": "/uploads/books/book3-image1.jpg"
          }
        ]
      },
      "seller": {
        "id": 2,
        "username": "test_user2"
      },
      "buyer": {
        "id": 1,
        "username": "john_doe"
      },
      "createdAt": "2023-10-05T16:45:00Z",
      "updatedAt": "2023-10-06T10:20:00Z"
    }
    // ... 更多交易
  ]
}
```

### 獲取單筆交易詳情

```
GET /transactions/:id
```

**請求頭**:

```
Authorization: Bearer {token}
```

**響應** (200 OK):

```json
{
  "id": 1,
  "status": "completed",
  "book": {
    "id": 3,
    "title": "操作系統",
    "author": "王五",
    "isbn": "9787302444543",
    "price": 280,
    "condition": "一般",
    "description": "這是一本關於操作系統的教科書，包含了基本的操作系統概念和原理。",
    "images": [
      {
        "id": 3,
        "url": "/uploads/books/book3-image1.jpg"
      }
    ]
  },
  "seller": {
    "id": 2,
    "username": "test_user2",
    "email": "user2@example.com",
    "phone": "0923456789"
  },
  "buyer": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "0912345678"
  },
  "createdAt": "2023-10-05T16:45:00Z",
  "updatedAt": "2023-10-06T10:20:00Z"
}
```

**錯誤響應** (404 Not Found):

```json
{
  "message": "交易不存在"
}
```

### 創建交易

```
POST /transactions
```

**請求頭**:

```
Authorization: Bearer {token}
```

**請求體**:

```json
{
  "bookId": 1
}
```

**響應** (201 Created):

```json
{
  "id": 2,
  "bookId": 1,
  "sellerId": 1,
  "buyerId": 2,
  "status": "pending",
  "createdAt": "2023-10-16T11:30:00Z",
  "updatedAt": "2023-10-16T11:30:00Z"
}
```

**錯誤響應** (400 Bad Request):

```json
{
  "message": "創建交易失敗",
  "error": "書籍已售出或被預約"
}
```

### 確認交易

```
PUT /transactions/:id/confirm
```

**請求頭**:

```
Authorization: Bearer {token}
```

**響應** (200 OK):

```json
{
  "id": 2,
  "status": "completed",
  "updatedAt": "2023-10-16T14:20:00Z",
  "message": "交易已確認完成"
}
```

**錯誤響應** (403 Forbidden):

```json
{
  "message": "無權限確認此交易"
}
```

### 取消交易

```
PUT /transactions/:id/cancel
```

**請求頭**:

```
Authorization: Bearer {token}
```

**響應** (200 OK):

```json
{
  "id": 2,
  "status": "cancelled",
  "updatedAt": "2023-10-16T15:45:00Z",
  "message": "交易已取消"
}
```

**錯誤響應** (403 Forbidden):

```json
{
  "message": "無權限取消此交易"
}
```

## 系統相關

### 檢查資料庫連接狀態

```
GET /db-status
```

**響應** (200 OK):

```json
{
  "status": "success",
  "message": "資料庫連接正常"
}
```

**錯誤響應** (500 Internal Server Error):

```json
{
  "status": "error",
  "message": "資料庫連接失敗"
}
```

## 錯誤代碼

| 狀態碼 | 描述                                       |
| ------ | ------------------------------------------ |
| 200    | 請求成功                                   |
| 201    | 資源創建成功                               |
| 400    | 錯誤的請求（客戶端錯誤，如無效的請求參數） |
| 401    | 未授權（缺少或無效的認證）                 |
| 403    | 禁止訪問（無權訪問資源）                   |
| 404    | 資源未找到                                 |
| 500    | 服務器內部錯誤                             |

## 認證說明

大多數 API 端點都需要認證。認證通過 JWT (JSON Web Token) 實現，token 在用戶註冊或登入時返回。

要訪問受保護的端點，請在 HTTP 請求頭中包含 `Authorization` 字段，格式為 `Bearer {token}`。

例如：

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Swagger 文檔

API 文檔也可通過 Swagger UI 查看，訪問 URL：

```
http://localhost:3000/api-docs
```
