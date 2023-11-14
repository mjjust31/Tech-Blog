const router = require("express").Router();
const Post = require("../models/posts");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    res.render("dashboard-posts");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/sign", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/user/sign", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/user/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    res.render("user_main");
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
