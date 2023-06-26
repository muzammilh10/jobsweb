const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");

//create job category
exports.createJobType = async (req, res, next) => {
  try {
    const jobT = await JobType.create({
      jobTypeName: req.body.jobTypeName,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      jobT,
    });
  } catch (error) {
    next(error);
  }
};

//all jobs category
exports.allJobsType = async (req, res, next) => {
  try {
    const jobT = await JobType.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      jobT,
    });
  } catch (error) {
    next(error);
  }
};

//update job type
exports.updateJobsType = async (req, res, next) => {
  try {
    const jobT = await JobType.findByIdAndUpdate(req.params.type_id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      jobT,
    });
  } catch (error) {
    next(error);
  }
};

//delete job type
exports.deleteJobsType = async (req, res, next) => {
  try {
    const jobT = await JobType.findByIdAndRemove(req.params.type_id, {});
    res.status(200).json({
      success: true,
      message: "Job type deleted",
    });
  } catch (error) {
    next(new ErrorResponse("server error", 500));
  }
};

exports.showAdminUserJobType = async (req, res, next) => {
  try {
    const id = req.params.id;
    const jobs = await JobType.find({
      user: id,
    }).sort({ createdAt: -1 });
    console.log(jobs);
    res.status(200).json({
      success: true,
      jobs,
    });
    console.log("vnsjvn");
  } catch (error) {
    next(error);
    console.log(error);
  }
};
