const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
      if (err) res.status(403).json("invalid Token!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("invalid Authentication!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.param.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("unauthorised!");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("unauthorised!");
    }
  });
};

module.exports = {
  verifyTokenAndAuthorization,
  verifyAdmin,
};
