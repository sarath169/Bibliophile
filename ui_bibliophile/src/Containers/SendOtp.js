import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Components/UserContext"

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/auth/",
});

const theme = createTheme();

function SendOtp() {
  const [email, setEmail] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const history = useHistory();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const API_URL = "sendotp/";
      const formdata = new FormData();
      formdata.append("email", email);

      axiosInstance
        .post(API_URL, formdata)
        .then(function (response) {
          console.log(response);
          history.push({
            pathname: "/validateotp",
            state : {email : email}
          });
        })
        .catch(function (error) {
          console.log(error);
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
            Find Account
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
              autoComplete="fname"
              autoFocus
              onChange={emailChangeHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Recieve OTP
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default SendOtp;
