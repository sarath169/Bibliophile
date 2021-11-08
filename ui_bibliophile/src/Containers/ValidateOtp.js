import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/auth/",
});

function ValidateOtp(props) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(null);
  const history = useHistory();

  console.log(props);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const otpChangeHandler = (event) => {
    setOtp(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const API_URL = "verifyotp/";
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("otp", otp);
      axiosInstance
        .post(API_URL, formdata)
        .then(function (response) {
          console.log(response);
          history.push("/forgotpassword");
        })
        .catch(function (error) {
          console.log(error);
          history.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="fname"
              autoFocus
              onChange={emailChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="fname"
              autoFocus
              onChange={otpChangeHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Validate
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
export default ValidateOtp;
