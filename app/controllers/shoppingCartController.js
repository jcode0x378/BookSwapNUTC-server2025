const shoppingCartDao = require('../models/dao/shoppingCartDao');
const productDao = require('../models/dao/productDao');
const checkLogin = require('../middleware/checkLogin');

let methods = {
  /**
   * 生成購物車詳細訊息
   * @param {Object} data
   */
  ShoppingCartData: async data => {
    let shoppingCartData = [];
    for (let i = 0; i < data.length; i++) {
      const temp = data[i];
      const product = await productDao.GetProductById(temp.product_id);

      let shoppingCartDataTemp = {
        id: temp.id,
        productID: temp.product_id,
        productName: product[0].product_name,
        productImg: product[0].product_picture,
        price: product[0].product_selling_price,
        num: temp.num,
        maxNum: Math.floor(product[0].product_num / 2),
        check: false,
      };

      shoppingCartData.push(shoppingCartDataTemp);
    }
    return shoppingCartData;
  },
};

module.exports = {
  /**
   * 獲取購物車訊息
   * @param {Object} ctx
   */
  GetShoppingCart: async ctx => {
    let { user_id } = ctx.request.body;
    
    // 確保 user_id 存在
    if (!user_id) {
      ctx.body = {
        code: '401',
        msg: '請先登入'
      };
      return;
    }
    
    if (!checkLogin(ctx, user_id)) {
      return;
    }
    
    try {
      const shoppingCart = await shoppingCartDao.GetShoppingCart(user_id);
      const data = await methods.ShoppingCartData(shoppingCart);
      
      ctx.body = {
        code: '001',
        shoppingCartData: data
      };
    } catch (error) {
      ctx.body = {
        code: '500',
        msg: '獲取購物車資料失敗'
      };
    }
  },
  /**
   * 插入購物車信息
   * @param {Object} ctx
   */
  AddShoppingCart: async ctx => {
    let { user_id, product_id } = ctx.request.body;

    if (!checkLogin(ctx, user_id)) {
      return;
    }

    let tempShoppingCart = await shoppingCartDao.FindShoppingCart(
      user_id,
      product_id,
    );
    if (tempShoppingCart.length > 0) {
      const tempNum = tempShoppingCart[0].num + 1;

      const product = await productDao.GetProductById(
        tempShoppingCart[0].product_id,
      );
      const maxNum = Math.floor(product[0].product_num / 2);
      if (tempNum > maxNum) {
        ctx.body = {
          code: '003',
          msg: '數量達到限購數量 ' + maxNum,
        };
        return;
      }

      try {
        const result = await shoppingCartDao.UpdateShoppingCart(
          tempNum,
          user_id,
          product_id,
        );

        if (result.affectedRows === 1) {
          ctx.body = {
            code: '002',
            msg: '該商品已在購物車，數量 +1',
          };
          return;
        }
      } catch (error) {
        reject(error);
      }
    } else {
      try {
        const res = await shoppingCartDao.AddShoppingCart(user_id, product_id);
        if (res.affectedRows === 1) {
          const shoppingCart = await shoppingCartDao.FindShoppingCart(
            user_id,
            product_id,
          );
          const data = await methods.ShoppingCartData(shoppingCart);

          ctx.body = {
            code: '001',
            msg: '添加購物車成功',
            shoppingCartData: data,
          };
          return;
        }
      } catch (error) {
        reject(error);
      }
    }

    ctx.body = {
      code: '005',
      msg: '添加購物車失敗,未知錯誤',
    };
  },
  /**
   * 刪除購物車信息
   * @param {Object} ctx
   */
  DeleteShoppingCart: async ctx => {
    let { user_id, product_id } = ctx.request.body;

    if (!checkLogin(ctx, user_id)) {
      return;
    }

    let tempShoppingCart = await shoppingCartDao.FindShoppingCart(
      user_id,
      product_id,
    );

    if (tempShoppingCart.length > 0) {
      try {
        const result = await shoppingCartDao.DeleteShoppingCart(
          user_id,
          product_id,
        );
        if (result.affectedRows === 1) {
          ctx.body = {
            code: '001',
            msg: '刪除購物車成功',
          };
          return;
        }
      } catch (error) {
        reject(error);
      }
    } else {
      ctx.body = {
        code: '002',
        msg: '該商品不在購物車',
      };
    }
  },
  /**
   * 更新購物車商品數量
   * @param {Object} ctx
   */
  UpdateShoppingCart: async ctx => {
    let { user_id, product_id, num } = ctx.request.body;

    if (!checkLogin(ctx, user_id)) {
      return;
    }

    if (num < 1) {
      ctx.body = {
        code: '004',
        msg: '數量不合法',
      };
      return;
    }

    let tempShoppingCart = await shoppingCartDao.FindShoppingCart(
      user_id,
      product_id,
    );

    if (tempShoppingCart.length > 0) {
      if (tempShoppingCart[0].num == num) {
        ctx.body = {
          code: '003',
          msg: '數量沒有發生變化',
        };
        return;
      }
      const product = await productDao.GetProductById(product_id);
      const maxNum = Math.floor(product[0].product_num / 2);
      if (num > maxNum) {
        ctx.body = {
          code: '004',
          msg: '數量達到限購數量 ' + maxNum,
        };
        return;
      }

      try {
        const result = await shoppingCartDao.UpdateShoppingCart(
          num,
          user_id,
          product_id,
        );
        if (result.affectedRows === 1) {
          ctx.body = {
            code: '001',
            msg: '修改購物車數量成功',
          };
          return;
        }
      } catch (error) {
        reject(error);
      }
    } else {
      ctx.body = {
        code: '002',
        msg: '該商品不在購物車',
      };
    }
  },
};
