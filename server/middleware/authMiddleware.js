const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Authorization" header

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

// const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Admins only." });
//     }
//     next();
//   });
// };

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken, verifyAdmin };
