import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, Typography } from "@mui/material";
import { GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  updateJobStatusAction,
  useApplyLoadJobAction,
} from "../../redux/actions/jobAction";

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
          console.log(temp);
        }
      }
    }
  }
  React.useEffect(() => {
    FetchData(admin);
  }, [admin]);

  React.useEffect(() => {
    if (success.success?.availableJobs) {
      setJobDetail(success.success);
    }
  }, [success]);
  // const acceptUserById = (id) => {
  //   console.log(">>>>>>>");
  //   console.log(id);
  //   dispatch(updateJobStatusAction(id));
  // };
  const acceptUserById = (rowData) => {
    console.log("Accepted User Data:", rowData._id);
    if (rowData) {
      const updatedData = {
        ...rowData,
        user: rowData._id,
        applicationStatus: "accepted",
      };
      dispatch(updateJobStatusAction(updatedData));
    }
  };
  const rejectUserById = (rowData) => {
    if (rowData) {
      const updatedData = {
        ...rowData,
        user: rowData._id,
        applicationStatus: "rejected",
      };
      dispatch(updateJobStatusAction(updatedData));
    }
  };

  const columns = [
    {
      field: "firstName",
      headerName: "name",
      width: 150,
      editable: true,
    },

    {
      field: "title",
      headerName: "title",
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
      field: "applicationStatus",
      headerName: "status",
      width: 150,
      editable: true,
    },
    {
      field: "resume",
      headerName: "Resume",
      width: 150,
      renderCell: (params) => (
        <a href={params.row.resume} target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      ),
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
          <Button
            onClick={() => acceptUserById(values.row)}
            variant="contained"
            color="error"
          >
            Accept
          </Button>
          <Button
            onClick={() => rejectUserById(values.row)}
            variant="contained"
            color="error"
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          All users
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            {" "}
            Create user
          </Button>
        </Box>
        <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              sx={{
                "& .MuiTablePagination-displayedRows": {
                  color: "black",
                },
                color: "black",
                [`& .${gridClasses.row}`]: {},
                button: {
                  color: "#ffffff",
                },
              }}
              rows={data}
              job={jobDetail}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              slots={{ toolbar: GridToolbar }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </Box>
        </Paper>
      </Box>
    </>
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
// <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
//   All users
// </Typography>
// <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
//   <Button variant="contained" color="success" startIcon={<AddIcon />}>
//     {" "}
//     Create user
//   </Button>
// </Box>
// <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
//   <Box sx={{ height: 400, width: "100%" }}>
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
//       </Box>
//     </Paper>
//   </Box>
// </>
//   );
// };

// export default DashUsers;
