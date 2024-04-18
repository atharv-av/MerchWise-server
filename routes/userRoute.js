const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUser,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateRole,
} = require("../controllers/userController");
const { isUserAuthenticated, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/forgotpassword").post(forgotPassword);
router.route("/user/resetpassword/:token").put(resetPassword);
router.route("/user/logout").delete(logoutUser);
router.route("/user/myprofile").get(isUserAuthenticated, getUser);
router.route("/user/updatepassword").put(isUserAuthenticated, updatePassword);
router.route("/user/updateprofile").put(isUserAuthenticated, updateProfile);
router.route("/user/updaterole/:id").put(isUserAuthenticated, authorizeRoles("admin"), updateRole);
router.route("/users").get(isUserAuthenticated, authorizeRoles("admin"), getAllUsers);
router.route("/user/:id").get(isUserAuthenticated, authorizeRoles("admin"), getSingleUser).delete(deleteUser);

module.exports = router;
