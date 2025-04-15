
module.exports = {
  /**
   * 校驗用戶信息是否符合規則
   * @param {Object} ctx
   * @param {string} userName
   * @param {string} password
   * @return:
   */
  checkUserInfo: (ctx, userName = '', password = '') => {
    // userName = userName ? userName : '';
    // password = password ? password : '';
    // 判斷是否為空
    if (userName.length === 0 || password.length === 0) {
      ctx.body = {
        code: '002',
        msg: '用戶名或密碼不能為空',
      };
      return false;
    }

    const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    if (!userNameRule.test(userName)) {
      ctx.body = {
        code: '003',
        msg: '用戶名不合法(以字母開頭，允許5-16字節，允許字母數字下劃線)',
      };
      return false;
    }
    // 密碼校驗規則
    const passwordRule = /^[a-zA-Z]\w{5,17}$/;
    if (!passwordRule.test(password)) {
      ctx.body = {
        code: '003',
        msg: '密碼不合法(以字母開頭，長度在6~18之間，只能包含字母、數字和下劃線)',
      };
      return false;
    }

    return true;
  },
  /**
   * 校驗用戶名是否符合規則
   * @param {type}
   * @return:
   */
  checkUserName: (ctx, userName = '') => {
    // 判斷是否為空
    if (userName.length === 0) {
      ctx.body = {
        code: '002',
        msg: '用戶名不能為空',
      };
      return false;
    }
    // 用戶名校驗規則
    const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    if (!userNameRule.test(userName)) {
      ctx.body = {
        code: '003',
        msg: '用戶名不合法(以字母開頭，允許5-16字節，允許字母數字下劃線)',
      };
      return false;
    }

    return true;
  },
};
