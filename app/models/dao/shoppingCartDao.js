
const db = require('./db.js');

module.exports = {
  // 獲取購物車訊息
  GetShoppingCart: async user_id => {
    const sql = 'select * from shoppingCart where user_id = ?';
    return await db.query(sql, user_id);
  },
  // 查詢用戶的購物車的某個商品
  FindShoppingCart: async (user_id, product_id) => {
    const sql =
      'select * from shoppingCart where user_id = ? and product_id = ?';
    return await db.query(sql, [user_id, product_id]);
  },
  // 新插入購物車訊息
  AddShoppingCart: async (user_id, product_id) => {
    const sql = 'insert into shoppingCart values(null,?,?,1)';
    return await db.query(sql, [user_id, product_id]);
  },
  // 更新購物車商品數量
  UpdateShoppingCart: async (NewNum, user_id, product_id) => {
    const sql =
      'update shoppingCart set num =? where user_id =? and product_id =?';
    return await db.query(sql, [NewNum, user_id, product_id]);
  },
  // 刪除購物車訊息
  DeleteShoppingCart: async (user_id, product_id) => {
    const sql = 'delete from shoppingCart where user_id =? and product_id =?';
    return await db.query(sql, [user_id, product_id]);
  },
};
