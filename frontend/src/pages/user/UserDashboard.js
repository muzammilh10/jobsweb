import { Box, Stack, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import StatComponent from "../../component/StartComponents";
import { useSelector } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.userprofile);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={user && moment(user.createdAt).format("YYYY / MM / DD")}
            icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Member since"
            money=""
          />
          <StatComponent
            value={user && user.jobsHistory.length}
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Number of jobs submitted"
            money=""
          />
        </Stack>
      </Box>
    </>
  );
};

export default UserDashboard;
