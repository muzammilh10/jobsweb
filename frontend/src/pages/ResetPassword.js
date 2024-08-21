import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

const ResetPassword = () => {
  const [email, setEmail] = useState({});

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      setEmail({ email: values.email });
      actions.resetForm();
    },
  });

  useEffect(() => {
    if (Object.keys(email).length !== 0) {
      axios
        .post(`${BASE_URL}/api/forgetpassword`, email)
        .then((res) => {
          console.log(res);
          toast.success("Email sent successfully!");
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data.error);
        });
    }
  }, [email]);

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
              id="Resetpassword"
              label="Enter your enail address"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Resetpassword"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Button fullWidth variant="contained" type="submit">
              Send Mail
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
