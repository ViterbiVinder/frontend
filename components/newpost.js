import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { DEPLOYMENT } from "./constants";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NewPost() {
  const [open, setOpen] = React.useState(false);
  const [vlurb, setVlurb] = React.useState("");
  const [error, setError] = React.useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    console.log(`${DEPLOYMENT}api/post`);
    axios
      .post(`${DEPLOYMENT}api/post`, {
        username: localStorage.getItem("vinder-username"),
        content: vlurb,
        tags: [],
      })
      .then((res) => {
        if (res.data && res.data.body && res.data.body.Error) {
          setError(res.data.body.Error);
        }
      })
      .catch((res) => {
        setError("An error has occurred.");
      });
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        New post
      </Button>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            value={vlurb}
            onChange={(e) => setVlurb(e.target.value)}
            type="text"
            fullWidth
            multiline
            rowsMax={5}
            rows={2}
            maxLength={100}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
