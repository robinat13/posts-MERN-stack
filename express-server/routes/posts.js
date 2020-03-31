const express = require("express");
const router = express.Router();
const authenticateToken = require("../routes/lib/authenticateToken");
const Post = require("../models/Post");
const mongoose = require("mongoose");

router.get("/", authenticateToken, async (req, res) => {
  let posts = [];
  if (req.user) {
    posts = await Post.find({ userId: req.user.userId });
    if (!posts) {
      res.status(200).json([]);
    } else {
      res.status(200).json(posts);
    }
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const post = new Post({
    userId: req.user.userId,
    title: req.body.title,
    description: req.body.description
  });
  try {
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch {
    res.sendStatus(500);
  }
});

router.patch("/:id", [authenticateToken, getPostById], async (req, res) => {
  if (req.user)
    if (req.user.userId !== req.post.userId) {
      return res.status(400).json({ message: "Access denied to the resource" });
    }
  let updatedPost;
  if (req.user)
    if (req.post) {
      if (req.body.title) req.post.title = req.body.title;
      if (req.body.description) req.post.description = req.body.description;
      try {
        updatedPost = await req.post.save();
        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
});

router.delete("/:id", [authenticateToken, getPostById], async (req, res) => {
  if (req.user)
    if (req.user.userId !== req.post.userId) {
      return res.status(400).json({ message: "Access denied to the resource" });
    }
  if (req.post) {
    try {
      const deletedPost = await req.post.delete();
      return res.status(200).json({ message: "Deleted" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

async function getPostById(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  let post;
  try {
    post = await Post.findById(req.params.id);

    if (post === null) {
      return res
        .status(404)
        .json({ message: `Post not found with id : ${req.params.id}` });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
  req.post = post;
  next();
}

module.exports = router;
