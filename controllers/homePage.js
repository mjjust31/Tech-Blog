const router = require("express").Router();
const { User } = require("../models/User");
// const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;