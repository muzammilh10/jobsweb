// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { showAllJobsCreatedByCompanyAction } from "../redux/actions/jobAction";
// import {
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Avatar,
//   IconButton,
//   Tooltip,
//   useTheme,
//   CardActions,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AddIcon from "@mui/icons-material/Add";
// import Pagination from "@mui/material/Pagination";
// import { formatDistanceToNow } from "date-fns";

// const CardAllElement = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.companyJobCreated);
//   const { palette } = useTheme();

//   const [page, setPage] = useState(1);
//   const jobsPerPage = 5;
//   const totalJobs = data.jobs ? data.jobs.length : 0;
//   const totalPages = Math.ceil(totalJobs / jobsPerPage);

//   useEffect(() => {
//     dispatch(showAllJobsCreatedByCompanyAction(id));
//   }, [dispatch, id]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const formatTime = (dateString) => {
//     const currentDate = new Date();
//     const previousDate = new Date(dateString);
//     const formattedTime = formatDistanceToNow(previousDate, {
//       addSuffix: true,
//     });
//     return formattedTime;
//   };

//   const startIndex = (page - 1) * jobsPerPage;
//   const endIndex = startIndex + jobsPerPage;
//   const currentJobs = data.jobs ? data.jobs.slice(startIndex, endIndex) : [];

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       flexDirection="column"
//       alignItems="center"
//       maxWidth={900}
//       height="190vh"
//       margin="0 auto"
//       overflow="auto"
//       padding={2}
//     >
//       {currentJobs.map((job) => (
//         <Card key={job._id} sx={{ maxWidth: 900, mb: 2 }}>
//           <CardContent>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: 1,
//               }}
//             >
//               <LocationOnIcon
//                 sx={{
//                   color: palette.secondary.main,
//                   fontSize: 18,
//                   marginRight: 1,
//                 }}
//               />
//               <Typography
//                 variant="body2"
//                 sx={{
//                   fontSize: 15,
//                   color: palette.secondary.main,
//                   fontWeight: 500,
//                 }}
//               >
//                 {job.location}
//               </Typography>
//             </Box>
//             <Tooltip>
//               <IconButton sx={{ ml: 82.5, mt: -5 }}>
//                 <Box
//                   sx={{
//                     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                     marginLeft: 15,
//                   }}
//                 >
//                   <Avatar
//                     alt=""
//                     src={job.user.profilePhoto}
//                     sx={{ color: palette.primary.white }}
//                   />
//                 </Box>
//               </IconButton>
//             </Tooltip>
//             <Typography
//               variant="h5"
//               component="div"
//               sx={{ fontWeight: 600, marginTop: -2 }}
//             >
//               {job.title}
//             </Typography>

//             <Typography
//               variant="subtitle1"
//               sx={{ fontWeight: 600, fontSize: "16px", color: "#555" }}
//             >
//               {job.companyName}
//             </Typography>
//             <Typography variant="body2" sx={{ marginTop: 1, marginBottom: -1 }}>
//               <span style={{ fontSize: "17px", fontWeight: "bold" }}>
//                 Salary:{" "}
//               </span>
//               <span style={{ fontSize: "15px" }}>{job.salary}</span>
//             </Typography>
//             <Typography variant="body2" sx={{ marginTop: 1 }}>
//               <span style={{ fontSize: "17px", fontWeight: "bold" }}>
//                 Description:{" "}
//               </span>
//               <span style={{ fontSize: "15px" }}>{job.description}</span>
//             </Typography>

//             <Typography
//               variant="h5"
//               component="div"
//               sx={{
//                 fontWeight: 600,
//                 fontSize: "16px",
//                 color: "#555",
//                 marginTop: 1,
//                 marginBottom: -3,
//               }}
//             >
//               <span style={{ fontWeight: "bold" }}> </span>
//               {formatTime(job.createdAt)}
//             </Typography>

//             <CardActions>
//               <Button
//                 disableElevation
//                 variant="contained"
//                 size="medium"
//                 startIcon={<AddIcon />}
//                 sx={{ marginTop: 2, marginBottom: -1, marginLeft: "80%" }}
//                 component={Link}
//                 to={`/job/${job._id}`}
//               >
//                 More Details
//               </Button>
//             </CardActions>
//           </CardContent>
//         </Card>
//       ))}
//       {totalJobs > jobsPerPage && (
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={handlePageChange}
//           color="primary"
//           sx={{ marginTop: 4 }}
//         />
//       )}
//     </Box>
//   );
// };

// export default CardAllElement;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";
import { formatDistanceToNow } from "date-fns";

const CardAllElement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.companyJobCreated);
  const { palette } = useTheme();

  const [page, setPage] = useState(1);
  const jobsPerPage = 5;
  const totalJobs = data.jobs ? data.jobs.length : 0;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  useEffect(() => {
    dispatch(showAllJobsCreatedByCompanyAction(id));
  }, [dispatch, id]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const formatTime = (dateString) => {
    const currentDate = new Date();
    const previousDate = new Date(dateString);
    const formattedTime = formatDistanceToNow(previousDate, {
      addSuffix: true,
    });
    return formattedTime;
  };

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = data.jobs ? data.jobs.slice(startIndex, endIndex) : [];

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={900}
      height="190vh"
      margin="0 auto"
      overflow="auto"
      padding={2}
      marginTop={2}
    >
      {currentJobs.map((job) => (
        <Card key={job._id} sx={{ maxWidth: 900, mb: 2 }}>
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
                {job.location}
              </Typography>
            </Box>
            <Tooltip>
              <IconButton sx={{ ml: 82.5, mt: -5 }}>
                <Box
                  sx={{
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginLeft: 15,
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
            <Typography variant="body2" sx={{ marginTop: 1, marginBottom: -1 }}>
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
                fontWeight: 600,
                fontSize: "16px",
                color: "#555",
                marginTop: 1,
                marginBottom: -3,
              }}
            >
              <span style={{ fontWeight: "bold" }}> </span>
              {formatTime(job.createdAt)}
            </Typography>

            <CardActions>
              <Button
                disableElevation
                variant="contained"
                size="medium"
                startIcon={<AddIcon />}
                sx={{ marginTop: 2, marginBottom: -1, marginLeft: "80%" }}
                component={Link}
                to={`/job/${job._id}`}
              >
                More Details
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ))}
      {totalJobs > jobsPerPage && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 4 }}
        />
      )}
    </Box>
  );
};

export default CardAllElement;
