const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    //if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) { ... } checks if the request headers contain an Authorization header that starts with "Bearer." This is a common pattern for including JWTs in HTTP requests.
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];


      // Decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      console.log("Unauthorized access");
      return res.json({ error: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401);
    return res.json({ error: "Not authorized, no token" });
  }
});

module.exports = { protect };
