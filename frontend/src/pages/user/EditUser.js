import React, { useEffect, useState } from "react";
import { Avatar, Button, CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import storage from "../../utils/firebase";
import { editUserAction } from "../../redux/actions/userAction";
import {
  ref as addRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  resume: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditUser = (props) => {
  const { user } = useSelector((state) => state.userprofile);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [formdata, setFormdata] = useState(INITIAL_STATE);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    let fn = user && user.firstName;
    let ln = user && user.lastName;
    let re = user && user.resume;

    setFormdata({
      firstName: fn,
      lastName: ln,
      resume: re,
    });
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const chageHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(editUserAction(user && user._id, formdata));
    window.location.reload();
    setOpen(!open);
  };

  const photoupload = (event) => {
    let file = event.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    setResumeLoading(true);

    const storageRef = addRef(storage, `/files/${file.name}`);
    const editTask = uploadBytesResumable(storageRef, file);
    editTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(editTask.snapshot.ref).then((url) => {
          console.log("IMAGE URL---->", url);
          formdata.resume = url;

          setFormdata((prevdata) => ({ ...prevdata, resume: url }));
          setResumeLoading(false);
        });
      }
    );
  };

  return (
    <div>
      <EditIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          {"Please Enter Your New Employee Data Here!!"}
        </DialogTitle>
        <DialogContent>
          <form action="" onSubmit={onSubmitHandler}>
            {user && (
              <div>
                <DialogContentText id="alert-dialog-slide-description">
                  <br />
                  <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    id="firstName"
                    label="firstName"
                    type="text"
                    name="firstName"
                    value={formdata.firstName}
                    onChange={chageHandler}
                    required
                  ></TextField>
                  <br />
                  <br />
                  <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="lastName"
                    type="text"
                    value={formdata.lastName}
                    onChange={chageHandler}
                    required
                  />
                  <br />
                  <br />
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
                    label="resume"
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="photo"
                    onChange={photoupload}
                  />
                  {resumeLoading && <CircularProgress />}{" "}
                  {/* Show the loader when resume is being uploaded */}
                  {formdata.resume && !resumeLoading && (
                    <a href={formdata.resume} target="_blank">
                      Preview your Resume
                    </a>
                  )}
                </DialogContentText>
                <DialogActions>
                  <Button type="submit">Edit</Button>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUser;
