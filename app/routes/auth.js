const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

// 註冊
router.post('/auth/register', authController.register);

// 登入
router.post('/auth/login', authController.login);

// 獲取當前用戶信息
router.get('/auth/me', protect, authController.getCurrentUser);

// 更新用戶資料
router.put(
  '/users/profile',
  protect,
  upload.single('avatar'),
  handleUploadError,
  authController.updateProfile,
);

// 修改密碼
router.put('/users/password', protect, authController.changePassword);

module.exports = router;
