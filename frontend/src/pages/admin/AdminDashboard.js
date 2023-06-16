// import { Box, Stack, Typography } from "@mui/material";
// import StatComponent from "../../component/StartComponents";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import WorkIcon from "@mui/icons-material/Work";
// import CategoryIcon from "@mui/icons-material/Category";
// import { Chart } from "react-google-charts";
// import { data, options } from "./data/data";
// import ChartComponent from "../../component/ChartComponent";

// const AdminDashboard = () => {
//   return (
//     <>
//       <Box>
//         <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
//           Dashboard
//         </Typography>
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={{ xs: 1, sm: 2, md: 4 }}
//         >
//           <StatComponent
//             value="45621"
//             icon={
//               <SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />
//             }
//             description="Administrators"
//             money=""
//           />
//           <StatComponent
//             value="450"
//             icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
//             description="Jobs"
//             money=""
//           />
//           <StatComponent
//             value="6548"
//             icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
//             description="Jobs categories"
//             money=""
//           />
//         </Stack>
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           sx={{ mt: 3 }}
//           spacing={{ xs: 1, sm: 2, md: 4 }}
//         >
//           <ChartComponent>
//             <Chart
//               chartType="Bar"
//               data={data}
//               options={options}
//               width="100%"
//               height="300px"
//               legendToggle
//             />
//           </ChartComponent>
//         </Stack>
//       </Box>
//     </>
//   );
// };

// export default AdminDashboard;
import { useTheme } from "@emotion/react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditAdminData from "./data/EditAdminData";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.userprofile);
  const { palette } = useTheme();
  const [render, setRender] = React.useState(false);

  const renderHandler = () => {
    setRender(!render);
  };
  // console.log(user);
  return (
    <>
      <Box sx={{ maxWidth: "50%", margin: "auto", pt: 10 }}>
        <Card sx={{ minWidth: 275, bgcolor: palette.secondary.midNightBlue }}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
              Personal Info
            </Typography>
            <hr style={{ marginBottom: "30px" }} />
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              First name: {user && user.firstName}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              Last name: {user && user.lastName}
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "black" }}>
              E-mail: {user && user.email}
            </Typography>
            <EditAdminData onClick={renderHandler}>Edit</EditAdminData>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default AdminDashboard;
