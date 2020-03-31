const express = require("express");
const router = express.Router();
const getUser = require("../routes/lib/getUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", getUser, async (req, res) => {
  let user;
  if (res.user) {
    user = res.user;
    try {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = generateToken(user);
        res.status(200).json({ message: "login success", token });
      } else {
        throw new Error("Incorrect Pass");
      }
    } catch {
      res.status(401).send({ message: "Username or Password Incorrect" });
    }
  } else {
    res.status(401).send({ message: "Username or Password Incorrect" });
  }
});

function generateToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN_KEY, {
    expiresIn: "50m"
  });
}

module.exports = router;
