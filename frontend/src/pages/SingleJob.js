// import { Card, CardContent, Stack, Typography } from "@mui/material";
// import { Box, Container } from "@mui/system";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import Footer from "../component/Footer";
// import LoadingBox from "../component/LoadingBox";
// import Navbar from "../component/Navbar";
// import { jobLoadSingleAction } from "../redux/actions/jobAction";
// import Button from "@mui/material/Button";
// import { userApplyJobAction } from "../redux/actions/userAction";

// const SingleJob = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { singleJob, loading } = useSelector((state) => state.singleJob);
//   const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);

//   const { id } = useParams();
//   console.log(singleJob);

//   useEffect(() => {
//     dispatch(jobLoadSingleAction(id));
//   }, [id]);

//   const applyForAJob = () => {
//     if (!userInfo) {
//       navigate("/login");
//     }
//     dispatch(
//       userApplyJobAction({
//         title: singleJob && singleJob.title,
//         description: singleJob && singleJob.description,
//         salary: singleJob && singleJob.salary,
//         location: singleJob && singleJob.location,
//         role: singleJob && singleJob.role,
//         id: singleJob && singleJob._id,
//         singleJob,
//       })
//     );
//   };

//   return (
//     <>
//       <Box sx={{ bgcolor: "#fafafa" }}>
//         <Navbar />
//         <Box sx={{ height: "85vh" }}>
//           <Container sx={{ pt: "30px" }}>
//             <Stack
//               direction={{ xs: "column", sm: "row" }}
//               spacing={{ xs: 1, sm: 2, md: 4 }}
//             >
//               <Box sx={{ flex: 4, p: 2 }}>
//                 {loading ? (
//                   <LoadingBox />
//                 ) : (
//                   <Card>
//                     <CardContent>
//                       <Typography variant="h5" component="h3">
//                         {singleJob && singleJob.title}
//                       </Typography>
//                       <Typography variant="body2">
//                         <Box component="span" sx={{ fontWeight: 700 }}>
//                           Salary
//                         </Box>
//                         : ${singleJob && singleJob.salary}
//                       </Typography>

//                       <Typography variant="body2">
//                         <Box component="span" sx={{ fontWeight: 700 }}>
//                           Location
//                         </Box>
//                         : {singleJob && singleJob.location}
//                       </Typography>
//                       <Typography variant="body2" sx={{ pt: 2 }}>
//                         {/* <h3>Job description:</h3> */}
//                         {singleJob && singleJob.description}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 )}
//               </Box>
//               <Box sx={{ flex: 1, p: 2 }}>
//                 <Card sx={{ p: 2 }}>
//                   <Button
//                     onClick={applyForAJob}
//                     sx={{ fontSize: "13px" }}
//                     variant="contained"
//                   >
//                     Applied for this Job
//                   </Button>
//                 </Card>
//               </Box>
//             </Stack>
//           </Container>
//         </Box>
//         <Footer />
//       </Box>
//     </>
//   );
// };

// export default SingleJob;
import {
  Card,
  CardContent,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../component/Footer";
import LoadingBox from "../component/LoadingBox";
import Navbar from "../component/Navbar";
import { jobLoadSingleAction } from "../redux/actions/jobAction";
import Button from "@mui/material/Button";
import { userApplyJobAction } from "../redux/actions/userAction";
const SingleJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const { userInfo } = useSelector((state) => state.signIn);
  const [formdata, setFormdata] = useState({
    coverLetter: "",
  });
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  console.log(singleJob);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [id]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      coverLetter: formdata.coverLetter,
      assessment: formdata.assessment,
      title: singleJob && singleJob.title,
      description: singleJob && singleJob.description,
      salary: singleJob && singleJob.salary,
      location: singleJob && singleJob.location,
      role: singleJob && singleJob.role,
      id: singleJob && singleJob._id,
      singleJob,
    };

    dispatch(userApplyJobAction(formData));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const applyForAJob = () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setShowForm(true);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa" }}>
        <Navbar />
        <Box sx={{ height: "85vh" }}>
          <Container sx={{ pt: "30px" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box sx={{ flex: 4, p: 2 }}>
                {loading ? (
                  <LoadingBox />
                ) : (
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h3">
                        {singleJob && singleJob.title}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Salary
                        </Box>
                        : ${singleJob && singleJob.salary}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 700 }}>
                          Location
                        </Box>
                        : {singleJob && singleJob.location}
                      </Typography>
                      <Typography variant="body2" sx={{ pt: 2 }}>
                        {singleJob && singleJob.description}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {showForm && (
                  <>
                    <DialogTitle>Apply for Job</DialogTitle>
                    <DialogContent>
                      <form onSubmit={onSubmitHandler}>
                        <DialogContentText id="alert-dialog-slide-description">
                          <br />
                          <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="coverLetter"
                            label="coverLetter"
                            name="coverLetter"
                            placeholder="Enter coverLetter"
                            value={formdata.coverLetter}
                            onChange={changeHandler}
                            required
                          />
                          <TextField
                            sx={{ mb: 3 }}
                            fullWidth
                            id="assessment"
                            label="assessment"
                            name="assessment"
                            placeholder="Enter assessment"
                            value={formdata.assessment}
                            onChange={changeHandler}
                            required
                          />
                          <br />
                        </DialogContentText>
                        <DialogActions>
                          <Button type="submit" onClick={applyForAJob}>
                            Submit
                          </Button>
                        </DialogActions>
                      </form>
                    </DialogContent>
                  </>
                )}
              </Box>
              <Box sx={{ flex: 1, p: 2 }}>
                <Card sx={{ p: 2 }}>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                    }}
                    sx={{ fontSize: "13px" }}
                    variant="contained"
                  >
                    Apply for this Job
                  </Button>
                </Card>
              </Box>
            </Stack>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default SingleJob;
