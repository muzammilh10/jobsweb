import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  adminJobTypeLoadAction,
  deleteJobTypeAction,
  jobTypeLoadAction,
} from "../../redux/actions/jobTypeAction";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import UpdateJobType from "./data/AdminEditCategory";

const DashCategory = () => {
  const dispatch = useDispatch();
  const [render, setRender] = React.useState(false);
  const renderHandler = () => {
    setRender(!render);
  };
  // useEffect(() => {
  //   dispatch(jobTypeLoadAction());
  // }, []);

  // const { jobType, loading } = useSelector((state) => state.jobTypeAll);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const user = JSON.parse(userInfo);
    const id = user.role._id;
    dispatch(adminJobTypeLoadAction(id));
  }, []);

  const { jobType, loading } = useSelector((state) => state.jobType);
  let data = [];
  let jobsT;
  if (jobType) {
    jobsT = jobType.jobs;
  }
  data = jobsT !== undefined && jobsT.length > 0 ? jobsT : [];

  //delete job by Id
  const deleteJobCategoryById = (e, id) => {
    dispatch(deleteJobTypeAction(id));
  };

  const columns = [
    {
      field: "_id",
      headerName: "Category ID",
      width: 150,
      editable: true,
    },
    {
      field: "jobTypeName",
      headerName: "Category",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Create At",
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
            width: "100px",
          }}
        >
          <UpdateJobType jobData={values.row} renderHandler={renderHandler} />
          <DeleteIcon
            onClick={(e) => deleteJobCategoryById(e, values.row._id)}
            variant="contained"
            color="error"
          >
            Delete
          </DeleteIcon>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
        Jobs category
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/category/create"
          >
            Create category
          </Link>
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
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            slots={{ toolbar: GridToolbar }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 3 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </Paper>
    </Box>
  );
};
export default DashCategory;
