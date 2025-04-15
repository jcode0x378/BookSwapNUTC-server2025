const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// 創建支付
router.post('/payments/create', protect, paymentController.createPayment);

// 處理 PayToken 並建立交易
router.post(
  '/payments/process-token',
  protect,
  paymentController.processPayToken,
);

// 綠界支付回調
router.post('/payments/callback', paymentController.handleCallback);

// 支付結果頁面
router.post('/payments/result', paymentController.handlePaymentResult);

module.exports = router;
