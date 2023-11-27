const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get(
  "/post",
  //  withAuth,
  async (req, res) => {
    try {
      res.render("postNew");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post("/post", async (req, res) => {
  // console.log(req.body);
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      // userId: req.session.userId,
    });
    res.status(200).json(newPost);
    console.log("create new post");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
