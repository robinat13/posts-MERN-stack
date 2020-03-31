const express = require("express");
const router = express.Router();
const getUser = require("./lib/getUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const authenticateToken = require("../routes/lib/authenticateToken");

router.post("/login", getUser, async (req, res) => {
  let savedRefreshToken;
  let user;
  let validPassword;
  if (res.user) {
    user = res.user;
    try {
      validPassword = await bcrypt.compare(req.body.password, user.password);
    } catch {
      res.status(401).sendStatus(500);
    }

    if (validPassword) {
      const token = generateToken(user._id);

      try {
        savedRefreshToken = await RefreshToken.findOne({
          userId: user._id
        });
      } catch {
        return res.sendStatus(500);
      }
      if (savedRefreshToken === null) {
        const clientRefreshToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_REFRESH_TOKEN_KEY
        );

        const refreshToken = new RefreshToken({
          token: clientRefreshToken,
          userId: user._id
        });

        try {
          savedRefreshToken = await refreshToken.save();
        } catch {
          res.sendStatus(500);
        }
      }

      res.status(200).json({
        message: "login success",
        token,
        refreshToken: savedRefreshToken.token
      });
    } else {
      throw new Error("Incorrect Pass");
    }
  } else {
    res.status(401).send({ message: "Username or Password Incorrect" });
  }
});

router.post("/refresh-token", async (req, res) => {
  let refreshToken;
  const clientRefreshToken = req.body.token;

  if (!clientRefreshToken) {
    return res.sendStatus(401);
  }
  try {
    refreshToken = await RefreshToken.findOne({
      token: clientRefreshToken
    });
  } catch {
    return res.sendStatus(500);
  }
  if (refreshToken === null) {
    return res.sendStatus(403);
  }
  jwt.verify(
    refreshToken.token,
    process.env.JWT_REFRESH_TOKEN_KEY,
    (err, user) => {
      if (err) return res.sendStatus(403);

      const newAccessToken = generateToken(user.userId);
      res.status(200).json({ newAccessToken });
    }
  );
});

router.post("/logout", authenticateToken, async (req, res) => {
  if (req.user) {
    let deletedRefreshToken;
    try {
      deletedRefreshToken = await RefreshToken.deleteOne({
        userId: req.user.userId
      });
    } catch {
      return res.sendStatus(500);
    }
    if (deletedRefreshToken.n) {
      return res.status(200).json({ message: "logout success" });
    } else {
      return res
        .status(404)
        .json({ message: "Invalid Request, already logged out" });
    }
  }
});

function generateToken(id) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_TOKEN_KEY, {
    expiresIn: "50m"
  });
}

module.exports = router;
