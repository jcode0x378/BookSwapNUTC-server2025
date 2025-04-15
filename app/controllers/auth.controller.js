const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../../config');

// 用戶註冊
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 檢查電子郵件是否已存在
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '該電子郵件已被註冊',
      });
    }

    // 創建新用戶
    const newUser = await User.create({ username, email, password });

    // 生成 JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    );

    res.status(201).json({
      success: true,
      message: '註冊成功',
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error('註冊錯誤:', error);
    res.status(500).json({
      success: false,
      message: '註冊過程中發生錯誤',
      error: config.env === 'development' ? error.message : undefined,
    });
  }
};

// 用戶登入
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 檢查用戶是否存在
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '電子郵件或密碼不正確',
      });
    }

    // 驗證密碼
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '電子郵件或密碼不正確',
      });
    }

    // 生成 JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn },
    );

    res.status(200).json({
      success: true,
      message: '登入成功',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          profile_img: user.profile_img,
        },
        token,
      },
    });
  } catch (error) {
    console.error('登入錯誤:', error);
    res.status(500).json({
      success: false,
      message: '登入過程中發生錯誤',
      error: config.env === 'development' ? error.message : undefined,
    });
  }
};

// 獲取當前用戶信息
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '找不到用戶',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          profile_img: user.profile_img,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    console.error('獲取用戶信息錯誤:', error);
    res.status(500).json({
      success: false,
      message: '獲取用戶信息過程中發生錯誤',
      error: config.env === 'development' ? error.message : undefined,
    });
  }
};
