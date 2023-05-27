const express = require("express");
const {
  allUser,
  singleUser,
  editUser,
  deleteUser,
  createUserJobsHistory,
} = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//user router

//  /api/allusers
router.get("/allusers", isAuthenticated, isAdmin, allUser);

//  /api/user/id
router.get("/user/:id", isAuthenticated, singleUser);

//  /api/user/edit/id
router.put("/user/edit/:id", isAuthenticated, editUser);

//  /api/admin/user/delete/id
router.delete("/admin/user/delete/:id", isAuthenticated, isAdmin, deleteUser);

//  /api/user/jobhistory
router.post("/user/jobhistory", isAuthenticated, createUserJobsHistory);

module.exports = router;
