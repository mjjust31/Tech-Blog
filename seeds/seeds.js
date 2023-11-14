const sequelize = require("../config/connection");
const User = require("../models/user");
const Post = require("../models/posts");
const Comment = require("../models/comment");

const CommentData = require("./commentData");
const postData = require("./postData");
const userData = require("./userData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const comments = await Comment.bulkCreate(CommentData);
  const post = await Post.bulkCreate(postData);
  const user = await User.bulkCreate(userData);
  console.log("Database seeded!");
  process.exit(0);
};
seedDatabase();
