const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const BookImage = sequelize.define(
  'BookImage',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = BookImage;
