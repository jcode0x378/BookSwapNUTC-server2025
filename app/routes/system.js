const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController');

// 檢查資料庫連接狀態
router.get('/db-status', systemController.checkDbStatus);

module.exports = router;
