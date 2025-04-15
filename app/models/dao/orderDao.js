
const db = require('./db.js');

module.exports = {
  // 連接DB獲取所有的訂單id
  GetOrderGroup: async user_id => {
    let sql =
      'select order_id from orders where user_id = ? order by order_id desc';
    return await db.query(sql, user_id);
  },
  // 連接DB獲取所有的訂單詳細信息
  GetOrder: async user_id => {
    let sql = 'select * from orders where user_id =? order by order_time desc';
    return await db.query(sql, user_id);
  },
  // 連接DB插入訂單信息
  AddOrder: async (length, data) => {
    let sql = 'insert into orders values(null,?,?,?,?,?,?)';
    for (let i = 0; i < length - 1; i++) {
      sql += ',(null,?,?,?,?,?,?)';
    }

    return await db.query(sql, data);
  },
};
