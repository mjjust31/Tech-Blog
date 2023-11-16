// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/connection");
// const bcrypt = require("bcrypt");

// class Post extends Model {}

// Post.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//     },
//     content: {
//       type: DataTypes.STRING,
//     },
//   },

//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "post",
//   }
// );

// module.exports = Post;


const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  },
  {
    sequelize
  }
);

module.exports = Post;
