
const db = require('./db.js');

module.exports = {
  // 連接DB,把收藏商品信息插入DB
  AddCollect: async (user_id, product_id, timeTemp) => {
    const sql = 'insert into collect values(null,?,?,?)';
    return await db.query(sql, [user_id, product_id, timeTemp]);
  },
  // 連接DB,獲取用戶的所有收藏商品信息
  GetCollect: async user_id => {
    const sql = 'select * from collect where user_id=?';
    return await db.query(sql, user_id);
  },
  // 連接DB,獲取用戶的某個收藏商品信息
  FindCollect: async (user_id, product_id) => {
    const sql = 'select * from collect where user_id=? and product_id=?';
    return await db.query(sql, [user_id, product_id]);
  },
  // 連接DB,刪除用戶的某個收藏商品信息
  DeleteCollect: async (user_id, product_id) => {
    const sql = 'delete from collect where user_id=? and product_id=?';
    return await db.query(sql, [user_id, product_id]);
  },
};
