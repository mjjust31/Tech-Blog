const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const bcrypt = require("bcrypt");
// const withAuth = require('../utils/auth')

const apiRoutes = require("./api/");
const homePage = require("./homePage.js");
const withAuth = require("../utils/auth");

// router.use("/api", apiRoutes);
// router.use("/", homePage);

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [User] });
    const post = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/login", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }
//   res.render("userLogin");
// });

// router.get("/signup", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }
//   res.render("userNew");
// });

router.get("/user/sign", async (req, res) => {
  try {
    res.render("userNew");
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
      req.session.userid = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.json(newUser);
    });
    console.log("id", newUser.id);
    console.log("username", newUser.username);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/user/login", async (req, res) => {
  try {
    res.render("userLogin");
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

    if (!returnUser) {
      res.status(400).json({ message: "Wrong login information" });
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
    req.session.save(() => {
      req.session.userid = returnUser.id;
      req.session.username = returnUser.username;
      req.session.loggedIn = true;
      // res.status(200).json(returnUser);
    });
    console.log("returnid", returnUser.id);
    console.log("returnuser", returnUser.username);
  } catch (err) {
    res.status(400).json({ message: "This did not work" });
  }
});

router.post("/user/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get(
  "/post",
  //  withAuth,
  async (req, res) => {
    try {
      res.render("newPost");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post(
  "/post",
  //  withAuth,
  async (req, res) => {
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
  }
);

router.get(
  "/dashboard",
  // withAuth,
  async (req, res) => {
    try {
      const postUserData = await Post.findAll({
        where: {
          userId: req.session.userId,
        },
      });
      const userPosts = postUserData.map((post) => post({ plain: true }));

      res.render("user_dashboard", { layout: "login", userPosts });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
