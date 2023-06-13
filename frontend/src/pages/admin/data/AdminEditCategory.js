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
import { editJobTypeAction } from "../../../redux/actions/jobTypeAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateJobType = ({ jobData }) => {
  const INITIAL_STATE = {
    id: jobData._id,
    jobTypeName: jobData.jobTypeName,
  };
  console.log(INITIAL_STATE.jobTypeName);
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
    dispatch(editJobTypeAction(formdata.id, formdata, data.userInfo.role._id));
    setOpen(!open);
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
            <div>
              <DialogContentText id="alert-dialog-slide-description">
                <br />
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="category"
                  label="category"
                  name="jobTypeName"
                  placeholder="category"
                  value={formdata.jobTypeName}
                  onChange={chageHandler}
                  required
                ></TextField>
                <br />
                <br />
              </DialogContentText>
              <DialogActions>
                <Button type="submit">Edit</Button>
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

export default UpdateJobType;
