// import { Box, Typography } from "@mui/material";
// import React from "react";
// import { useSelector } from "react-redux";
// import CardElement1 from "../../component/CardElement1";

// const UserJobsHistory = () => {
//   const { user } = useSelector((state) => state.userprofile);

//   return (
//     <>
//       <Box>
//         <Typography variant="h4" sx={{ color: "black" }}>
//           Jobs History
//         </Typography>
//         <Box>
//           {user &&
//             user.jobsHistory &&
//             user.jobsHistory.map((history, i) => (
//               <CardElement1
//                 key={i}
//                 id={history._id}
//                 applicationStatus={history.applicationStatus}
//                 companyName={history.companyName}
//                 jobTitle={history.title}
//                 description={history.description}
//                 salary={history.salary}
//                 location={history.location}
//               />
//             ))}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default UserJobsHistory;
import { Box, Grid, Pagination, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CardElement1 from "../../component/CardElement1";
import { useTheme } from "@emotion/react";

const UserJobsHistory = () => {
  const { user } = useSelector((state) => state.userprofile);
  const theme = useTheme();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = React.useState(1);
  console.log(user);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = user?.jobsHistory
    ? user.jobsHistory.slice(startIndex, endIndex)
    : [];

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "black" }}>
          Jobs History
        </Typography>
        <Grid container spacing={2}>
          {paginatedJobs.map((history, i) => (
            <Grid item xs={12} md={6} key={i}>
              <CardElement1
                jobTitle={history.title}
                description={history.description}
                companyName={history.companyName}
                Duration={history.Duration}
                applicationStatus={history.applicationStatus}
                salary={history.salary}
                location={history.location}
              />
            </Grid>
          ))}
        </Grid>
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(user?.jobsHistory?.length / itemsPerPage)}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
            sx={{ marginTop: theme.spacing(2) }}
          />
        </Box>
      </Box>
    </>
  );
};

export default UserJobsHistory;
