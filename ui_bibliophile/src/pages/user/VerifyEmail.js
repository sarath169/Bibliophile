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
import { verifyEmail, isAuthenticated } from "../../helpers/AuthHelper";

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

const VerifyEmail = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state);
  const [emailError, setEmailError] = useState(false);
  const [response, setResponse] = useState("");

  if (isAuthenticated()) {
    console.log("Authenticated");
    navigate("/");
    // return null;
  }

  const handleEmailCheck = (e) => {
    e.preventDefault();

    setEmailError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (email) {
      verifyEmail(email)
        .then((res) => {
          if (res.status === "success") {
            navigate("/verifyuser", {
              state: { email: email, isForgotPassword: true },
            });
          } else {
            setResponse("Invaild Email");
          }
        })
        .catch((err) => console.log(err));
    }
    // setEmail('');
    // setOTP('');
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card} variant="outlined">
            <Typography variant="h4" className={classes.title}>
              Please Verify Your Email
            </Typography>
            {/* <Typography variant="caption" className={classes.subtitle}>
                        
                    </Typography> */}
            <Typography className={classes.resp}>{response}</Typography>
            <CardContent>
              <form noValidate onSubmit={handleEmailCheck}>
                <TextField
                  className={classes.field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  error={emailError}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className={classes.field}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Verify
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VerifyEmail;
