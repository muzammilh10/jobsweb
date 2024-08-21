import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  adminLoadAction,
  deleteAjobAction,
} from "../../redux/actions/jobAction";
import UpdateJob from "./data/UpdateAdminData";
import moment from "moment";

const DashJobs = () => {
  const dispatch = useDispatch();
  const [render, setRender] = React.useState(false);

  const renderHandler = () => {
    setRender(!render);
  };

  const { jobs } = useSelector((state) => state.adminCreateJob);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log({userInfo})
    const user = JSON.parse(userInfo);
    console.log({user})
    const id = user.role._id;
    console.log({id})
    dispatch(adminLoadAction(id));
  }, []);

  let data = [];
  data = jobs !== undefined && jobs.length > 0 ? jobs : [];
  console.log({data})

  //delete job by Id
  const deleteJobById = (e, id) => {
    console.log();
    dispatch(deleteAjobAction(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "title",
      headerName: "JOB TITLE",
      width: 300,
    },

    // {
    //   field: "available",
    //   headerName: "AVAILABLE",
    //   width: 200,
    //   renderCell: (values) => (values.row.available ? "Yes" : "No"),
    // },

    {
      field: "salary",
      headerName: "SALARY",
      type: Number,
      width: 200,
      renderCell: (values) => "₹" + values.row.salary,
    },
    {
      field: "createdAt",
      headerName: "CREATED AT",
      width: 300,
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
            width: "100px",
            gap: 2,
          }}
        >
          <UpdateJob jobData={values.row} renderHandler={renderHandler} />
          <Button
            onClick={(e) => deleteJobById(e, values.row._id)}
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
    <Box display="flex" justifyContent="center" mt={3}>
      <Box width="75%">
        <Typography
          variant="h4"
          sx={{
            color: "black",
            pb: -3,
            display: "flex",
            justifyContent: "left",
            mt: -3,
          }}
        >
          Job list
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/admin/job/create"
            >
              Create Job
            </Link>
          </Button>
        </Box>
        <Box sx={{ pb: 0, display: "flex", justifyContent: "center" }}></Box>
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
  );
};

export default DashJobs;
