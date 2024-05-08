const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

function jwtGenerator(email) {
    const payload = {
      user: email
    };
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '12h'});
}
  
function verifyToken(req, res, next) {
    const header = req.header("Authorization");
    const token = header && header.split(" ")[1];
    if (!token) {
      return res.status(403).json("Token not found");
    }
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload.user;
      next();
    } catch (err) {
      console.error(err.message);
      return res.status(403).json("Not Authorized");
    }
}

module.exports = {
    jwtGenerator: jwtGenerator,
    verifyToken: verifyToken
}