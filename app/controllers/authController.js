const jwt = require('jsonwebtoken');
const { User } = require('../models');

// 生成 JWT
const generateToken = user => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// 註冊
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 檢查用戶是否已存在
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '該電子郵件已被註冊',
      });
    }

    // 創建新用戶
    const user = await User.create({
      username,
      email,
      password,
    });

    // 返回用戶信息（不包含密碼）
    const userData = user.toJSON();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: '註冊成功',
      user: userData,
    });
  } catch (error) {
    console.error('註冊失敗:', error);
    res.status(500).json({
      success: false,
      message: '註冊失敗',
      error: error.message,
    });
  }
};

// 登入
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 檢查用戶是否存在
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '電子郵件或密碼不正確',
      });
    }

    // 檢查密碼是否正確
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '電子郵件或密碼不正確',
      });
    }

    // 生成 JWT
    const token = generateToken(user);

    // 返回用戶信息和 token
    const userData = user.toJSON();
    delete userData.password;

    res.json({
      success: true,
      message: '登入成功',
      token,
      user: userData,
    });
  } catch (error) {
    console.error('登入失敗:', error);
    res.status(500).json({
      success: false,
      message: '登入失敗',
      error: error.message,
    });
  }
};

// 獲取當前用戶信息
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '找不到用戶',
      });
    }

    res.json(user);
  } catch (error) {
    console.error('獲取用戶信息失敗:', error);
    res.status(500).json({
      success: false,
      message: '獲取用戶信息失敗',
      error: error.message,
    });
  }
};

// 更新用戶資料
exports.updateProfile = async (req, res) => {
  try {
    const { username, phone, department, bio } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    // 更新用戶資料
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '找不到用戶',
      });
    }

    // 更新字段
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (department) user.department = department;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();

    // 返回更新後的用戶資料
    const userData = user.toJSON();
    delete userData.password;

    res.json(userData);
  } catch (error) {
    console.error('更新用戶資料失敗:', error);
    res.status(500).json({
      success: false,
      message: '更新用戶資料失敗',
      error: error.message,
    });
  }
};

// 修改密碼
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 獲取用戶
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '找不到用戶',
      });
    }

    // 檢查當前密碼是否正確
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '當前密碼不正確',
      });
    }

    // 更新密碼
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: '密碼已成功修改',
    });
  } catch (error) {
    console.error('修改密碼失敗:', error);
    res.status(500).json({
      success: false,
      message: '修改密碼失敗',
      error: error.message,
    });
  }
};
