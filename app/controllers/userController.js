/*
 * @Description: 用戶模塊控制器
 * @Author: Jeffrey
 * @Date: 2024-12-15 16:51:56
 * @LastEditors: Jeffrey
 * @LastEditTime: 2024-12-15 16:03:09
 */
const rp = require('request-promise');
const userDao = require('../models/dao/userDao');
const { checkUserInfo, checkUserName } = require('../middleware/checkUserInfo');

module.exports = {
  /**
   * 用戶登入
   * @param {Object} ctx
   */
  Login: async ctx => {
    let { userName, password } = ctx.request.body;

    // 驗證用戶輸入
    if (!checkUserInfo(ctx, userName, password)) {
      return;
    }

    try {
      // 查詢用戶信息
      let user = await userDao.Login(userName, password);

      if (user.length === 1) {
        // 構建用戶會話信息
        const loginUser = {
          user_id: user[0].user_id,
          userName: user[0].userName,
          // 可以添加其他需要的用戶信息
        };

        // 設置會話
        ctx.session.user = loginUser;

        // 返回成功響應
        ctx.body = {
          code: '001',
          user: loginUser,
          msg: '登入成功',
        };
        return;
      }

      // 登入失敗響應
      ctx.body = {
        code: '004',
        msg: '用戶名或密碼錯誤',
      };
    } catch (error) {
      console.error('登入錯誤:', error);
      ctx.body = {
        code: '500',
        msg: '伺服器錯誤，請稍後重試',
      };
    }
  },
  /**
   * 微信小程序用戶登入
   * @param {Object} ctx
   */
  miniProgramLogin: async ctx => {
    const appid = 'wxb1ea404aa342a710';
    const secret = 'fc6ef01489767a3ed472648de9efa1e5';
    let { code } = ctx.request.body;

    const api = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    // 通過 wx.login 接口獲得臨時登入憑證 code 後
    // 傳到開發者服務器調用此接口完成登入流程。
    const res = await rp.get({
      json: true,
      uri: api,
    });
    const { session_key, openid } = res;

    // 連接數據庫根據用戶名查詢用戶信息
    let user = await userDao.FindUserName(openid);
    if (user.length === 0) {
      // 結果集長度為0則代表不存在該用戶,先註冊
      try {
        // 連接數據庫插入用戶信息
        let registerResult = await userDao.Register(openid, openid);
        if (registerResult.affectedRows === 1) {
          // 操作所影響的記錄行數為1,則代表註冊成功
          await login(); // 登入
        }
      } catch (error) {
        console.log(error);
      }
    } else if (user.length === 1) {
      // 如果已經存在，直接登入
      await login();
    } else {
      ctx.body = {
        code: '500',
        msg: '未知錯誤',
      };
    }
    async function login() {
      // 連接數據庫根據用戶名和密碼查詢用戶信息
      let tempUser = await userDao.Login(openid, openid);
      if (tempUser.length === 0) {
        // 登入失敗
        ctx.body = {
          code: '004',
          msg: '登入失敗',
        };
        return;
      }
      if (tempUser.length === 1) {
        // 登入成功
        const loginUser = {
          user_id: tempUser[0].user_id,
          openId: openid,
          sessionKey: session_key,
        };
        // 保存用戶信息到session
        ctx.session.user = loginUser;

        ctx.body = {
          code: '001',
          userId: tempUser[0].user_id,
          msg: '登入成功',
        };
        return;
      }
    }
  },
  /**
   * 查詢是否存在某個用戶名,用於註冊時前端校驗
   * @param {Object} ctx
   */
  FindUserName: async ctx => {
    let { userName } = ctx.request.body;

    // 校驗用戶名是否符合規則
    if (!checkUserName(ctx, userName)) {
      return;
    }
    let user = await userDao.FindUserName(userName);
    if (user.length === 0) {
      ctx.body = {
        code: '001',
        msg: '用戶名不存在，可以註冊',
      };
      return;
    }

    if (user.length === 1) {
      ctx.body = {
        code: '004',
        msg: '用戶名已經存在，不能註冊',
      };
      return;
    }

    ctx.body = {
      code: '500',
      msg: '未知錯誤',
    };
  },
  Register: async ctx => {
    let { userName, password } = ctx.request.body;

    if (!checkUserInfo(ctx, userName, password)) {
      return;
    }

    let user = await userDao.FindUserName(userName);

    if (user.length !== 0) {
      ctx.body = {
        code: '004',
        msg: '用戶名已經存在，不能註冊',
      };
      return;
    }

    try {
      let registerResult = await userDao.Register(userName, password);

      if (registerResult.affectedRows === 1) {
        ctx.body = {
          code: '001',
          msg: '註冊成功',
        };
        return;
      }

      ctx.body = {
        code: '500',
        msg: '未知錯誤，註冊失敗',
      };
    } catch (error) {
      reject(error);
    }
  },
};
