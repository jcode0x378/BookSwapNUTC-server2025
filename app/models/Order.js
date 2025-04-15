const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Order = sequelize.define('Order', {
  orderNo: {
    type: DataTypes.STRING,
    unique: true,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
    defaultValue: 'pending',
  },
  paymentAmount: {
    type: DataTypes.INTEGER,
  },
  paymentDate: {
    type: DataTypes.DATE,
  },
  paymentType: {
    type: DataTypes.STRING,
  },
});

module.exports = Order;
