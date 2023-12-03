const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.post("/sign", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.userId = newUser.id;
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
      req.session.userId = returnUser.id;
      req.session.username = returnUser.username;
      req.session.loggedIn = true;
      res.json(returnUser);
    });
  } catch (err) {
    res.status(400).json({ message: "This did not work" });
  }
});

router.delete("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
