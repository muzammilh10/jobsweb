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
    assessment: "",
  });
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
      title: singleJob && singleJob.title,
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
                  <Card>
                    <CardContent>
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{ fontWeight: 800 }}
                      >
                        {singleJob && singleJob.title}
                      </Typography>

                      <Typography
                        variant="body3"
                        component="h3"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        {singleJob && singleJob.companyName}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{ pt: 3, fontWeight: 650 }}
                      >
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, fontSize: "17px" }}
                        >
                          Salary
                        </Box>
                        <Box component="span" sx={{ fontWeight: 500 }}>
                          :- ${singleJob && singleJob.salary}
                        </Box>
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ pt: 0, fontWeight: 650 }}
                      >
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, fontSize: "17px" }}
                        >
                          Location
                        </Box>
                        :-{" "}
                        <Box component="span" sx={{ fontWeight: 500 }}>
                          {singleJob && singleJob.location}
                        </Box>
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ pt: 0, fontWeight: 650 }}
                      >
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, fontSize: "17px" }}
                        >
                          Description
                        </Box>

                        <Box component="span" sx={{ fontWeight: 500 }}>
                          :- {singleJob && singleJob.description}
                        </Box>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ pt: 0, fontWeight: 650 }}
                      >
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, fontSize: "17px" }}
                        >
                          Additional Information
                        </Box>
                        <Box component="span" sx={{ fontWeight: 500 }}>
                          :- {singleJob && singleJob.AdditionalInformation}
                        </Box>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {showForm && (
                  <>
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
                          <div style={{ fontWeight: "700" }}>Cover letter</div>

                          <br />
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
                            If you want to share any documents or files, please
                            upload it on Google Drive or Dropbox and paste the
                            public link in the answer.
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
                        <DialogActions>
                          <Button
                            type="submit"
                            variant="contained"
                            onClick={applyForAJob}
                          >
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
                    onClick={applyForAJob}
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
