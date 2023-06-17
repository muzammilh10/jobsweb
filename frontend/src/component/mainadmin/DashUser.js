import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { allUserAction } from "../../redux/actions/userAction";

const DashAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUserAction());
  }, []);

  const { users, loading } = useSelector((state) => state.allUsers);
  console.log(users);
  let data = [];
  data = users !== undefined && users.length > 0 ? users : [];

  const deleteUserById = (e, id) => {
    console.log(id);
  };

  const columns = [
    {
      field: "_id",
      headerName: "User ID",
      width: 150,
      editable: true,
    },

    {
      field: "email",
      headerName: "E_mail",
      width: 150,
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
    <>
      <Box display="flex" justifyContent="center" mt={3}>
        <Box width="65%">
          <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
            All User
          </Typography>
          <Box sx={{ pb: 1, display: "flex", justifyContent: "right" }}></Box>
          <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                getRowId={(row) => row._id}
                sx={{
                  "& .MuiTablePagination-displayedRows": {
                    color: "white",
                  },
                  color: "black",
                  [`& .${gridClasses.row}`]: {},
                  button: {
                    color: "black",
                  },
                }}
                rows={data}
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
      </Box>
    </>
  );
};

export default DashAllUsers;
