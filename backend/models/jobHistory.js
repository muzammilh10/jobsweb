const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const jobsHistorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
    },
    interviewDate: {
      type: String,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    role: {
      type: Number,
      default: 0,
    },
    jobId: {
      type: ObjectId,
      ref: "Job",
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
const UserHistory = new mongoose.model("UserHistory", jobsHistorySchema);
module.exports = UserHistory;
