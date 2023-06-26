import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import React from "react";
import EditAdminData from "./data/EditAdminData";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.userprofile);

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
            Phone number: {user && user.phoneNumber}
          </Typography>

          <div style={{ marginLeft: 110 }}>
            <EditAdminData></EditAdminData>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
