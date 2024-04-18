const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isUserAuthenticated = async (req, res, next) => {
  try {
    const { token } = await req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role: ${req.user.role} is not allowed to access this resource`,
      });
    }
    next();
  };
};
