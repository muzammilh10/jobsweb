import React, { useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  menuClasses,
  useProSidebar,
} from "react-pro-sidebar";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box, useTheme } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Person3Icon from "@mui/icons-material/Person3";
import Avatar from "@mui/material/Avatar";
import logoDashboard from "../../images/hr-project.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const SidebarAdm = () => {
  const { userInfo } = useSelector((state) => state.signIn);
  const { palette } = useTheme();
  const { collapsed } = useProSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);

  const logOut = () => {
    navigate("/");
  };

  return (
    <>
      <Sidebar backgroundColor="white" style={{ borderRightStyle: "none" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box>
            <Box
              sx={{ pt: 3, pb: 5, display: "flex", justifyContent: "center" }}
            >
              {collapsed ? (
                <Avatar alt="logo dashboard" src={logoDashboard} />
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{
                      width: "100px",
                      heigth: "100px",
                      textAlign: "center",
                      transition: "all ease-out .5s",
                    }}
                    src={logoDashboard}
                    alt="logo dashboard"
                  />
                </Box>
              )}
            </Box>

            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#fafafa",
                  },
                  [`&.${menuClasses.disabled}`]: {
                    color: "green",
                  },
                  "&:hover": {
                    backgroundColor: "",
                    color: "#fafafa",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    color: palette.primary.main,
                  },
                },
              }}
            >
              {userInfo && userInfo.role.role === 1 && (
                <>
                  <MenuItem
                    component={<Link to="/admin/jobs" />}
                    icon={<WorkIcon />}
                  >
                    <div style={{ color: "black" }}> Jobs </div>
                  </MenuItem>
                  <MenuItem
                    component={<Link to="/admin/info" />}
                    icon={<Person3Icon />}
                  >
                    <div style={{ color: "black" }}> Personal Info </div>
                  </MenuItem>
            
                </>
              )}
              {userInfo && userInfo.role.role === 0 && (
                <>
                  <MenuItem
                    component={<Link to="/user/jobs" />}
                    icon={<WorkHistoryIcon />}
                  >
                    <div style={{ color: "black" }}> Applied Jobs </div>
                  </MenuItem>
                  <MenuItem
                    component={<Link to="/user/info" />}
                    icon={<Person3Icon />}
                  >
                    <div style={{ color: "black" }}> Personal Info </div>
                  </MenuItem>
             
                </>
              )}
              {userInfo && userInfo.role.role === 2 && (
                <>
          
                  <MenuItem
                    component={<Link to="/mainadmin" />}
                    icon={<Person3Icon />}
                  >
                    <div style={{ color: "black" }}> All User </div>
                  </MenuItem>

                  <MenuItem
                    component={<Link to="/mainadmin/alljobs" />}
                    icon={<WorkHistoryIcon />}
                  >
                    <div style={{ color: "black" }}> All Jobs </div>
                  </MenuItem>
                  <MenuItem
                    component={<Link to="/mainadmin/info" />}
                    icon={<Person3Icon />}
                  >
                    <div style={{ color: "black" }}> Personal Info </div>
                  </MenuItem>
                  
                </>
              )}
            </Menu>
          </Box>
          <Box sx={{ pb: 2 }}>
            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#fafafa",
                  },

                  "&:hover": {
                    backgroundColor: "",
                    color: "",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    color: palette.primary.main,
                  },
                },
              }}
            >
              <MenuItem
                onClick={logOut}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-2 h-2"
                    style={{ maxHeight: 20, maxWidth: 20 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                }
              >
                <div style={{ color: "black" }}> Back </div>{" "}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Sidebar>
    </>
  );
};

export default SidebarAdm;
