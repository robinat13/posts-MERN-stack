const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
  });

  next();
};

module.exports = authenticateToken;
