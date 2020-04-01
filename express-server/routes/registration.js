const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const getUser = require("../routes/lib/getUser");

router.post("/", getUser, async (req, res) => {
  console.log("REGISTRATION ENDPOINT CALLED");

  if (res.user) {
    return res.status(400).json({
      message: `User already exists with username - ${req.body.username}`
    });
  }
  const encryptedPassword = await bcrypt.hash(req.body.password, 5);
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: encryptedPassword
  });
  try {
    const savedUser = await user.save();

    res.status(201).json({ message: `User created with id ${savedUser._id}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
