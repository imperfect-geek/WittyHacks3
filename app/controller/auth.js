const jwt = require("jsonwebtoken");

const verifyjwt = (req, res, next) => {
  const { token } = req.cookies;
  const jwt_secret = process.env.JWT_SECRET;
  if (!token) {
    res.status(400).json({ message: "no token" });
  } else {
    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyjwt;
