const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const bcrypt = require("bcrypt");
// const withAuth = require('../utils/auth')

const apiRoutes = require("./api/");
const homePage = require("./homePage.js");

router.use("/api", apiRoutes);
router.use("/", homePage);


router.get("/dashboard", async (req, res) => {
  try {
    const postUserData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });
    const userPosts = postUserData.map((post) => post({ plain: true }));

    res.render("user_dashboard", { userPosts });
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
      userId: req.session.userId,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
