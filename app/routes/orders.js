const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: 獲取用戶的訂單列表
 *     description: 根據用戶的 token 獲取其購買或銷售的訂單列表
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, bought, sold]
 *         default: all
 *         description: 訂單類型，all-所有訂單, bought-購買的訂單, sold-銷售的訂單
 *     responses:
 *       200:
 *         description: 成功獲取訂單列表
 *       401:
 *         description: 未授權，需要有效的 token
 *       500:
 *         description: 伺服器錯誤
 */
router.get('/orders', protect, orderController.getUserOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: 獲取單個訂單詳情
 *     description: 根據訂單ID獲取訂單的詳細信息
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 訂單ID
 *     responses:
 *       200:
 *         description: 成功獲取訂單詳情
 *       401:
 *         description: 未授權，需要有效的 token
 *       403:
 *         description: 禁止訪問，用戶無權查看該訂單
 *       404:
 *         description: 找不到訂單
 *       500:
 *         description: 伺服器錯誤
 */
router.get('/orders/:id', protect, orderController.getOrderDetail);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: 更新訂單狀態
 *     description: 賣家更新訂單的狀態
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 訂單ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, cancelled]
 *                 description: 新的訂單狀態
 *     responses:
 *       200:
 *         description: 成功更新訂單狀態
 *       401:
 *         description: 未授權，需要有效的 token
 *       403:
 *         description: 禁止訪問，只有賣家可以更新訂單狀態
 *       404:
 *         description: 找不到訂單
 *       500:
 *         description: 伺服器錯誤
 */
router.put('/orders/:id/status', protect, orderController.updateOrderStatus);

module.exports = router;
