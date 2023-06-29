// import React, { useEffect, useState } from "react";
// import Navbar from "../component/Navbar";
// import Header from "../component/Header";
// import {
//   Box,
//   Card,
//   Container,
//   ListItemIcon,
//   MenuItem,
//   MenuList,
//   Pagination,
//   Stack,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   jobLoadAction,
//   showAllJobsCreatedByCompanyAction,
// } from "../redux/actions/jobAction";
// import { Link, useParams } from "react-router-dom";
// import CardElement from "../component/CardElement";
// import Footer from "../component/Footer";
// import LoadingBox from "../component/LoadingBox";
// import SelectComponent from "../component/selectComponent";
// import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// const Home = () => {
//   const { jobs, setUniqueLocation, pages, loading } = useSelector(
//     (state) => state.loadJobs
//   );

//   const data = useSelector((state) => state.companyJobCreated);
//   console.log(data);
//   const { palette } = useTheme();
//   const dispatch = useDispatch();
//   const { keyword, location } = useParams();

//   const [page, setPage] = useState(1);
//   const [cat, setCat] = React.useState("");
//   useEffect(() => {
//     dispatch(showAllJobsCreatedByCompanyAction());
//   }, []);
//   useEffect(() => {
//     dispatch(jobLoadAction(page, keyword, cat, location));
//   }, [page, keyword, cat, location]);

//   useEffect(() => {
//     dispatch(jobTypeLoadAction());
//   }, []);

//   const handleChangeCategory = (e) => {
//     setCat(e.target.value);
//   };

//   return (
//     <>
//       <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
//         <Navbar />
//         <Header />
//         <Container>
//           <Stack
//             direction={{ xs: "column", sm: "row" }}
//             spacing={{ xs: 1, sm: 2, md: 4 }}
//           >
//             <Box sx={{ flex: 2, p: 2 }}>
//               <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
//                 <Box sx={{ pb: 2 }}>
//                   <Typography
//                     component="h4"
//                     sx={{ color: palette.secondary.main, fontWeight: 600 }}
//                   >
//                     Filter job by category
//                   </Typography>
//                 </Box>
//                 <SelectComponent
//                   handleChangeCategory={handleChangeCategory}
//                   cat={cat}
//                 />
//               </Card>

//               {/* jobs by location */}
//               <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
//                 <Box sx={{ pb: 2 }}>
//                   {/* <h4>Filter by category</h4> */}
//                   <Typography
//                     component="h4"
//                     sx={{ color: palette.secondary.main, fontWeight: 600 }}
//                   >
//                     Filter job by location
//                   </Typography>
//                   <MenuList>
//                     {setUniqueLocation &&
//                       setUniqueLocation.map((location, i) => (
//                         <MenuItem key={i}>
//                           <ListItemIcon>
//                             <LocationOnIcon
//                               sx={{
//                                 color: palette.secondary.main,
//                                 fontSize: 18,
//                               }}
//                             />
//                           </ListItemIcon>
//                           <Link
//                             to={`/search/location/${location}`}
//                             style={{ color: "#2196f3", textDecoration: "none" }}
//                           >
//                             {location}
//                           </Link>
//                         </MenuItem>
//                       ))}
//                   </MenuList>
//                 </Box>
//               </Card>
//             </Box>
//             <Box sx={{ flex: 5, p: 2 }}>
//               {loading ? (
//                 <LoadingBox />
//               ) : jobs && jobs.length === 0 ? (
//                 <>
//                   <Box
//                     sx={{
//                       minHeight: "350px",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <h2>No result found!</h2>
//                   </Box>
//                 </>
//               ) : (
//                 jobs &&
//                 jobs.map((job, i) => (
//                   <CardElement
//                     key={i}
//                     id={job._id}
//                     jobTitle={job.title}
//                     companyName={job.companyName}
//                     description={job.description}
//                     category={
//                       job.jobType ? job.jobType.jobTypeName : "No category"
//                     }
//                     createdAt={job.createdAt}
//                     salary={job.salary}
//                     location={job.location}
//                     Duration={job.Duration}
//                     profilePhoto={job.user.profilePhoto}
//                     jid={job.user._id}
//                   />
//                 ))
//               )}
//               <Stack spacing={2}>
//                 <Pagination
//                   page={page}
//                   count={pages === 0 ? 1 : pages}
//                   onChange={(event, value) => setPage(value)}
//                 />
//               </Stack>
//             </Box>
//           </Stack>
//         </Container>
//       </Box>
//       <Footer />
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
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
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  jobLoadAction,
  showAllJobsCreatedByCompanyAction,
} from "../redux/actions/jobAction";
import { Link, useParams } from "react-router-dom";
import CardElement from "../component/CardElement";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import SelectComponent from "../component/selectComponent";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Home = () => {
  const { jobs, setUniqueLocation, pages, loading, minSalary, maxSalary } =
    useSelector((state) => state.loadJobs);

  const data = useSelector((state) => state.companyJobCreated);
  console.log(data);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { keyword, location } = useParams();

  const [page, setPage] = useState(1);
  const [cat, setCat] = useState("");

  useEffect(() => {
    dispatch(showAllJobsCreatedByCompanyAction());
  }, []);

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location, minSalary, maxSalary));
  }, [page, keyword, cat, location, minSalary, maxSalary]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  const handleSalaryFilter = () => {
    dispatch(jobLoadAction(page, keyword, cat, location, minSalary, maxSalary));
  };

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
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    Filter job by category
                  </Typography>
                </Box>
                <SelectComponent
                  handleChangeCategory={handleChangeCategory}
                  cat={cat}
                />
              </Card>

              {/* Salary filter */}
              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    Filter job by salary
                  </Typography>
                  <TextField
                    label="Minimum Salary"
                    variant="outlined"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                  />
                  <TextField
                    label="Maximum Salary"
                    variant="outlined"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSalaryFilter}
                  >
                    Apply
                  </Button>
                </Box>
              </Card>

              {/* Jobs by location */}
              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
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
                            style={{ color: "#2196f3", textDecoration: "none" }}
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
                <>
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
                </>
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
