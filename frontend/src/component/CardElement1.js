import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CardElement1 = ({
  jobTitle,
  description,
  category,
  location,
  id,
  salary,
  applicationStatus,
}) => {
  const { palette } = useTheme();

  const getStatusColor = () => {
    if (applicationStatus === "accepted") {
      return "green";
    } else if (applicationStatus === "rejected") {
      return "red";
    } else {
      return palette.text.secondary;
    }
  };

  const statusColor = getStatusColor();

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
            color: palette.secondary.main,
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          }}
          gutterBottom
        >
          <IconButton disableRipple>
            <LocationOnIcon
              sx={{ color: palette.secondary.main, fontSize: 16 }}
            />
          </IconButton>{" "}
          {location}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: 1, fontFamily: "Georgia, serif" }}
        >
          {jobTitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            fontFamily: "Roboto, sans-serif",
            fontStyle: "italic",
          }}
        >
          {category}
        </Typography>
        <Typography
          variant="body2"
          color={statusColor}
          sx={{
            mb: 2,
            fontFamily: "Roboto, sans-serif",
            fontStyle: "italic",
          }}
        >
          applicationStatus: {applicationStatus}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description?.split(" ")?.slice(0, 15)?.join(" ") + "..."}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Salary: ${salary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardElement1;
