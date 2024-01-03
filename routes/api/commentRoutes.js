const router = require("express").Router();
// const { Router } = require("express");
const { User, Post, Comment } = require("../../models");
const withAuth = require('../../utils/auth')

router.post("/", withAuth, async (req, res) => {
  try {
    const createComment = await Comment.create({
      content: req.body.content,
      userId: req.session.userId,
    });
    res.json(createComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
