/**
 * 校驗用戶是否登入
 * @param {Object} ctx - Koa 上下文對象
 * @param {number} user_id - 用戶 ID
 * @returns {boolean} - 返回驗證結果
 */
module.exports = function (ctx, user_id) {
  // 從請求頭獲取認證信息
  const authHeader = ctx.headers.authorization;
  
  if (!authHeader) {
    ctx.body = {
      code: '401',
      msg: '用戶未登入，請先登入',
    };
    return false;
  }

  // 驗證 token (這裡簡單用 user_id 作為 token)
  const token = authHeader.split(' ')[1];
  
  if (parseInt(user_id) !== parseInt(token)) {
    ctx.body = {
      code: '401',
      msg: '用戶身份驗證失敗，請重新登入',
    };
    return false;
  }
  
  return true;
};
