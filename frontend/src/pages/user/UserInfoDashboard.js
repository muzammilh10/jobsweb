import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Button,
  Modal,
  Dialog,
} from "@mui/material";
import { useSelector } from "react-redux";
import EditUser from "./EditUser";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

const UserInfoDashboard = () => {
  const { user } = useSelector((state) => state.userprofile);
  console.log(user);
  const [openResumeDialog, setOpenResumeDialog] = useState(false);

  const handleOpenResumeDialog = () => {
    setOpenResumeDialog(true);
  };

  const handleCloseResumeDialog = () => {
    setOpenResumeDialog(false);
  };

  return (
    <Box
      sx={{
        maxWidth: "430px",
        margin: "auto",
        justifyContent: "flex-start",
        alignItems: "center",
        pt: 8,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "whitesmoke",
          borderRadius: "20px",
          marginTop: -5,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            marginBottom: "20px",
            marginTop: "25px",
            backgroundColor: "white",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <img
            src={user && user.profilePhoto}
            alt="Profile Pic"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Avatar>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "black", textAlign: "left" }}
          >
            First name: {user && user.firstName}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "black", textAlign: "left" }}
          >
            Last name: {user && user.lastName}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "black", textAlign: "left" }}
          >
            E-mail: {user && user.email}
          </Typography>

          <Typography
            variant="h6"
            component="div"
            sx={{ color: "black", textAlign: "left" }}
          >
            Member since:{" "}
            {user && moment(user.createdAt).format("YYYY / MM / DD")}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "black", textAlign: "left" }}
          >
            Phone number: {user && user.phoneNumber}
          </Typography>

          <Typography
            variant="h6"
            component="div"
            sx={{ color: "black", textAlign: "left" }}
          >
            Number of jobs submitted: {user && user.jobsHistory.length}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "black", textAlign: "left" }}
          >
            Resume:{" "}
            <a
              onClick={handleOpenResumeDialog}
              style={{ color: "#2196f3", textDecoration: "none" }}
            >
              Preview your resume
            </a>
          </Typography>
          <Dialog open={openResumeDialog} onClose={handleCloseResumeDialog}>
            <img
              src={user && user.resume}
              alt="Resume"
              style={{ width: "100%" }}
            />
          </Dialog>
          <div style={{ marginLeft: 110 }}>
            <EditUser></EditUser>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserInfoDashboard;
