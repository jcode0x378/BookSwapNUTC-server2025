const db = require('../utils/db');
const bcrypt = require('bcryptjs');

class User {
  // 根據 ID 獲取用戶
  static async findById(id) {
    return await db.getOne(
      'SELECT id, username, email, profile_img, created_at, updated_at FROM users WHERE id = ?',
      [id],
    );
  }

  // 根據電子郵件獲取用戶
  static async findByEmail(email) {
    return await db.getOne('SELECT * FROM users WHERE email = ?', [email]);
  }

  // 創建新用戶
  static async create(userData) {
    const { username, email, password } = userData;

    // 加密密碼
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      'INSERT INTO users (username, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [username, email, hashedPassword],
    );

    return { id: result.insertId, username, email };
  }

  // 更新用戶資料
  static async update(id, userData) {
    const { username, email, profile_img } = userData;

    await db.query(
      'UPDATE users SET username = ?, email = ?, profile_img = ?, updated_at = NOW() WHERE id = ?',
      [username, email, profile_img, id],
    );

    return await this.findById(id);
  }

  // 驗證密碼
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
