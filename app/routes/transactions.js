const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

// 獲取用戶的交易記錄
router.get('/transactions', protect, transactionController.getUserTransactions);

// 獲取交易統計
router.get(
  '/transactions/stats',
  protect,
  transactionController.getTransactionStats,
);

// 獲取單筆交易詳情
router.get('/transactions/:id', protect, transactionController.getTransaction);

// 創建交易
router.post('/transactions', protect, transactionController.createTransaction);

// 確認交易
router.put(
  '/transactions/:id/confirm',
  protect,
  transactionController.confirmTransaction,
);

// 取消交易
router.put(
  '/transactions/:id/cancel',
  protect,
  transactionController.cancelTransaction,
);

module.exports = router;
