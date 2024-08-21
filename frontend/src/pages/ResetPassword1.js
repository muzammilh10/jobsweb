import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  newPassword: yup
    .string("Enter your password")
    .email("Enter a valid password")
    .required("password is required"),
  confirmPassword: yup
    .string("Enter your password")
    .email("Enter a valid password")
    .required("password is required"),
});

const ResetPassword1 = () => {
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const { token } = useParams();
  console.log(token);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      setNewPassword({ newPassword: values.newPassword });
      setConfirmPassword({ confirmPassword: values.confirmPassword });
    },
  });

  useEffect(() => {
    if (newPassword && confirmPassword) {
      axios
        .patch(
          `${process.env.BASE_URL}/api/resetPassword/${token}`,
          {
            password: newPassword,
            passwordConfirm: confirmPassword,
          },
          { "Content-type": "application/json" }
        )
        .then((res) => {
          console.log(res);
          toast.success("Password reset successfully!");
          formik.resetForm();
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data.error);
        });
    } else if (newPassword !== null && confirmPassword !== null) {
      toast.error("Both fields are required.");
    }
  }, [newPassword, confirmPassword]);

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
              Reset password
            </Typography>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="password"
              label="Enter your password"
              name="newPassword"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="password"
              label="Enter your confirmpassword"
              name="confirmPassword"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Confirm password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Button fullWidth variant="contained" type="submit">
              Reset Password
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword1;
