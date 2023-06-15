import React from "react";
import { useTheme } from "@emotion/react";
import { Card, CardContent, IconButton, Typography } from "@mui/material";

const StatComponent = ({ value, icon, description, money }) => {
  const { palette } = useTheme();
  return (
    <>
      <Card sx={{ bgcolor: palette.secondary.midNightBlue, width: "100%" }}>
        <CardContent>
          <IconButton sx={{ bgcolor: palette.primary.main, mb: 2 }}>
            {icon}
          </IconButton>
          <Typography
            variant="h4"
            sx={{ color: "black", mb: "1px", fontWeight: 100 }}
          >
            {money !== "" ? money + value : value}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: palette.primary.main, mb: 0 }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default StatComponent;
