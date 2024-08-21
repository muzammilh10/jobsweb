const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  createJobType,
  allJobsType,
  updateJobsType,
  deleteJobsType,
  showAdminUserJobType,
} = require("../controllers/jobsTypeController");

//job type routes router


// /api/type/jobs
router.get("/type/jobs", allJobsType);

// /api/type/update/type_id
router.patch("/type/update/:type_id", isAuthenticated, isAdmin, updateJobsType);
// /api/type/showcategory/type_id
router.get(
  "/type/showcategory/:id",
  isAuthenticated,
  isAdmin,
  showAdminUserJobType
);
// /api/type/delete/type_id
router.delete(
  "/type/delete/:type_id",
  isAuthenticated,
  isAdmin,
  deleteJobsType
);

module.exports = router;
