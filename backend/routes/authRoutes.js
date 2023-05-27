const express = require("express");
const {
  signup,
  signin,
  logout,
  userProfile,
} = require("../controllers/authControllers");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

//auth router
//  /api/signup
router.post("/signup", signup);

//  /api/signin
router.post("/signin", signin);

//  /api/logout
router.get("/logout", userProfile);

//  /api/me
router.get("/me", isAuthenticated, userProfile);

module.exports = router;
