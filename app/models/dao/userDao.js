
const db = require('./db.js');

module.exports = {
  // 連接DB根據用戶名和密碼查詢用戶訊息
  Login: async (userName, password) => {
    const sql = 'select * from users where userName = ? and password = ?';
    return await db.query(sql, [userName, password]);
  },
  // 連接DB根據用戶名查詢用戶訊息
  FindUserName: async userName => {
    const sql = 'select * from users where userName = ?';
    return await db.query(sql, [userName]);
  },
  // 連接DB插入用戶訊息
  Register: async (userName, password) => {
    const sql = 'insert into users values(null,?,?,null)';
    return await db.query(sql, [userName, password]);
  },
};
