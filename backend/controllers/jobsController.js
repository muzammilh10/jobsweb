const Job = require("../models/jobModel");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");

//create jobtype
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      jobType: req.body.jobType,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//single job
exports.singleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

//update job by id.
exports.updateJob = async (req, res, next) => {
  try {
    console.log("object");
    const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {
      new: true,
    })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName lastName");
    console.log(job);
    res.status(200).json({
      success: true,
      job,
    });
    console.log(job);
  } catch (error) {
    console.log(err);
    next(error);
  }
};

//show job by id.
exports.showJobs = async (req, res, next) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  //filter by category ids
  let ids = [];
  const jobTypeCategory = await JobType.find({}, { _id: 1 });
  jobTypeCategory.forEach((cat) => {
    ids.push(cat._id);
  });
  let cat = req.query.cat;
  let categ = cat !== "" ? cat : ids;

  //jobs by location
  let locations = [];
  const jobByLocation = await Job.find({}, { location: 1 });
  jobByLocation.forEach((val) => {
    locations.push(val.location);
  });
  let setUniqueLocation = [...new Set(locations)];
  let location = req.query.location;
  let locationFilter = location !== "" ? location : setUniqueLocation;

  //pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Job.find({
    ...keyword,
    jobType: categ,
    location: locationFilter,
  }).countDocuments();
  try {
    const jobs = await Job.find({
      ...keyword,
      jobType: categ,
      location: locationFilter,
    })
      .sort({ createdAt: -1 })
      .populate("jobType", "jobTypeName")
      .populate("user", "firstName")
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      setUniqueLocation,
    });
  } catch (error) {
    next(error);
  }
};

//show job by id.
exports.showJobsyByUser = async (req, res, next) => {
  //search enable

  // const keyword = req.query.keyword
  //   ? {
  //       title: {
  //         $regex: req.query.keyword,
  //         $options: "i",
  //       },
  //     }
  //   : {};

  // //filter by category ids
  // let ids = [];
  // const jobTypeCategory = await JobType.find({}, { _id: 1 });
  // jobTypeCategory.forEach((cat) => {
  //   ids.push(cat._id);
  // });
  // let cat = req.query.cat;
  // let categ = cat !== "" ? cat : ids;

  // //jobs by location
  // let locations = [];
  // const jobByLocation = await Job.find({}, { location: 1 });
  // jobByLocation.forEach((val) => {
  //   locations.push(val.location);
  // });
  // let setUniqueLocation = [...new Set(locations)];
  // let location = req.query.location;
  // let locationFilter = location !== "" ? location : setUniqueLocation;

  // //pagination
  // const pageSize = 5;
  // const page = Number(req.query.pageNumber) || 1;
  // const count = await Job.find({
  //   ...keyword,
  //   jobType: categ,
  //   location: locationFilter,
  // }).countDocuments();
  try {
    //   const jobs = await Job.find({
    //     ...keyword,
    //     jobType: categ,
    //     location: locationFilter,
    //   })
    //     .sort({ createdAt: -1 })
    //     .populate("jobType", "jobTypeName")
    //     .populate("user", "firstName")
    //     .skip(pageSize * (page - 1))
    //     .limit(pageSize);

    const id = req.params.id;

    const jobs = await Job.find({
      user: id,
    });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

//delete job
exports.deleteJobs = async (req, res, next) => {
  try {
    const jobT = await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Job deleted",
    });
  } catch (error) {
    next(new ErrorResponse("server error", 500));
  }
};

//apply user user find by id
exports.showAdminUserApplyJob = async (req, res, next) => {
  try {
    const id = req.params.id;

    const jobs = await Job.find({
      user: id,
    });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// exports.adminShowUserApplyJob = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const jobs = await Job.find({
//       user: id,
//     });

//     res.status(200).json({
//       success: true,
//       jobs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

exports.adminShowUserApplyJob = async (req, res) => {
  try {
    // const id = "6470afd84c52295d604c360b";
    // const id2 = "648064aa7852edf9a77e019b";
    const ids = ["6470afd84c52295d604c360b", "648064aa7852edf9a77e019b"];
    let jobs = [];
    // Fetch the job records with applied users populated
    for (let i = 0; i < ids.length; i++) {
      const job = await Job.find({ _id: ids[i] });
      console.log(jobs);
      jobs.push(job);
    }

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
