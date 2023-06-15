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

  if (jobDetail !== false) {
    const outdata = jobDetail?.availableJobs;
    if (outdata) {
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
    if (success.success?.availableJobs) {
      setJobDetail(success.success);
    }
  }, [success]);

  const acceptUserById = (rowData) => {
    console.log("Accepted User Data:", rowData._id);
    if (rowData) {
      const updatedData = {
        ...rowData,
        user: rowData._id,
        applicationStatus: "accepted",
      };
      dispatch(updateJobStatusAction(updatedData)).then(() => {
        FetchData(admin);
      });
    }
  };

  const rejectUserById = (rowData) => {
    if (rowData) {
      const updatedData = {
        ...rowData,
        user: rowData._id,
        applicationStatus: "rejected",
      };
      dispatch(updateJobStatusAction(updatedData)).then(() => {
        FetchData(admin);
      });
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
            color="success"
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
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}></Box>
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
                  color: "black",
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
