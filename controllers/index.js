const router = require("express").Router();
const Post = require("../models/posts");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    const post = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard-posts", { post });
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

router.post("/user/login", async (req, res) => {
  console.log(req.body);
  try {
    const returnUser = await User.findOne({
      where: { username: req.body.username },
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });

    if (!returnUser) {
      res.status(400).json({ message: "Wrong login inforomation" });
      return;
    }
    const isPasswordValid = await returnUser.validatePassword(
      req.body.password
    );
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      res.status(400).json({ message: "You hit the password route" });
      return;
    }
    console.log(returnUser);
    // res.redirect("/dashboard");
  } catch (err) {
    res.status(400).json({ message: "This did not work" });
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
