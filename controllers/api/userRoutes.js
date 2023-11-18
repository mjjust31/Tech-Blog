const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/sign", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/sign", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.userid = newUser.id;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
    console.log(newUser.id)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
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
      req.session.loggedIn = true;
      res.status(200).json(returnUser);
    });

    console.log(returnUser);
  } catch (err) {
    res.status(400).json({ message: "This did not work" });
  }
});

module.exports = router;
