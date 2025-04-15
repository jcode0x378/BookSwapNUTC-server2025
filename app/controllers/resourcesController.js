const resourcesDao = require('../models/dao/resourcesDao');
module.exports = {
  /**
   * 獲取輪播圖數據
   * @param {Object} ctx
   */
  Carousel: async ctx => {
    let carousel = await resourcesDao.Carousel();
    ctx.body = {
      code: '001',
      carousel,
    };
  },
};
