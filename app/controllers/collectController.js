const collectDao = require('../models/dao/collectDao');
const productDao = require('../models/dao/productDao');
const checkLogin = require('../middleware/checkLogin');

module.exports = {
  /**
   * 添加收藏
   * @param {Object} ctx
   */
  AddCollect: async ctx => {
    let { user_id, product_id } = ctx.request.body;

    if (!checkLogin(ctx, user_id)) {
      return;
    }

    let tempCollect = await collectDao.FindCollect(user_id, product_id);

    if (tempCollect.length > 0) {
      ctx.body = {
        code: '003',
        msg: '該商品已經添加收藏，請到我的收藏查看',
      };
      return;
    }
    const timeTemp = new Date().getTime();
    try {
      // 把收藏商品資料加入資料庫
      const result = await collectDao.AddCollect(user_id, product_id, timeTemp);
      // 加入成功
      if (result.affectedRows === 1) {
        ctx.body = {
          code: '001',
          msg: '加入收藏成功',
        };
        return;
      }
    } catch (error) {
      reject(error);
    }

    ctx.body = {
      code: '002',
      msg: '加入收藏失敗',
    };
  },
  /**
   * 獲取用戶的所有收藏商品信息
   * @param {Object} ctx
   */
  GetCollect: async ctx => {
    let { user_id } = ctx.request.body;
    if (!checkLogin(ctx, user_id)) {
      return;
    }
    const collect = await collectDao.GetCollect(user_id);

    if (collect.length == 0) {
      ctx.body = {
        code: '002',
        msg: '該用戶沒有收藏的商品',
      };
      return;
    }

    let collectList = [];
    for (let i = 0; i < collect.length; i++) {
      const temp = collect[i];
      const product = await productDao.GetProductById(temp.product_id);
      collectList.push(product[0]);
    }

    ctx.body = {
      code: '001',
      collectList: collectList,
    };
  },
  /**
   * 刪除用戶的收藏商品信息
   * @param {Object} ctx
   */
  DeleteCollect: async ctx => {
    let { user_id, product_id } = ctx.request.body;
    if (!checkLogin(ctx, user_id)) {
      return;
    }

    let tempCollect = await collectDao.FindCollect(user_id, product_id);

    if (tempCollect.length > 0) {
      try {
        const result = await collectDao.DeleteCollect(user_id, product_id);
        if (result.affectedRows === 1) {
          ctx.body = {
            code: '001',
            msg: '刪除收藏成功',
          };
          return;
        }
      } catch (error) {
        reject(error);
      }
    } else {
      ctx.body = {
        code: '002',
        msg: '該商品不在收藏列表',
      };
    }
  },
};
