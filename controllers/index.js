// const router = require('express').Router();
// // const apiRoutes = require('./api')
// const homePage = require('./homePage.js')

// router.use('/', homePage)
// // router.use('/api', apiRoutes);

// module.exports = router;

const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  console.log("hit");
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.redirect("/temp");
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get("/temp", async (req, res) => {
//   try {
//     res.render("tempSignedIn");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
