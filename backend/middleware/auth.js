
// middleware/auth.js


const jwt = require("jsonwebtoken");
const SECRET_KEY = 'miteshpradhanArkaJainUniversity';

const auth = (req, res, next) => {
    // Get the token from the request cookie
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Missing token" });
    }
  
    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
      }
  
      // Attach the decoded user information to the request for further use
      req.token = token;
      req.user = user;
      next();
    });
  };



module.exports = auth;



