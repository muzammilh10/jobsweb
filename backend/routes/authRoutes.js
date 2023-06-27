const express = require("express");
const {
  signup,
  signin,
  userProfile,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
} = require("../controllers/authControllers");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

//auth router
//  /api/signup
router.post("/signup", signup);

//  /api/signin
router.post("/signin", signin);

//  /api/logout
router.get("/logout", logout);

//  /api/me
router.get("/me", isAuthenticated, userProfile);
//  /api/forgetpassword
router.post("/forgetpassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
module.exports = router;
