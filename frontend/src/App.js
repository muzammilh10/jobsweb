import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import LogIn from "./pages/LogIn";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./component/UserRoute";
import AdminRoute from "./component/AdminRoute";
import Layout from "./pages/global/Layout";
import UserJobsHistory from "./pages/user/UserJobsHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SingleJob from "./pages/SingleJob";
import DashJobs from "./pages/admin/DashJobs";
import Register from "./pages/Register";
import DashCreateJob from "./pages/admin/DashCreateJob";
import { createTheme } from "@mui/material/styles";
import { themeColors } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import ResetPassword from "./pages/ResetPassword";
import ResetPassword1 from "./pages/ResetPassword1";
import MainAdminRoute from "./component/MainAdmin";
import DashAllUsers from "./component/mainadmin/DashUser";
import DashAdminInfo from "./component/mainadmin/DashAdminInfo";
import DashAllJobs from "./component/mainadmin/DashAllJobs";
import CardAllElement from "./component/companyAllJobCard";

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashJobsHOC = Layout(DashJobs);
const DashCreateJobHOC = Layout(DashCreateJob);
const DashAllUsersHOC = Layout(DashAllUsers);
const DashAdminInfoHOC = Layout(DashAdminInfo);
const DashAllJobsHOC = Layout(DashAllJobs);

const appID = "2409544426dbdcb4";
const region = "us";


const App = () => {
  const { mode } = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeColors(mode)), [mode]);

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/location/:location" element={<Home />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/job/:job._id" element={<SingleJob />} />
              <Route path="/job/:id" element={<SingleJob />} />
              <Route path="/company/:id" element={<CardAllElement />} />

              <Route
                path="/admin/info"
                element={
                  <AdminRoute>
                    <AdminDashboardHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <AdminRoute>
                    <DashJobsHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/job/create"
                element={
                  <AdminRoute>
                    <DashCreateJobHOC />
                  </AdminRoute>
                }
              />
  
              <Route
                path="/mainadmin"
                element={
                  <MainAdminRoute>
                    <DashAllUsersHOC />
                  </MainAdminRoute>
                }
              />
              <Route
                path="/mainadmin/info"
                element={
                  <MainAdminRoute>
                    <DashAdminInfoHOC />
                  </MainAdminRoute>
                }
              />
              <Route
                path="/mainadmin/alljobs"
                element={
                  <MainAdminRoute>
                    <DashAllJobsHOC />
                  </MainAdminRoute>
                }
              />``


              <Route
                path="/user/dashboard"
                element={
                  <UserRoute>
                    <UserDashboardHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/user/jobs"
                element={
                  <UserRoute>
                    <UserJobsHistoryHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/user/info"
                element={
                  <UserRoute>
                    <UserInfoDashboardHOC />
                  </UserRoute>
                }
              />

              <Route path="/user/ResetPassword" element={<ResetPassword />} />
              <Route
                path="/user/resetPassword/:token"
                element={<ResetPassword1 />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
