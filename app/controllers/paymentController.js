// BookSwapNUTC-Server/app/controllers/paymentController.js
const { Book, Order, User } = require('../models');
const ecpayService = require('../services/ecpayService');

exports.createPayment = async (req, res) => {
  try {
    console.log('開始處理支付請求:', req.body);
    const { bookId } = req.body;
    const userId = req.user.id;

    console.log(`用戶 ${userId} 開始購買書籍 ${bookId}`);

    // 獲取書籍資訊
    const book = await Book.findByPk(bookId, {
      include: [{ model: User, as: 'user' }],
    });

    if (!book) {
      console.log(`找不到書籍 ${bookId}`);
      return res.status(404).json({ success: false, message: '找不到該書籍' });
    }

    if (book.status !== 'selling') {
      console.log(`書籍 ${bookId} 狀態為 ${book.status}，不可購買`);
      return res
        .status(400)
        .json({ success: false, message: '該書籍不可購買' });
    }

    // 創建訂單
    const orderNo = `BOOK${Date.now()}${Math.floor(Math.random() * 1000)}`;
    console.log(`創建訂單編號: ${orderNo}`);

    const order = await Order.create({
      orderNo,
      bookId,
      buyerId: userId,
      sellerId: book.user.id,
      totalAmount: book.price,
      status: 'pending',
    });

    console.log(`訂單已創建，ID: ${order.id}`);

    // 在實際環境中，這裡會調用綠界API獲取廠商驗證碼
    // 但在模擬環境中，我們直接生成一個模擬的驗證碼
    const authResponse = {
      RtnCode: 1,
      Token: 'SIMULATED_TOKEN_' + Date.now(),
    };

    console.log('驗證碼響應:', authResponse);
    console.log('成功取得綠界驗證碼:', authResponse.Token);

    // 檢查是否為模擬響應
    const isSimulatedToken =
      authResponse.Token && authResponse.Token.startsWith('SIMULATED_TOKEN_');
    console.log('是否為模擬 Token:', isSimulatedToken);

    // 回傳驗證碼給前端
    res.json({
      success: true,
      orderId: order.id,
      orderNo: orderNo,
      itemName: `${book.title}-${book.author}`,
      amount: book.price,
      token: authResponse.Token,
      environment: process.env.ECPAY_ENVIRONMENT || 'STAGE',
      isSimulated: isSimulatedToken, // 標記是否為模擬環境
    });
  } catch (error) {
    console.error('創建支付失敗:', error);
    res
      .status(500)
      .json({ success: false, message: '創建支付失敗', error: error.message });
  }
};

exports.handleCallback = async (req, res) => {
  try {
    console.log('收到綠界回調:', req.body);

    // 處理綠界回調
    const paymentResult = ecpayService.handlePaymentCallback(req.body);

    // 根據商家訂單編號查詢訂單
    const orderNo = paymentResult.merchantTradeNo;
    console.log(`查詢訂單 ${orderNo}`);

    const order = await Order.findOne({
      where: { orderNo },
      include: [
        { model: Book },
        { model: User, as: 'buyer' },
        { model: User, as: 'seller' },
      ],
    });

    if (!order) {
      console.error(`找不到對應訂單 ${orderNo}`);
      throw new Error('找不到對應訂單');
    }

    console.log(`找到訂單 ${orderNo}, 狀態為 ${order.status}`);

    if (paymentResult.rtnCode === '1') {
      // 支付成功
      console.log(`訂單 ${orderNo} 支付成功，更新訂單狀態`);

      await order.update({
        status: 'paid',
        paymentAmount: paymentResult.tradeAmount,
        paymentDate: paymentResult.paymentDate,
        paymentType: paymentResult.paymentType,
      });

      // 更新書籍狀態
      await Book.update(
        { status: 'sold', soldAt: new Date() },
        { where: { id: order.bookId } },
      );

      console.log(`書籍 ${order.bookId} 已更新為已售出狀態`);

      // 可以在這裡添加發送通知給賣家的邏輯
    } else {
      console.log(
        `訂單 ${orderNo} 支付失敗，綠界返回碼: ${paymentResult.rtnCode}, 消息: ${paymentResult.rtnMsg}`,
      );
    }

    // 根據綠界規範回傳
    res.send('1|OK');
  } catch (error) {
    console.error('處理支付回調失敗:', error);
    res.status(500).send('0|錯誤訊息');
  }
};

exports.processPayToken = async (req, res) => {
  try {
    const { payToken, orderId, isSimulated, paymentMethod } = req.body;

    console.log(
      `處理PayToken: ${payToken}, 訂單ID: ${orderId}, 是否模擬: ${isSimulated}, 付款方式: ${paymentMethod}`,
    );

    // 獲取訂單信息
    const order = await Order.findByPk(orderId, {
      include: [{ model: Book, as: 'book' }],
    });

    if (!order) {
      console.error(`找不到訂單 ${orderId}`);
      return res.status(404).json({ success: false, message: '找不到訂單' });
    }

    console.log(`找到訂單 ${orderId}, 金額: ${order.totalAmount}`);

    // 檢查是否為模擬交易
    if (isSimulated === true) {
      console.log(`處理模擬交易，使用付款方式: ${paymentMethod || 'CREDIT'}`);

      // 更新訂單狀態
      await order.update({
        status: 'paid',
        paymentAmount: order.totalAmount,
        paymentDate: new Date(),
        paymentType: paymentMethod || 'CREDIT',
      });

      console.log(`模擬交易：訂單 ${orderId} 已更新為已支付狀態`);

      // 更新書籍狀態
      await Book.update(
        { status: 'sold', soldAt: new Date() },
        { where: { id: order.bookId } },
      );

      console.log(`模擬交易：書籍 ${order.bookId} 已更新為已售出狀態`);

      return res.json({
        success: true,
        message: '模擬交易成功',
        tradeNo: 'SIM_' + Date.now(),
        paymentMethod: paymentMethod || 'CREDIT',
      });
    }

    // 在實際環境中，這裡會調用綠界API建立交易
    // 但在這個示例中，我們直接處理模擬交易
    console.error('非模擬交易功能尚未實現');
    return res.status(501).json({
      success: false,
      message: '非模擬交易功能尚未實現',
    });
  } catch (error) {
    console.error('處理支付Token失敗:', error);
    res.status(500).json({
      success: false,
      message: '處理支付失敗',
      error: error.message,
    });
  }
};

exports.handlePaymentResult = async (req, res) => {
  try {
    const { MerchantTradeNo, RtnCode, RtnMsg } = req.body;

    // 可以加入日誌紀錄
    console.log('支付結果:', req.body);

    // 重定向到前端頁面
    res.redirect(
      `${
        process.env.CLIENT_URL
      }/payment-result?orderNo=${MerchantTradeNo}&status=${RtnCode}&message=${encodeURIComponent(
        RtnMsg,
      )}`,
    );
  } catch (error) {
    console.error('處理支付結果頁面失敗:', error);
    res.redirect(
      `${
        process.env.CLIENT_URL
      }/payment-result?status=error&message=${encodeURIComponent(
        '處理付款結果時發生錯誤',
      )}`,
    );
  }
};
