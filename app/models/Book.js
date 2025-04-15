const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    condition: {
      type: DataTypes.ENUM('全新', '良好', '一般', '破損'),
      allowNull: false,
      defaultValue: '良好',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('selling', 'sold', 'reserved'),
      allowNull: false,
      defaultValue: 'selling',
    },
    soldAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Book;
