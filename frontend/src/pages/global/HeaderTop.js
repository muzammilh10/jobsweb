// import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// //import sidebar hook
// import { useProSidebar } from "react-pro-sidebar";

// // const Search = styled("div")(({ theme }) => ({
// //   position: "relative",
// //   borderRadius: theme.shape.borderRadius,
// //   backgroundColor: alpha(theme.palette.common.white, 0.15),
// //   "&:hover": {
// //     backgroundColor: alpha(theme.palette.common.white, 0.25),
// //   },
// //   marginLeft: 0,
// //   width: "100%",
// //   [theme.breakpoints.up("sm")]: {
// //     marginLeft: theme.spacing(1),
// //     width: "auto",
// //   },
// // }));

// // const SearchIconWrapper = styled("div")(({ theme }) => ({
// //   padding: theme.spacing(0, 2),
// //   height: "100%",
// //   position: "absolute",
// //   pointerEvents: "none",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "center",
// // }));

// // const StyledInputBase = styled(InputBase)(({ theme }) => ({
// //   color: "inherit",
// //   "& .MuiInputBase-input": {
// //     padding: theme.spacing(1, 1, 1, 0),
// //     // vertical padding + font size from searchIcon
// //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// //     transition: theme.transitions.create("width"),
// //     width: "100%",
// //     [theme.breakpoints.up("sm")]: {
// //       width: "12ch",
// //       "&:focus": {
// //         width: "20ch",
// //       },
// //     },
// //   },
// // }));

// const HeaderTop = () => {
//   const { collapseSidebar } = useProSidebar();
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{ boxShadow: 0 }}>
//         <Toolbar>
//           <IconButton
//             onClick={() => collapseSidebar()}
//             size="large"
//             edge="start"
//             color="black"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             color="black"
//             sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
//           >
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default HeaderTop;
import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useProSidebar } from "react-pro-sidebar";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "",
}));

const HeaderTop = () => {
  const { collapseSidebar } = useProSidebar();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            onClick={() => collapseSidebar()}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="inherit"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Admin Dashboard
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default HeaderTop;
