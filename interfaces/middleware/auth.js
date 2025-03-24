import { verifyAccessToken } from "../../utils/jwt.js";

export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No access token" });

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const authorizeRole = (roles) => (req, res, next) => {
  console.log(req.user.role);
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Insufficient permission" });
  }
  next();
};
