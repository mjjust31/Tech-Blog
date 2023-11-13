const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    res.render("dashboard-post");
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
  } catch (err) {
    res.status(400).json(err);
  }
});





module.exports = router;
