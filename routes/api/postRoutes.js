const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  console.log("you hit the create new post route");
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId,
    });
    res.status(200).json(newPost);
    console.log("create new post");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [editPost] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (editPost > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:id", withAuth, async (req, res) => {
  try {
    const [editPost] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (editPost > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
