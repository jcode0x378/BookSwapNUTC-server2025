
const db = require('./db.js');

module.exports = {
  // 連接DB取得商品分類
  GetCategory: async () => {
    const sql = 'select * from category';
    return await db.query(sql, []);
  },
  // 連接DB根據商品分類名稱取得分類id
  GetCategoryId: async categoryName => {
    const sql = 'select * from category where category_name = ?';
    const category = await db.query(sql, [categoryName]);
    return category[0].category_id;
  },
  // 連接DB,根據商品分類id取得首頁展示的商品訊息
  GetPromoProduct: async categoryID => {
    const sql =
      'select * from product where category_id = ? order by product_sales desc limit 7';
    return await db.query(sql, categoryID);
  },
  // 連接DB,分頁取得所有的商品訊息
  GetAllProduct: async (offset = 0, rows = 0) => {
    let sql = 'select * from product ';
    if (rows != 0) {
      sql += 'limit ' + offset + ',' + rows;
    }
    return await db.query(sql, []);
  },
  // 連接DB,根據商品分類id,分頁取得商品訊息
  GetProductByCategory: async (categoryID, offset = 0, rows = 0) => {
    let sql = 'select * from product where category_id = ? ';

    for (let i = 0; i < categoryID.length - 1; i++) {
      sql += 'or category_id = ? ';
    }
    if (rows != 0) {
      sql += 'order by product_sales desc limit ' + offset + ',' + rows;
    }

    return await db.query(sql, categoryID);
  },
  // 連接DB,根據搜索條件,分頁取得商品訊息
  GetProductBySearch: async (search, offset = 0, rows = 0) => {
    let sql = `select * from product where product_name like "%${search}%" or product_title like "%${search}%" or product_intro like "%${search}%"`;

    if (rows != 0) {
      sql += 'order by product_sales desc limit ' + offset + ',' + rows;
    }

    return await db.query(sql, []);
  },
  // 連接DB,根據商品id,取得商品詳細訊息
  GetProductById: async id => {
    const sql = 'select * from product where product_id = ?';
    return await db.query(sql, id);
  },
  // 連接DB,根據商品id,取得商品圖片
  GetDetailsPicture: async productID => {
    const sql = 'select * from product_picture where product_id = ? ';
    return await db.query(sql, productID);
  },
};
