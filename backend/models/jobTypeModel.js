const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const jobTypeSchema = new mongoose.Schema(
  {
    jobTypeName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobType", jobTypeSchema);
