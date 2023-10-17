const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "ini_jwt_loh";

exports.validateToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      ok: false,
      message: "Invalid token or token is not found bro!!",
    });
    return;
  }
  try {
    token = token.split(" ")[1];
    if (!token) {
      res.status(401).json({
        ok: false,
        message: "Invalid token or token is not found bro!!",
      });
      return;
    }
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    if (!payload) {
      res.status(401).json({
        ok: false,
        message: "Failed to get authorization broo!!",
      });
      return;
    }
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({
      ok: false,
      message: String(err),
    });
  }
};

exports.checkUserRole = (req, res, next) => {
  if (req.user.userRole === "cashier") {
    res.status(403).json({
      ok: false,
      message: "Forbidden Broo!!",
    });
    return;
  }
  next();
};


exports.checkUser = (req, res, next) => {
  if (req.user.userRole === "admin") {
    res.status(403).json({
      ok: false,
      message: "Forbidden Broo!!",
    });
    return;
  }
  next();
};

