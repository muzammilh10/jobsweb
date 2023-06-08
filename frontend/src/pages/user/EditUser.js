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
import { editUserAction } from "../../redux/actions/userAction";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditUser = (props) => {
  const { user } = useSelector((state) => state.userprofile);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formdata, setFormdata] = useState(INITIAL_STATE);
  console.log(formdata);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    let fn = user && user.firstName;
    let ln = user && user.lastName;
    let em = user && user.email;

    setFormdata({
      firstName: fn,
      lastName: ln,
      email: em,
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
    window.location.reload(true);
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
                  />{" "}
                  <br />
                  <br />
                  <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    id="email"
                    label="email"
                    type="text"
                    name="email"
                    value={formdata.email}
                    onChange={chageHandler}
                    required
                  ></TextField>
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
