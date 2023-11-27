const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: User });
    const post = postData.map((post) => post.get({ plain: true }));

    res.render("dashboardAllPosts", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("userLogin");
});

router.get("/sign", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("userNew");
});

module.exports = router;
