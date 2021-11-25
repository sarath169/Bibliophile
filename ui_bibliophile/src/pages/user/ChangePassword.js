import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import { changePassword } from "../../helpers/AuthHelper";

const useStyles = makeStyles(() => ({
  card: {
    marginTop: "25px",
    minWidth: "450px",
    padding: "5px",
  },
  avatar: {
    height: "100px",
    width: "100px",
  },
  title: {
    textAlign: "center",
  },
  field: {
    marginTop: "8px",
  },
  resp: {
    display: "block",
    textAlign: "center",
    color: "blue",
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state);
  const [emailError, setEmailError] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);

  const [response, setResponse] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();

    let error = false;

    setEmailError(false);
    setNewPasswordError(false);
    setConfirmNewPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }

    if (newPassword === "") {
      setNewPasswordError(true);
      error = true;
    }

    if (confirmNewPassword === "") {
      setConfirmNewPasswordError(true);
      error = true;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError(true);
      error = true;
    }

    if (!error) {
      changePassword(email, newPassword, confirmNewPassword)
        .then((res) => {
          // console.log(res);
          if (res) {
            setResponse(res.message);
            navigate("/signin", {state: {passwordChnaged: true}});
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} variant="outlined">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar className={classes.avatar} />
            </Box>
            <Typography variant="h4" className={classes.title}>
              Change Password
            </Typography>
            <Typography className={classes.resp}>{response}</Typography>
            <CardContent>
              <form noValidate onSubmit={handleChangePassword}>
                <TextField
                  className={classes.field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  disabled
                  error={emailError}
                  value={email}
                />
                <TextField
                  className={classes.field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  error={newPasswordError}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  className={classes.field}
                  type="password"
                  label="ConfirmPassword"
                  variant="outlined"
                  fullWidth
                  required
                  error={confirmNewPasswordError}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <Button
                  className={classes.field}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChangePassword;
