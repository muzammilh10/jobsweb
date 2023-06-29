import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAllJobsCreatedByCompanyAction } from "../redux/actions/jobAction";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
  CardActions,
  InputBase,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import { formatDistanceToNow } from "date-fns";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  search: yup.string("Enter your search query"),
});

const CardAllElement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.companyJobCreated);
  const { palette } = useTheme();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  const [page, setPage] = useState(1);
  const jobsPerPage = 5;
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    const { search } = values;
    if (search.trim()) {
      navigate(`/company/${id}?search=${encodeURIComponent(search)}`);
    } else {
      navigate(`/company/${id}`);
    }
    actions.resetForm();
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobData = async () => {
      setIsLoading(true);

      try {
        if (searchQuery) {
          await dispatch(showAllJobsCreatedByCompanyAction(id, searchQuery));
        } else {
          await dispatch(showAllJobsCreatedByCompanyAction(id));
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [dispatch, id, searchQuery]);

  const currentJobs = data.jobs
    ? searchQuery
      ? data.jobs.filter((job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data.jobs
    : [];

  const noResultsFound = searchQuery && currentJobs.length === 0;

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      search: searchQuery || "",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  const formatTime = (dateString) => {
    const currentDate = new Date();
    const previousDate = new Date(dateString);
    const formattedTime = formatDistanceToNow(previousDate, {
      addSuffix: true,
    });
    return formattedTime;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;

  const totalJobs = currentJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  useEffect(() => {
    const handleBeforeUnload = () => {
      navigate(`/company/${id}`);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, id]);

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        style={{
          width: "30%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <InputBase
            sx={{
              marginTop: 2,
              bgcolor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
            fullWidth={true}
            id="search"
            name="search"
            label="search"
            placeholder="ex: developer, front end"
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.search && Boolean(errors.search)}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{ marginTop: 2 }}
          >
            Search
          </Button>
        </Box>
        <Box component="span" sx={{ color: "orange" }}>
          {touched.search && errors.search}
        </Box>
      </form>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxWidth={900}
        height="200vh"
        margin="0 auto"
        overflow="auto"
        padding={2}
        marginTop={3}
      >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
          >
            <Typography variant="h5">Loading...</Typography>
          </Box>
        ) : noResultsFound ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
          >
            <Typography variant="h5">No jobs found.</Typography>
          </Box>
        ) : (
          currentJobs.slice(startIndex, endIndex).map((job) => (
            <Card
              key={job._id}
              sx={{
                maxWidth: 900,
                mb: 3,
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                background: "#f9f9f9",
              }}
            >
              <CardContent>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <LocationOnIcon
                      sx={{
                        color: palette.secondary.main,
                        fontSize: 18,
                        marginRight: 1,
                        marginTop: -2,
                        marginLeft: -0.6,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 15,
                        color: palette.secondary.main,
                        fontWeight: 500,
                        marginTop: -2,
                      }}
                    >
                      {job.location}
                    </Typography>
                  </Box>
                  <Tooltip>
                    <IconButton sx={{ ml: 100, mt: -4.5 }}>
                      <Box
                        sx={{
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <Avatar
                          alt=""
                          src={job.user.profilePhoto}
                          sx={{ color: palette.primary.white }}
                        />
                      </Box>
                    </IconButton>
                  </Tooltip>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: 600, marginTop: -2 }}
                  >
                    {job.title}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, fontSize: "16px", color: "#555" }}
                  >
                    {job.companyName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginTop: 1, marginBottom: -1 }}
                  >
                    <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                      Salary:{" "}
                    </span>
                    <span style={{ fontSize: "15px" }}>{job.salary}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                      Description:{" "}
                    </span>
                    <span style={{ fontSize: "15px" }}>{job.description}</span>
                  </Typography>

                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontSize: 15,
                      color: "#555",
                      fontWeight: 600,
                      marginTop: 2,
                    }}
                  >
                    {formatTime(job.createdAt)}
                  </Typography>
                </CardContent>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: -3,
                }}
              >
                <Button
                  disableElevation
                  variant="contained"
                  size="medium"
                  startIcon={<AddIcon />}
                  sx={{ marginTop: -2, marginBottom: 1.5, marginLeft: "80%" }}
                  component={Link}
                  to={`/job/${job._id}`}
                >
                  More Details
                </Button>
              </CardActions>
            </Card>
          ))
        )}
        {totalJobs > jobsPerPage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default CardAllElement;
