import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Card,
  CardContent,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { verifyUser, isAuthenticated } from "../../helpers/AuthHelper";

const useStyle = makeStyles((theme) => ({
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
  subtitle: {
    paddingLeft: "20px",
  },
  field: {
    marginTop: "8px",
  },
  resp: {
    display: "block",
    textAlign: "center",
    color: "red",
  },
}));

const VerifyUser = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state.email);
  const [emailError, setEmailError] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [response, setResponse] = useState("");

  if (isAuthenticated()) {
    console.log("Authenticated");
    navigate("/");
    // return null;
  }

  const handleSignIn = (e) => {
    e.preventDefault();

    setEmailError(false);
    setOtpError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (otp === "") {
      setOtpError(true);
    }
    if (location.state.isForgotPassword) {
        if (email && otp) {
            verifyUser(email, otp)
              .then((res) => {
                if (res.status === "success") {
                  navigate("/changepassword", {state: email});
//             .then(res => {
//                 if(res.status === 'success'){
//                     // alert("Your account is verified successfully. Please login to continue")
//                     navigate("/signin", {state:{accountVerified: true}});
                } else {
                  setResponse("Invalid OTP");
                }
              })
              .catch((err) => console.log(err));
          }
        }
    else{
      if (email && otp) {
        verifyUser(email, otp)
          .then((res) => {
            if (res.status === "success") {
              // alert(
              //   "Your account is verified successfully. Please login to continue"
              // );
              navigate("/signin", {state: {email:email, accountVerified: true}});
            } else {
              setResponse("Invalid OTP");
            }
          })
          .catch((err) => console.log(err));
      }
    }
    // setEmail('');
    // setOTP('');
  };

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6} md={4} >
                    <Card className={classes.card} variant="outlined">
                        
                        <Typography variant="h4" className={classes.title}>
                            Please Verify Your Account
                        </Typography>
                        <Typography variant="caption" className={classes.subtitle}>
                            Check your registerd email for the OTP
                        </Typography>
                        <Typography className={classes.resp}>{response}</Typography>
                        <CardContent>
                            <form noValidate onSubmit={handleSignIn}>
                                <TextField
                                    className={classes.field}
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    disabled
                                    error={emailError}
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                                <TextField
                                    className={classes.field}
                                    type="text"
                                    label="OTP"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    error={otpError}
                                    value={otp}
                                    onChange={(e)=>setOTP(e.target.value)}
                                />
                                <Button
                                    className={classes.field}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >Verify</Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
  );
};

export default VerifyUser;
