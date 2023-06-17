import { useTheme } from "@emotion/react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import EditAdminData from "../../pages/admin/data/EditAdminData";
import React from "react";

const DashAdminInfo = () => {
  const { user } = useSelector((state) => state.userprofile);
  const { palette } = useTheme();
  const [render, setRender] = React.useState(false);

  const renderHandler = () => {
    setRender(!render);
  };
  return (
    <>
      <Box sx={{ maxWidth: "40%", margin: "auto", pt: 10 }}>
        <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
              Personal Info
            </Typography>
            <hr style={{ marginBottom: "30px" }} />
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              First name: {user && user.firstName}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              Last name: {user && user.lastName}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              E-mail: {user && user.email}
            </Typography>
          </CardContent>
          <EditAdminData onClick={renderHandler}>Edit</EditAdminData>
        </Card>
      </Box>
    </>
  );
};

export default DashAdminInfo;
