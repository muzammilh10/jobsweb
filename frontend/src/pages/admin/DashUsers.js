import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useApplyLoadJobAction } from "../../redux/actions/jobAction";

const DashUsers = () => {
  const dispatch = useDispatch();
  const [jobDetail, setJobDetail] = React.useState([]);
  const success = useSelector((state) => state.applyByUser);
  const admin = useSelector((state) => state.signIn);
  let data = [];
  data = success !== undefined && success.length > 0 ? success : [];

  const FetchData = (admin) => {
    dispatch(useApplyLoadJobAction(admin.userInfo.role._id));
  };
  // console.log(success.success !== undefined && success.success.availableJobs);
  if (jobDetail !== false) {
    const outdata = jobDetail?.availableJobs;
    if (outdata) {
      // console.log(outdata);
      for (let i = 0; i < outdata.length; i++) {
        const element = outdata[i].userAppliedForJob;
        for (let j = 0; j < element.length; j++) {
          let temp = element[j];
          delete temp.user._id;
          temp = { ...temp, ...temp.user };
          data.push(temp);
        }
      }
    }
  }
  React.useEffect(() => {
    FetchData(admin);
  }, [admin]);

  React.useEffect(() => {
    console.log(success);
    if (success.success?.availableJobs) {
      setJobDetail(success.success);
    }
  }, [success]);

  const deleteUserById = (e, id) => {};

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
      editable: true,
    },
    {
      field: "salary",
      headerName: "salary",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "E_mail",
      width: 150,
      editable: true,
    },

    {
      field: "role",
      headerName: "User status",
      width: 150,
      renderCell: (params) =>
        params.row.role === 1 ? "Admin" : "Regular user",
    },

    {
      field: "createdAt",
      headerName: "Creation date",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/user/${values.row._id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteUserById(e, values.row._id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={data}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[3]}
        checkboxSelection
        slots={{ toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
export default DashUsers;
//=========================================
// import React, { useEffect, useState } from "react";
// import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
// import {
//   DataGrid,
//   gridClasses,
//   GridToolbar,
//   GridPagination,
// } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import { allUserAction } from "../../redux/actions/userAction";

// const DashUsers = () => {
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(3);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(allUserAction(page, pageSize));
//   }, []);

//   const { users, loading } = useSelector((state) => state.allUsers);
//   let data = [];
//   data = users !== undefined && users.length > 0 ? users : [];

//   // const fetchData = async (page, pageSize) => {
//   //   // Make an API request to your server-side endpoint

//   //   // Update the state with the fetched data and total rows
//   //   setData(response.data.rows);
//   //   setTotalRows(response.data.totalRows);
//   // };

//   const deleteUserById = (e, id) => {
//     console.log(id);
//   };

//   const columns = [
//     {
//       field: "_id",
//       headerName: "User ID",
//       width: 150,
//       editable: true,
//     },

//     {
//       field: "email",
//       headerName: "E_mail",
//       width: 150,
//     },

//     {
//       field: "role",
//       headerName: "User status",
//       width: 150,
//       renderCell: (params) =>
//         params.row.role === 1 ? "Admin" : "Regular user",
//     },

//     {
//       field: "createdAt",
//       headerName: "Creation date",
//       width: 150,
//       renderCell: (params) =>
//         moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
//     },

//     {
//       field: "Actions",
//       width: 200,
//       renderCell: (values) => (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "170px",
//           }}
//         >
//           <Button variant="contained">
//             <Link
//               style={{ color: "white", textDecoration: "none" }}
//               to={`/admin/edit/user/${values.row._id}`}
//             >
//               Edit
//             </Link>
//           </Button>
//           <Button
//             onClick={(e) => deleteUserById(e, values.row._id)}
//             variant="contained"
//             color="error"
//           >
//             Delete
//           </Button>
//         </Box>
//       ),
//     },
//   ];

//   // useEffect(() => {
//   //   fetchData(1, 10);
//   // }, []);

//   return (
//     <>
//       <Box>
//         <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
//           All users
//         </Typography>
//         <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
//           <Button variant="contained" color="success" startIcon={<AddIcon />}>
//             {" "}
//             Create user
//           </Button>
//         </Box>
//         <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
//           <Box sx={{ height: 400, width: "100%" }}>
//             <DataGrid
//               sx={{
//                 "& .MuiTablePagination-displayedRows": {
//                   color: "white",
//                 },
//                 color: "white",
//                 [`& .${gridClasses.row}`]: {
//                   bgcolor: (theme) =>
//                     // theme.palette.mode === 'light' ? grey[200] : grey[900],
//                     theme.palette.secondary.main,
//                 },
//                 button: {
//                   color: "#ffffff",
//                 },
//               }}
//               getRowId={(row) => row._id}
//               rows={data}
//               columns={columns}
//               pageSize={10}
//               components={{
//                 Toolbar: GridToolbar,
//                 Pagination: GridPagination,
//               }}
//               onPageChange={(params) => {
//                 const { page, pageSize } = params;
//                 console.log(page, pageSize);
//                 setPage(page);
//                 setPageSize(pageSize);
//               }}
//               pageSizeOptions={[3, 5]}
//             />
//           </Box>
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default DashUsers;
