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
import { Avatar, IconButton, Tooltip, useTheme } from "@mui/material";

const SingleJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const { userInfo } = useSelector((state) => state.signIn);
  // const { jobs } = useSelector((state) => state.loadJobs);
  // console.log(jobs && jobs);
  const [formdata, setFormdata] = useState({
    coverLetter: "",
    assessment: "",
  });
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { palette } = useTheme();

  const { id } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [dispatch, id]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      coverLetter: formdata.coverLetter,
      assessment: formdata.assessment,
      companyName: singleJob && singleJob.companyName,
      title: singleJob && singleJob.title,
      Duration: singleJob && singleJob.Duration,
      description: singleJob && singleJob.description,
      salary: singleJob && singleJob.salary,
      location: singleJob && singleJob.location,
      role: singleJob && singleJob.role,
      id: singleJob && singleJob._id,
      singleJob,
    };
    dispatch(userApplyJobAction(formData));
    setFormdata({ coverLetter: "", assessment: "" });
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
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ minHeight: "85vh" }}>
          <Container sx={{ pt: "30px" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box sx={{ flex: 4, p: 2 }}>
                {loading ? (
                  <LoadingBox />
                ) : (
                  <Card
                    sx={{
                      ml: 6,
                      width: "90%",
                      borderRadius: "12px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent sx={{ ml: 1 }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{ fontWeight: 700, mt: 1 }}
                      >
                        {singleJob && singleJob.title}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#555",
                        }}
                      >
                        {singleJob && singleJob.companyName}
                      </Typography>

                      <Tooltip>
                        <IconButton sx={{ ml: 110.5, mt: -10 }}>
                          <Avatar
                            alt=""
                            src={
                              singleJob &&
                              singleJob.user &&
                              singleJob.user.profilePhoto
                            }
                            sx={{
                              color: palette.primary.white,
                              width: 60,
                              height: 60,
                            }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: "16px", mt: -2 }}
                      >
                        Salary:
                        <span style={{ fontWeight: "lighter" }}>
                          {" "}
                          {singleJob && singleJob.salary}₹
                        </span>
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: "16px" }}
                      >
                        Location:
                        <span style={{ fontWeight: "lighter" }}>
                          {" "}
                          {singleJob && singleJob.location}
                        </span>
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, fontSize: "16px" }}
                      >
                        Duration:
                        <span style={{ fontWeight: "lighter" }}>
                          {" "}
                          {singleJob && singleJob.Duration}
                        </span>
                      </Typography>

                      <Typography variant="body2">
                        <Box
                          component="span"
                          sx={{
                            fontWeight: 700,
                            fontSize: "16px",
                            display: "inline-block",
                            marginRight: "8px",
                          }}
                        >
                          Description:
                        </Box>
                        <Box component="span">
                          {singleJob && singleJob.description}
                        </Box>
                      </Typography>

                      <Typography variant="body2" sx={{ mt: 2 }}>
                        <Box
                          component="span"
                          sx={{
                            fontWeight: 700,
                            fontSize: "16px",
                            display: "inline-block",
                          }}
                        >
                          Additional Information:
                        </Box>
                        <Box component="span" sx={{ display: "inline-block" }}>
                          {singleJob && singleJob.AdditionalInformation}
                        </Box>
                      </Typography>
                      {userInfo?.role.role === 0 && (
                        <Box
                          sx={{
                            flex: 1,
                            p: 2,
                            mb: -2,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <Button
                            onClick={applyForAJob}
                            sx={{ fontSize: "13px", mb: 1 }}
                            variant="contained"
                          >
                            Apply for this Job
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                )}
                <br />
                {userInfo?.role.role === 0 && showForm && (
                  <>
                    <Card
                      sx={{
                        ml: 6,

                        width: "90%",
                        borderRadius: "12px",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <DialogTitle>
                        <Typography
                          variant="h9"
                          component="span"
                          sx={{ fontWeight: "900" }}
                        >
                          Apply for Job
                        </Typography>
                      </DialogTitle>
                      <DialogContent>
                        <form onSubmit={onSubmitHandler}>
                          <DialogContentText id="alert-dialog-slide-description">
                            <div style={{ fontWeight: "700" }}>
                              Why should you be hired for this role?
                            </div>
                            <TextField
                              sx={{ mb: 3 }}
                              fullWidth
                              id="coverLetter"
                              name="coverLetter"
                              multiline
                              rows={4}
                              placeholder="Mention in details what relevant skill or past experience you have for this internship."
                              value={formdata.coverLetter}
                              onChange={changeHandler}
                              required
                            />

                            <div style={{ fontWeight: "700" }}>
                              If you want to share any documents or files,
                              please upload it on Google Drive or Dropbox and
                              paste the public link in the answer.
                            </div>
                            <TextField
                              sx={{ mb: 3 }}
                              fullWidth
                              id="assessment"
                              name="assessment"
                              multiline
                              rows={2}
                              placeholder="Enter your assessment"
                              value={formdata.assessment}
                              onChange={changeHandler}
                              required
                            />
                          </DialogContentText>
                          {userInfo.role.role === 0 && (
                            <DialogActions>
                              <Button
                                type="submit"
                                variant="contained"
                                onClick={applyForAJob}
                              >
                                Submit
                              </Button>
                            </DialogActions>
                          )}
                        </form>
                      </DialogContent>
                    </Card>
                  </>
                )}
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
