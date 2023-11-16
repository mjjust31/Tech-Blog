const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const bcrypt = require("bcrypt");

const apiRoutes = require('./api/')

router.use('/api', apiRoutes)


router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [User] });
    const post = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard-posts", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const returnUser = await User.findOne({
      where: { username: req.body.username },
    });
    const getUsername = returnUser.get({ plain: true });

    res.render("user_main", {getUsername});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post", async (req, res) => {
  try {
    res.render("newPost");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/post", async (req, res) => {
  console.log(req.body);
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});






module.exports = router;
