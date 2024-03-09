const User = require("../models/userModel");

// Resgister User
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample id",
        url: "sample url",
      },
    });
    const token = user.getJWT();
    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).json({ success: false, error: error });
  }
};
