import jwt from "jsonwebtoken";
import config from "config";

module.exports = (req, res, next) => {

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send({error: "Access denied. No token provided."});

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({error:"Invalid token."});
  }
};