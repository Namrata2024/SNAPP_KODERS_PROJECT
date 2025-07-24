const jwt = require("jsonwebtoken");
const JWT_SECRET = "superlongandsecuresecretkey123!@#%&*()_+"; // move to .env


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token required" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
