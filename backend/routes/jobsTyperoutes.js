const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  createJobType,
  allJobsType,
  updateJobsType,
  deleteJobsType,
} = require("../controllers/jobsTypeController");

//job type routes router

// /api/type/create
router.post("/type/create", isAuthenticated, createJobType);

// /api/type/jobs
router.get("/type/jobs", allJobsType);

// /api/type/update/type_id
router.put("/type/update/:type_id", isAuthenticated, isAdmin, updateJobsType);

// /api/type/delete/type_id
router.delete(
  "/type/delete/:type_id",
  isAuthenticated,
  isAdmin,
  deleteJobsType
);

module.exports = router;
