const router = require("express").Router();
const { Post, Comment, User } = require("../models");

router.get(
  "/",
  // withAuth,
  async (req, res) => {
    try {
      const postUserData = await Post.findAll({
        where: {
          userId: req.session.userId,
        },
      });
      const userPosts = postUserData.map((post) => post.get({ plain: true }));

      res.render("dashboard-byUser", { userPosts });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
