import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Tooltip, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { formatDistanceToNow } from "date-fns";
import { useDispatch } from "react-redux";
import { showAllJobsCreatedByCompanyAction } from "../redux/actions/jobAction";

const CardElement = ({
  jobTitle,
  description,
  category,
  location,
  id,
  Duration,
  profilePhoto,
  salary,
  AdditionalInformation,
  companyName,
  createdAt,
  jid,
}) => {
  const { palette } = useTheme();
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  console.log(jid);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAllJobsCreatedByCompanyAction(jid));
  }, [dispatch, jid]);

  return (
    <Card sx={{ minWidth: 275, mb: 2, mt: 2 }}>
      <CardContent sx={{ mb: -1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 1,
            marginLeft: -0.7,
          }}
        >
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
              marginTop: 0.5,
            }}
          >
            {location}
          </Typography>
        </Box>
        <Tooltip>
          <IconButton sx={{ ml: 82.5, mt: -5 }}>
            <Box
              sx={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Avatar
                alt=""
                src={profilePhoto}
                sx={{ color: palette.primary.white }}
              />
            </Box>
          </IconButton>
        </Tooltip>

        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 600, mt: -2 }}
        >
          {jobTitle}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            color: "#555",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "#555" }}
            to={`/company/${jid}`}
          >
            {companyName}
          </Link>
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginTop: 1, marginBottom: -0.8, textAlign: "justify" }}
        >
          <span style={{ fontWeight: "bold" }}>Salary: </span>
          {""} {salary}
        </Typography>

        <Typography variant="body2" sx={{ marginTop: 1, textAlign: "justify" }}>
          <span style={{ fontWeight: "bold" }}>Description: </span>
          <span>{description}</span>
        </Typography>

        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            color: "#555",
            marginTop: 1,
          }}
        >
          {timeAgo}
        </Typography>

        <CardActions>
          <Button
            disableElevation
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            sx={{ marginTop: -1, marginLeft: "79%" }}
          >
            <Link
              style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
              to={`/job/${id}`}
            >
              More Details
            </Link>
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CardElement;
