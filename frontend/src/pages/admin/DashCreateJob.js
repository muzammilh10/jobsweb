import { Box, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { adminJobTypeLoadAction } from "../../redux/actions/jobTypeAction";
import { registerAjobAction } from "../../redux/actions/jobAction";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  title: yup.string("Enter a job title").required("title is required"),
  companyName: yup
    .string("Enter a companyName")
    .required("companyName is required"),
  description: yup
    .string("Enter a description")
    .min(6, "Description should be of minimum 15 characters length")
    .required("Description is required"),
  salary: yup.string("Enter a salary").required("Salary is required"),
  Duration: yup.string("Enter a Duration").required("Salary is Duration"),
  location: yup.string("Enter a location").required("Location is required"),
  jobType: yup.string("Enter a Category").required("Category is required"),
});

const DashCreateJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //job type
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const user = JSON.parse(userInfo);
    const id = user.role._id;
    dispatch(adminJobTypeLoadAction(id));
  }, []);

  const { jobType } = useSelector((state) => state.jobType);
  console.log({jobType})
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      companyName: "",
      salary: "",
      location: "",
      jobType: "",
      Duration: "",
      AdditionalInformation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(registerAjobAction(values));
      navigate("/admin/jobs");
      window.location.reload();
    },
  });

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 4,
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
              Register a Job
            </Typography>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Title"
              name="title"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="description"
              name="description"
              label="Description"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="AdditionalInformation"
              name="AdditionalInformation"
              label="AdditionalInformation"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="AdditionalInformation"
              value={formik.values.AdditionalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.AdditionalInformation &&
                Boolean(formik.errors.AdditionalInformation)
              }
              helperText={
                formik.touched.AdditionalInformation &&
                formik.errors.AdditionalInformation
              }
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="companyName"
              name="companyName"
              label="companyName"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="Duration"
              name="Duration"
              label="Duration"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Duration"
              value={formik.values.Duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Duration && Boolean(formik.errors.Duration)}
              helperText={formik.touched.Duration && formik.errors.Duration}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="salary"
              name="salary"
              label="Salary"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="location"
              name="location"
              label="Location"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              className="px-2 my-2"
              variant="outlined"
              name="jobType"
              id="jobType"
              select
              label="Catessdsgory"
              value={formik.values.jobType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.jobType && Boolean(formik.errors.jobType)}
              helperText={formik.touched.jobType && formik.errors.jobType}
            >
              <MenuItem key={""} value={""}></MenuItem>

              {jobType?.jobs &&
                jobType.jobs.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.jobTypeName}
                  </MenuItem>
                ))}
            </TextField>

            <Button fullWidth variant="contained" type="submit">
              Create job
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashCreateJob;
