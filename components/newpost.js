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
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Router from "next/router";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NewPost() {
  const [open, setOpen] = React.useState(false);
  const [vlurb, setVlurb] = React.useState("");
  const [error, setError] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [currTag, setCurrTag] = React.useState([]);
  const [currTagInput, setCurrTagInput] = React.useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = (tagToDel) => () => {
    setSelectedTags((tags) => tags.filter((tag) => tag.key !== tagToDel.key));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTag = (e) => {
    e.preventDefault();
    const copy = selectedTags;
    copy.push({ label: currTag, key: tags.length + 1 });
    setSelectedTags(copy);
    setCurrTag("");
  };

  React.useEffect(() => {
    const fetchTags = async () => {
      const result = await axios("/api/tags");

      const tagRes = [];

      for (let i = 0; i < result.data.body.tags.length; i++) {
        tagRes.push({ key: i, label: result.data.body.tags[i].toString() });
      }

      setTags(tagRes);
    };

    fetchTags();
  }, []);

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
        username: JSON.parse(localStorage.getItem("vinder-username")),
        content: vlurb,
        tags: selectedTags.map((e) => e.label),
      })
      .then((res) => {
        if (res.data && res.data.body && res.data.body.Error) {
          setError(res.data.body.Error);
        } else {
          setError("");
          Router.push("/posts");
        }
      })
      .catch((res) => {
        setError("An unexpected error has occurred.");
        console.log(res);
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
            placeholder="Your vlurb here..."
            value={vlurb}
            onChange={(e) => setVlurb(e.target.value)}
            type="text"
            fullWidth
            multiline
            rowsMax={5}
            rows={2}
            maxLength={100}
          />
          {selectedTags.length > 0 && (
            <Paper
              elevation={8}
              variant="ul"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                listStyle: "none",
                padding: theme.spacing(0.5),
                margin: "10px 0",
              }}
            >
              {selectedTags.map(({ key, label }) => {
                return (
                  <li key={key}>
                    <Chip
                      label={label}
                      onDelete={handleDelete({ key, label })}
                    />
                  </li>
                );
              })}
            </Paper>
          )}
          <Autocomplete
            freeSolo
            disableClearable
            options={tags.map((tag) => tag.label)}
            value={currTag}
            onChange={(e, newVal) => setCurrTag(newVal)}
            onInputChange={(e, newInputValue) => {
              setCurrTagInput(newInputValue);
            }}
            inputValue={currTagInput}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tag to add"
                margin="normal"
                variant="outlined"
              />
            )}
          />
          <Button color="secondary" variant="contained" onClick={addTag}>
            {" "}
            Add tag{" "}
          </Button>
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
