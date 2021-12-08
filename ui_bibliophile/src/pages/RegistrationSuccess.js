import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./RegistrationSuccess.css";

function RegistrationSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const email = location.state.email;

  return (
    <div className="body">
      <div className="card">
        <div className="cardbody">
          <i className="checkmark i">✓</i>
        </div>
        <h1 className="h1">Registration Successful</h1>
        <p className="p">Please verify your email to login </p>
        <br />
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() =>
            navigate("/verifyuser", {
              state: { email: email, isForgotPassword: false },
            })
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
