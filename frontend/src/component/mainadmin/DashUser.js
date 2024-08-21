import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  allShowUserAction,
  userDeleteAction,
} from "../../redux/actions/userAction";

const DashAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allShowUserAction());
  }, []);

  const { users } = useSelector((state) => state.allUsers);
  console.log(users);
  let data = [];
  data = users !== undefined && users.length > 0 ? users : [];
  console.log({data})

  const deleteUserById = (e, id) => {
    dispatch(userDeleteAction(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "firstName",
      headerName: "NAME",
      width: 150,
    },
    {
      field: "email",
      headerName: "E MAIL",
      width: 250,
    },

    {
      field: "role",
      headerName: "USER STATUS",
      width: 180,
      renderCell: (params) =>
        params.row.role === 1 ? "Admin" : "Regular user",
    },

    {
      field: "createdAt",
      headerName: "CREATED AT",
      width: 250,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "ACTIONS",
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
            onClick={(e) => deleteUserById(e, values.row._id)}
            variant="contained"
            color="error"
            sx={{
              bgcolor: "#e7c5c5",
              "&:hover": {
                bgcolor: "#dd8181",
              },
            }}
          >
            <div style={{ color: "red" }}>Delete</div>
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box display="flex" justifyContent="center" mt={3}>
        <Box width="73%">
          <Typography variant="h4" sx={{ color: "black", pb: 3, mt: -3 }}>
            All User
          </Typography>
          <Box sx={{ pb: 1, display: "flex", justifyContent: "right" }}></Box>
          <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                getRowId={(row) => row._id}
                sx={{
                  "& .MuiTablePagination-displayedRows": {
                    color: "black",
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
                density="comfortable"
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default DashAllUsers;
