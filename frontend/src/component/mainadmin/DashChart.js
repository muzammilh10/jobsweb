import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { allJobLoadAction } from "../../redux/actions/jobAction";
import { allShowUserAction } from "../../redux/actions/userAction";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const DashChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allJobLoadAction());
    dispatch(allShowUserAction());
  }, []);

  const { jobs } = useSelector((state) => state.loadJobs);
  const { users } = useSelector((state) => state.allUsers);

  const getJobsCreatedLastWeek = (jobs) => {
    if (!jobs) {
      return [];
    }

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const jobData = {};
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(lastWeek);
      currentDate.setDate(currentDate.getDate() + i);

      const formattedDate = formatDate(currentDate);
      jobData[formattedDate] = 0;

      for (let j = 0; j < jobs.length; j++) {
        const jobCreatedDate = new Date(jobs[j].createdAt);
        if (isSameDate(currentDate, jobCreatedDate)) {
          jobData[formattedDate]++;
        }
      }
    }

    return Object.entries(jobData).map(([date, count]) => ({ date, count }));
  };

  const getUsersCreatedLastWeek = (users) => {
    if (!users) {
      return [];
    }

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const userData = {};
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(lastWeek);
      currentDate.setDate(currentDate.getDate() + i);

      const formattedDate = formatDate(currentDate);
      userData[formattedDate] = 0;

      for (let j = 0; j < users.length; j++) {
        const userCreatedDate = new Date(users[j].createdAt);
        if (isSameDate(currentDate, userCreatedDate)) {
          userData[formattedDate]++;
        }
      }
    }

    return Object.entries(userData).map(([date, count]) => ({ date, count }));
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const jobData = getJobsCreatedLastWeek(jobs);
  const userData = getUsersCreatedLastWeek(users);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            marginLeft: 60,
            alignItems: "center",
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">All Users Count</Typography>
              <Typography variant="h4">{users && users.length}</Typography>
            </CardContent>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            marginRight: 590,
            alignItems: "left",
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">All Jobs Count</Typography>
              <Typography variant="h4">{jobs && jobs.length}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              marginLeft: 60,
              alignItems: "center",
            }}
          >
            {" "}
            <h2>Jobs Created Last Week</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              marginLeft: 60,
              alignItems: "center",
            }}
          >
            {" "}
            <h2>Users Joined Last Week</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashChart;
