import { useTheme } from "@emotion/react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import EditUser from "./EditUser";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const UserInfoDashboard = () => {
  const { user } = useSelector((state) => state.userprofile);
  const { palette } = useTheme();
  const [render, setRender] = React.useState(false);

  const renderHandler = () => {
    setRender(!render);
  };
  // console.log(user);
  return (
    <>
      <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
        <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="#fafafa" gutterBottom>
              Personal Info
            </Typography>
            <hr style={{ marginBottom: "30px" }} />
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              First name: {user && user.firstName}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              Last name: {user && user.lastName}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "#fafafa" }}>
              E-mail: {user && user.email}
            </Typography>
            <EditUser onClick={renderHandler}>Edit</EditUser>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UserInfoDashboard;
