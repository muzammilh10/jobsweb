import { Avatar, Box, CircularProgress } from "@mui/material";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { userSignUpAction } from "../redux/actions/userAction";
import storage from "../utils/firebase";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your First Name")
    .min(3, "First Name should be of minimum 3 characters length")
    .required("First Name is required"),
  lastName: yup
    .string("Enter your Last Name")
    .min(3, "Last Name should be of minimum 3 characters length")
    .required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string("Enter your phonenumber")
    .min(10, "Phone Number should be of minimum 10 characters length")
    .required("Phone Number is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState();
  const [role, setRole] = useState("");
  const [resumeLoading, setResumeLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      values.role = 0;
      const finalValues = { ...values, resume: images, profilePhoto: images };

      dispatch(userSignUpAction(finalValues));
      navigate("/login");
      actions.resetForm();
    },
  });

  const photoupload = (event) => {
    let file = event.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = addRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setResumeLoading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages(url);
          setResumeLoading(false);
        });
      }
    );
  };

  const profile = (event) => {
    let file = event.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = addRef(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setProfileLoading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages(url);
          setProfileLoading(false);
        });
      }
    );
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "81vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.white",
          flexDirection: "column",
          minHeight: "120vh",
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 1 }}>
              <LockOpenIcon />
            </Avatar>
 
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="profilePhoto"
              label="profilePhoto"
              name="profilePhoto"
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="profile Photo"
              value={formik.values.profilePhoto}
              onChange={profile}
              onBlur={formik.handleBlur}
              error={
                formik.touched.profilePhoto &&
                Boolean(formik.errors.profilePhoto)
              }
              helperText={
                formik.touched.profilePhoto && formik.errors.profilePhoto
              }
            />
            {profileLoading && (
              <Box sx={{ display: "flex", mb: 3, justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            )}
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="phoneNumber"
              type="phoneNumber"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {role === "0" && (
              <>
                <TextField
                  sx={{
                    mb: 3,
                    "& .MuiInputBase-root": {
                      color: "text.secondary",
                    },
                    fieldset: { borderColor: "rgb(231, 235, 240)" },
                  }}
                  fullWidth
                  id="resume"
                  name="resume"
                  label="Resume"
                  type="file"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Resume"
                  onChange={photoupload}
                  onBlur={formik.handleBlur}
                  error={formik.touched.resume && Boolean(formik.errors.resume)}
                  helperText={formik.touched.resume && formik.errors.resume}
                />

                {resumeLoading && (
                  <Box
                    sx={{ display: "flex", mb: 3, justifyContent: "center" }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "white",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              fullWidth
            >
              Register
            </Button>
            <div class="container signin">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "#2196f3", textDecoration: "none" }}
                >
                  Login
                </Link>
              </p>
            </div>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Register;
