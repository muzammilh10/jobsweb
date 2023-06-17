import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const CardElement = ({
  jobTitle,
  description,
  category,
  location,
  id,
  AdditionalInformation,
  companyName,
}) => {
  const { palette } = useTheme();
  const { userInfo } = useSelector((state) => state.signIn);

  return (
    <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <LocationOnIcon
            sx={{
              color: palette.secondary.main,
              fontSize: 18,
              marginRight: 1,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: 15,
              color: palette.secondary.main,
              fontWeight: 500,
            }}
          >
            {location}
          </Typography>
        </Box>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          {jobTitle}
        </Typography>
        <Typography
          component="div"
          sx={{
            marginBottom: 1,
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          {companyName}
        </Typography>

        <Typography variant="body2" sx={{ marginTop: 1, textAlign: "justify" }}>
          Description:{" "}
          {description?.split(" ")?.slice(0, 15)?.join(" ") + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disableElevation
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ marginTop: -1 }}
        >
          <Link
            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
            to={`/job/${id}`}
          >
            More Details
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardElement;
