import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { editJobAction } from "../../../redux/actions/jobAction";
import { loadJobAction } from "../../../redux/actions/generalActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateJob = ({ jobData }) => {
  const INITIAL_STATE = {
    id: jobData._id,
    title: jobData.title,
    salary: jobData.salary,
  };
  const dispatch = useDispatch();
  const data = useSelector((state) => state.signIn);
  const [open, setOpen] = useState(false);
  const [formdata, setFormdata] = useState(INITIAL_STATE);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chageHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(editJobAction(formdata.id, formdata, data.userInfo.role._id));
    dispatch(loadJobAction());
    setOpen(!open);
    window.location.reload();
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{
          bgcolor: "#70b5dc",
          "&:hover": {
            bgcolor: "#4b8cb5",
          },
        }}
      >
        <div style={{ color: "blue" }}>Edit</div>
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "400px",
            maxWidth: "80%",
          },
        }}
      >
        <DialogTitle style={{ fontSize: "25px", textAlign: "center" }}>
          {"Update Your Job!!"}
        </DialogTitle>

        <DialogContent>
          <form action="" onSubmit={onSubmitHandler}>
            <div>
              <DialogContentText id="alert-dialog-slide-description">
                <br />
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  placeholder="Title"
                  value={formdata.title}
                  onChange={chageHandler}
                  required
                ></TextField>
                <br />
                <br />
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="salary"
                  name="salary"
                  label="Salary"
                  type="text"
                  value={formdata.salary}
                  onChange={chageHandler}
                  required
                />
              </DialogContentText>
              <DialogActions>
                <Button variant="outlined" type="submit">
                  Edit
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActions>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateJob;
