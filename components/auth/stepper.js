import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";

import { API } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    background: "transparent",
  },
}));

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const steps = ["Provide account information", "Spice up your profile"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (invalidFirstFields()) {
        return prevActiveStep;
      }
      if (prevActiveStep == steps.length - 1) {
        signUp();
      }
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Username"
              name="user"
              autoComplete="user"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="bio"
              label="Your biography"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              type="text"
              id="bio"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="avatar"
              label="Direct link to avatar"
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
              type="text"
              id="avatar"
            />
          </React.Fragment>
        );
      default:
        return "Unknown step";
    }
  };

  const invalidFirstFields = () => {
    if (
      name.length < 2 ||
      password.length < 2 ||
      email.length < 2 ||
      username.length < 2
    ) {
      setError("All fields must be at least 2 characters.");
      return true;
    } else {
      return false;
    }
  };

  const signUp = () => {
    if (email.indexOf("@") < 0 || email.length < 2 || email.length > 64) {
      setError("Invalid email.");
      return;
    }

    if (
      name.length < 2 ||
      password.length < 2 ||
      bio.length < 2 ||
      username.length < 2
    ) {
      setError("All fields must be at least 2 characters.");
      return;
    }

    if (avatar.length === 0) {
      avatar = `https://picsum.photos/seed/${username}/200/200`;
    }

    const body = {
      name,
      username,
      email,
      bio,
      avatar,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      fetch("/api/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.body.Error) {
            setError(data.body.error);
            return;
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      {error}
      <Stepper
        style={{ background: "transparent" }}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            {error === "" && "Woot! You're all setup and ready to go! 🚀"}
          </Typography>
          {!error && (
            <Link href="/signin">
              <Button className={classes.button}>Sign in</Button>
            </Link>
          )}
        </Paper>
      )}
    </div>
  );
}
