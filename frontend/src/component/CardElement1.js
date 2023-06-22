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
  companyName,
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
    <Card
      sx={{
        mb: 3,
        mt: 2,
        borderRadius: "20px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            ml: -1.3,
            fontSize: 14,
            color: palette.secondary.main,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
          gutterBottom
        >
          <IconButton disableRipple>
            <LocationOnIcon
              sx={{
                color: palette.secondary.main,
                fontSize: 16,
                marginRight: 0,
              }}
            />
          </IconButton>
          {location}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            mb: 1,
            fontWeight: "bold",
          }}
        >
          {jobTitle}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: -1,
            mb: 2,
          }}
        >
          {companyName}
        </Typography>
        <Typography
          variant="body2"
          color={statusColor}
          sx={{
            mb: 2,
            fontWeight: "bold",
          }}
        >
          Application Status: {applicationStatus}
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
