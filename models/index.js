const User = require('./user');
const Post = require('./posts');
const Comment = require('./comment');








Post.belongsTo(User)

Post.hasMany(Comment)


Comment.belongsTo(User)






module.exports = {
  User,
  Comment,
  Post
};