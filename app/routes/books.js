const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

// 獲取所有書籍
router.get('/books', bookController.getAllBooks);

// 搜索書籍
router.get('/books/search', bookController.searchBooks);

// 獲取用戶的書籍
router.get('/books/user', protect, bookController.getUserBooks);

// 獲取單本書籍詳情
router.get('/books/:id', bookController.getBook);

// 創建書籍
router.post(
  '/books',
  protect,
  upload.array('images', 3),
  handleUploadError,
  bookController.createBook,
);

// 更新書籍
router.put(
  '/books/:id',
  protect,
  upload.array('images', 3),
  handleUploadError,
  bookController.updateBook,
);

// 刪除書籍
router.delete('/books/:id', protect, bookController.deleteBook);

module.exports = router;
