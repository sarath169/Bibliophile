import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Components/UserContext";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

 // Axios Instance
 const axiosInstance = axios.create({
  baseURL : 'http://127.0.0.1:8000/auth/'
})

function Login() {
  const { user, setUser, token, setToken, userID, setUserID } =
    useContext(UserContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const API_URL = "login/";
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);

      axiosInstance
        .post(API_URL, formdata)
        .then(function (response) {
          console.log(response);
          setToken(response.data.token);
          setUser(username);
          setUserID(response.data.id);
          console.log("entered");
          history.push("/game");
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
        <br/>
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
            Sign in
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
              id="username"
              label="Username"
              name="username"
              autoComplete="fname"
              autoFocus
              onChange={userNameChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordChangeHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                
                  onClick={() => {
                    history.push("/sendotp");
                  }}
                >
                  forgot password?
                </Button>
              </Grid>
              <Button
                onClick={() => {
                  history.push("/signup");
                }}
              >
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
            <br />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                history.push("/");
              }}
            >
              {"Continue without logging in"}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <br/>
        <br/>
      </Container>
    </ThemeProvider>
  );
}
export default Login;
