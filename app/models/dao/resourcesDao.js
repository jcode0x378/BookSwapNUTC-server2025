const db = require('./db.js');

module.exports = {
  // 連接DB取得BANNER圖片
  Carousel: async () => {
    const sql = 'select * from carousel';
    return await db.query(sql, []);
  },
};
