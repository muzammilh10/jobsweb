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
import DashUsers from "./pages/admin/DashUsers";
import DashJobs from "./pages/admin/DashJobs";
import Register from "./pages/Register";
import DashCategory from "./pages/admin/DashCategory";
import DashCreateJob from "./pages/admin/DashCreateJob";
import DashCreateCategory from "./pages/admin/DashCreateCategory";
import { createTheme } from "@mui/material/styles";
import { themeColors } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import ResetPassword from "./pages/ResetPassword";
import ResetPassword1 from "./pages/ResetPassword1";
import YoutubeVideo from "./component/youtube/YoutubeViedo";
import { CometChat } from "@cometchat-pro/chat";
import AdminChat from "./pages/admin/AdminChat";
import UserChat from "./pages/user/UserChat";
import MainAdminRoute from "./component/MainAdmin";
import DashAllUsers from "./component/mainadmin/DashUser";
import DashAdminInfo from "./component/mainadmin/DashAdminInfo";
import DashAllJobs from "./component/mainadmin/DashAllJobs";
import DashAllCategory from "./component/mainadmin/DashAllCategory";
import MainAdminChat from "./component/mainadmin/MainAdminChat";

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory);
const DashCreateJobHOC = Layout(DashCreateJob);
const DashCreateCategoryHOC = Layout(DashCreateCategory);
const DashAdminChatHOC = Layout(AdminChat);
const DashUSerChatHOC = Layout(UserChat);
const DashAllUsersHOC = Layout(DashAllUsers);
const DashAdminInfoHOC = Layout(DashAdminInfo);
const DashAllJobsHOC = Layout(DashAllJobs);
const DashAllCategoryHOC = Layout(DashAllCategory);
const MainAdminChatHOC = Layout(MainAdminChat);

const appID = "2409544426dbdcb4";
const region = "us";
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
  },
  (error) => {
    console.log("Initialization failed with error:", error);
  }
);

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
              <Route path="/search" element={<YoutubeVideo />} />
              <Route path="/job/:id" element={<SingleJob />} />
              <Route
                path="/admin/info"
                element={
                  <AdminRoute>
                    <AdminDashboardHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <DashUsersHOC />
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
                path="/admin/category"
                element={
                  <AdminRoute>
                    <DashCategoryHOC />
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
                path="/admin/category/create"
                element={
                  <AdminRoute>
                    <DashCreateCategoryHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/chat"
                element={
                  <AdminRoute>
                    <DashAdminChatHOC />
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
              />
              <Route
                path="/mainadmin/allcategory"
                element={
                  <MainAdminRoute>
                    <DashAllCategoryHOC />
                  </MainAdminRoute>
                }
              />
              <Route
                path="/mainadmin/chat"
                element={
                  <MainAdminRoute>
                    <MainAdminChatHOC />
                  </MainAdminRoute>
                }
              />

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
              <Route
                path="/user/chat"
                element={
                  <UserRoute>
                    <DashUSerChatHOC />
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
