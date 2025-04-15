
const productDao = require('../models/dao/productDao');
module.exports = {
  /**
   * 獲取商品分類
   * @param {Object} ctx
   */
  GetCategory: async ctx => {
    const category = await productDao.GetCategory();

    ctx.body = {
      code: '001',
      category,
    };
  },
  /**
   * 根據商品分類名稱獲取首頁展示的商品信息
   * @param {Object} ctx
   */
  GetPromoProduct: async ctx => {
    let { categoryName } = ctx.request.body;
    const categoryID = await productDao.GetCategoryId(categoryName);
    const Product = await productDao.GetPromoProduct(categoryID);

    ctx.body = {
      code: '001',
      Product,
    };
  },
  /**
   * 根據商品分類名稱獲取熱門商品信息
   * @param {Object} ctx
   */
  GetHotProduct: async ctx => {
    let { categoryName } = ctx.request.body;
    const categoryID = [];

    for (let i = 0; i < categoryName.length; i++) {
      const category_id = await productDao.GetCategoryId(categoryName[i]);
      categoryID.push(category_id);
    }
    const Product = await productDao.GetProductByCategory(categoryID, 0, 7);

    ctx.body = {
      code: '001',
      Product,
    };
  },
  /**
   * 分頁獲取所有的商品信息
   * @param {Object} ctx
   */
  GetAllProduct: async ctx => {
    let { currentPage, pageSize } = ctx.request.body;
    const offset = (currentPage - 1) * pageSize;
    const Product = await productDao.GetAllProduct(offset, pageSize);
    const total = (await productDao.GetAllProduct()).length;
    ctx.body = {
      code: '001',
      Product,
      total,
    };
  },
  /**
   * 根據分類id,分頁獲取商品信息
   * @param {Object} ctx
   */
  GetProductByCategory: async ctx => {
    let { categoryID, currentPage, pageSize } = ctx.request.body;
    const offset = (currentPage - 1) * pageSize;
    const Product = await productDao.GetProductByCategory(
      categoryID,
      offset,
      pageSize,
    );
    const total = (await productDao.GetProductByCategory(categoryID)).length;

    ctx.body = {
      code: '001',
      Product,
      total,
    };
  },
  /**
   * 根據搜索條件,分頁獲取商品信息
   * @param {Object} ctx
   */
  GetProductBySearch: async ctx => {
    let { search, currentPage, pageSize } = ctx.request.body;
    const offset = (currentPage - 1) * pageSize;
    const category = await productDao.GetCategory();

    let Product;
    let total;

    for (let i = 0; i < category.length; i++) {
      if (search == category[i].category_name) {
        Product = await productDao.GetProductByCategory(
          category[i].category_id,
          offset,
          pageSize,
        );
        total = (await productDao.GetProductByCategory(category[i].category_id))
          .length;

        ctx.body = {
          code: '001',
          Product,
          total,
        };
        return;
      }
    }
    Product = await productDao.GetProductBySearch(search, offset, pageSize);
    total = (await productDao.GetProductBySearch(search)).length;

    ctx.body = {
      code: '001',
      Product,
      total,
    };
  },
  /**
   * 根據商品id,獲取商品詳細信息
   * @param {Object} ctx
   */
  GetDetails: async ctx => {
    let { productID } = ctx.request.body;

    const Product = await productDao.GetProductById(productID);

    ctx.body = {
      code: '001',
      Product,
    };
  },
  /**
   * 根據商品id,獲取商品圖片,用於食品詳情的頁面展示
   * @param {Object} ctx
   */
  GetDetailsPicture: async ctx => {
    let { productID } = ctx.request.body;

    const ProductPicture = await productDao.GetDetailsPicture(productID);

    ctx.body = {
      code: '001',
      ProductPicture,
    };
  },
};
