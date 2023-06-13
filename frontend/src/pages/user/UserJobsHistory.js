import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import CardElement from "../../component/CardElement";
import CardElementFor from "../../component/CardElement1";
import CardElement1 from "../../component/CardElement1";

const UserJobsHistory = () => {
  const { user } = useSelector((state) => state.userprofile);
  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "black" }}>
          Jobs History
        </Typography>
        <Box>
          {user &&
            user.jobsHistory &&
            user.jobsHistory.map((history, i) => (
              <CardElement1
                key={i}
                id={history._id}
                applicationStatus={history.applicationStatus}
                jobTitle={history.title}
                description={history.description}
                salary={history.salary}
                location={history.location}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default UserJobsHistory;
