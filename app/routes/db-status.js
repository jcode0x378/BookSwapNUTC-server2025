const express = require('express');
const router = express.Router();
const db = require('../models/db');

/**
 * @swagger
 * /api/db-status:
 *   get:
 *     summary: 檢查資料庫連接狀態
 *     description: 返回資料庫連接的當前狀態
 *     responses:
 *       200:
 *         description: 成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 connected:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 dbInfo:
 *                   type: object
 *                   properties:
 *                     host:
 *                       type: string
 *                     port:
 *                       type: string
 *                     database:
 *                       type: string
 */
router.get('/db-status', async (req, res) => {
  try {
    const connected = await db.testConnection();
    const config = require('../../config');

    res.json({
      success: true,
      connected,
      message: connected ? '資料庫連接成功' : '資料庫連接失敗',
      dbInfo: {
        host: config.db.host,
        port: config.db.port,
        database: config.db.database,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      connected: false,
      message: `檢查資料庫連接時出錯: ${error.message}`,
    });
  }
});

module.exports = router;
