import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Container,
  ListItemIcon,
  MenuItem,
  MenuList,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import CardElement from "../component/CardElement";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import SelectComponent from "../component/selectComponent";
import {
  jobLoadAction,
  showAllJobsCreatedByCompanyAction,
} from "../redux/actions/jobAction";

const Home = () => {
  const dispatch = useDispatch();
  const { keyword, location } = useParams();
  const { jobs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadJobs
  );

  const { palette } = useTheme();

  const [page, setPage] = useState(1);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  useEffect(() => {
    dispatch(showAllJobsCreatedByCompanyAction());
    // Comment out the API call here
    dispatch(jobLoadAction(page, keyword, location, minSalary, maxSalary));
  }, [dispatch,location]);


  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(jobLoadAction(1, keyword, location, minSalary, maxSalary));
  };

  const handleChangeMinSalary = (e) => {
    setMinSalary((prevMinSalary) =>
      e.target.value === "" ? "" : parseInt(e.target.value)
    );
  };

  const handleChangeMaxSalary = (e) => {
    setMaxSalary((prevMaxSalary) =>
      e.target.value === "" ? "" : parseInt(e.target.value)
    );
  };

  useEffect(() => {
    // Make the API call here after the state has been updated
    dispatch(jobLoadAction(page, keyword, location, minSalary, maxSalary));
  }, [dispatch, page, keyword, location, minSalary, maxSalary]);

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Header />
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 2, p: 2 }}>
              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 1 }}>
                  <Typography
                    component="h4"
                    sx={{
                      color: palette.secondary.main,
                      fontWeight: 600,
                    }}
                  >
                    Filter job by salary
                  </Typography>
                  <form onSubmit={handleSearch}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        marginBottom: "-5px",
                        marginTop: "15px",
                      }}
                    >
                      <input
                        type="number"
                        placeholder="Min Salary"
                        value={minSalary}
                        onChange={handleChangeMinSalary}
                        style={{ width: "120px", height: "30px" }}
                      />
                      <input
                        type="number"
                        placeholder="Max Salary"
                        value={maxSalary}
                        onChange={handleChangeMaxSalary}
                        style={{ width: "120px", height: "30px" }}
                      />
                      <button
                        type="submit"
                        style={{
                          color: "white",
                          height: "30px",
                          padding: "0 10px",
                          borderRadius: "3px",
                          backgroundColor: "#0277bd",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Apply</span>
                      </button>
                    </Box>
                  </form>
                </Box>
              </Card>

              {/* jobs by location */}
              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{
                      color: palette.secondary.main,
                      fontWeight: 600,
                    }}
                  >
                    Filter job by location
                  </Typography>
                  <MenuList>
                    {setUniqueLocation &&
                      setUniqueLocation.map((location, i) => (
                        <MenuItem key={i}>
                          <ListItemIcon>
                            <LocationOnIcon
                              sx={{
                                color: palette.secondary.main,
                                fontSize: 18,
                              }}
                            />
                          </ListItemIcon>
                          <Link
                            to={`/search/location/${location}`}
                            style={{
                              color: "#2196f3",
                              textDecoration: "none",
                            }}
                          >
                            {location}
                          </Link>
                        </MenuItem>
                      ))}
                  </MenuList>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : jobs && jobs.length === 0 ? (
                <Box
                  sx={{
                    minHeight: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2>No result found!</h2>
                </Box>
              ) : (
                jobs &&
                jobs.map((job, i) => (
                  <CardElement
                    key={i}
                    id={job._id}
                    jobTitle={job.title}
                    companyName={job.companyName}
                    description={job.description}
                    category={
                      job.jobType ? job.jobType.jobTypeName : "No category"
                    }
                    createdAt={job.createdAt}
                    salary={job.salary}
                    location={job.location}
                    Duration={job.Duration}
                    profilePhoto={job.user.profilePhoto}
                    jid={job.user._id}
                  />
                ))
              )}
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
