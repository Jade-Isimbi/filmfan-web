export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }

  try {
    
    req.user = "VERIFIED";
    next();
  } catch (err) {
    if (err) return res.status(403).json({ message: "Invalid Token" });
  }
};
