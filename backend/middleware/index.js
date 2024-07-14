const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer")) {
    return res.status(403).json({});
  }

  const tokenArr = token.split(" ")[1];

  try {
    const decoded = jwt.verify(tokenArr, JWT_KEY);
    req.email = decoded.email;
    next();
  } catch (err) {
    res.json({ msg: "User not found" });
  }
};

module.exports = authMiddleware;
