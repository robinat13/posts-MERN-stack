const User = require("../../models/User");

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findOne({ username: req.body.username });

    if (user) {
      res.user = user;
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  next();
}

module.exports = getUser;
