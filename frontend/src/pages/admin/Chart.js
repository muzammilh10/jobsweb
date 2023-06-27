// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { userApplyLoadJobAction } from "../../redux/actions/jobAction";

// const Chart = () => {
//   const dispatch = useDispatch();
//   const admin = useSelector((state) => state.signIn);

//   const [jobDetail, setJobDetail] = useState([]);
//   const success = useSelector((state) => state.applyByUser);
//   console.log(success);
//   const fetchData = () => {
//     dispatch(userApplyLoadJobAction(admin.userInfo.role._id));
//   };

//   useEffect(() => {
//     fetchData();
//   }, [admin]);

//   useEffect(() => {
//     if (success.success?.jobs) {
//       setJobDetail(success.success.jobs);
//     }
//   }, [success]);

//   const getUserCount = (jobId) => {
//     const job = jobDetail.find((job) => job._id === jobId);
//     return job?.userAppliedForJob.length || 0;
//   };

//   return (
//     <div>
//       <h2>Job Details</h2>
//       {jobDetail.map((job) => (
//         <div key={job._id}>
//           <h3>{job.title}</h3>
//           <p>{job.description}</p>
//           <p>Number of Users Applied: {getUserCount(job._id)}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Chart;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLoadAction } from "../../redux/actions/jobAction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Text,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const Chart = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.adminCreateJob);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const user = JSON.parse(userInfo);
    const id = user.role._id;
    dispatch(adminLoadAction(id));
  }, []);

  const getJobsChartData = (jobs) => {
    if (!jobs) return [];

    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    const endDate = new Date(today);

    const filteredJobs = jobs.filter((job) => {
      const createdAt = new Date(job.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });

    const jobCounts = {};
    filteredJobs.forEach((job) => {
      const createdAt = new Date(job.createdAt).toDateString();
      jobCounts[createdAt] = (jobCounts[createdAt] || 0) + 1;
    });

    const chartData = [];
    let currentDate = new Date(startDate);
    let totalCount = 0;
    while (currentDate <= endDate) {
      const date = currentDate.toDateString();
      const count = jobCounts[date] || 0;
      chartData.push({ date, count });
      totalCount += count;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { chartData, totalCount };
  };

  const { chartData, totalCount } = getJobsChartData(jobs);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          marginLeft: 60,
          marginTop: 60,
          alignItems: "center",
        }}
      >
        <div>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">
                <p>Total Jobs Created</p>
              </Typography>
              <Typography variant="h4">{jobs && jobs.length}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Display total count */}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          marginLeft: 60,
          alignItems: "center",
        }}
      >
        <h2>Jobs Created in Last Week</h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
          <Text
            x={20}
            y={20}
            fontWeight="bold"
            fontSize={16}
            textAnchor="start"
          ></Text>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default Chart;
