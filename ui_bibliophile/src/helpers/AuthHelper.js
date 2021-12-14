import axios from "axios";

const API = process.env.REACT_APP_BACKEND;

export const signup = (name, email, password) => {
  // console.log(name, email, password);
  return axios
    .post(`${API}/auth/signup/`, {
      name: name,
      email: email,
      password: password,
      password2: password,
    })
    .then((res) => {
      //console.log("Status:"+JSON.stringify(res))

      if (res.status === 201) {
        return {
          status: "success",
          message: "Account Created",
        };
      } else {
        let msg = res.data.email[0]
          ? res.data.email[0]
          : "Something went wrong. Please try again.";

        return {
          status: "error",
          message: msg,
        };
      }
    })
    .catch((err) => console.log(err));
};

export const sendMail = (email) => {
  return axios
    .post(`${API}/auth/sendotp/`, {
      email: email,
    })
    .then((res) => {
      // console.log("Status:"+JSON.stringify(res))
      if (res.status === 200) {
        return {
          status: "success",
          message: "OTP Sent",
        };
      } else {
        return {
          status: "error",
          message: "Something went worng while sending OTP",
        };
      }
    })
    .catch((err) => console.log(err));
};

export const verifyUser = (email, otp) => {
  return axios
    .post(`${API}/auth/verifyotp/`, {
      email: email,
      otp: otp,
    })
    .then((res) => {
      // console.log("Status:"+JSON.stringify(res))
      if (res.status === 200) {
        return {
          status: "success",
          message: "OTP Verified",
        };
      } else {
        return {
          status: "error",
          message: "Something went worng while verifying OTP",
        };
      }
    })
    .catch((err) => {
      // console.log(err);
      return {
        status: "error",
        message: err.response.data.msg,
      };
    });
};

export const signin = (email, password) => {
  return axios
    .post(`${API}/auth/login/`, {
      email: email,
      password: password,
    })
    .then((res) => {
      // console.log("Status:"+JSON.parse(res));

      if (res.status === 200) {
        // console.log("Login Success")
        localStorage.setItem("bib_token", res.data.token);
        localStorage.setItem("bib_id", res.data.id);
        return {
          status: "success",
          message: "Login Success",
        };
      } else {
        return {
          status: "error",
          message: "Invalid Email or Password",
        };
      }
    })
    .catch((err) => {
      console.log(err.response.status);
      // console.log(err.response.data.msg);
      return {
        status: err.response.status,
        message: err.response.data.msg,
      };
    });
};

export const signout = (next) => {
  const token = localStorage.getItem("bib_token");
  if (isAuthenticated) {
    axios
    .post(`${API}/auth/logout/`,{}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      }
    })
    .then(res=>{
      // console.log(res)
    })
    .catch(err=>console.log(err.response.data.detail))
    localStorage.removeItem("bib_token");
    localStorage.removeItem("bib_id");
    next();
  }
};

export const isAuthenticated = () => {
  if (localStorage.getItem("bib_token") && localStorage.getItem("bib_id")) {
    // console.log(localStorage.getItem("bib_token"));
    // console.log(localStorage.getItem("bib_id"));
    const bib = {
      token: localStorage.getItem("bib_token"),
      id: localStorage.getItem("bib_id"),
    };
    return bib;
  } else {
    return false;
  }
};
export const verifyEmail = (email) => {
  return axios
    .post(`${API}/auth/verifyemail/`, {
      email: email,
    })
    .then((res) => {
      // console.log("Status:"+JSON.stringify(res))
      if (res.status === 200) {
        return {
          status: "success",
          message: "Email Verified",
        };
      } else {
        return {
          status: "error",
          message: "Something went worng while verifying Email",
        };
      }
    })
    .catch((err) => {
      // console.log(err);
      return {
        status: "error",
        message: err.response.data.msg,
      };
    });
};

export const changePassword = (email, newPassword, confirmNewPassword) => {
  return axios
    .post(`${API}/auth/forgotpassword/`, {
      email: email,
      newpassword: newPassword,
      confirmnewpassword: confirmNewPassword,
    })
    .then((res) => {
      if (res.status === 200) {
        return {
          status: "success",
          message: "Password Updated Successfully",
        };
      }
    })
    .catch((err) => {
      return {
        status: "error",
        message: "Something went wrong. Please try again later",
      };
    });
};

export const verifyTokenAndId = () =>{
  const token = localStorage.getItem("bib_token")
  const id = localStorage.getItem("bib_id")
  return axios
    .post(`${API}/auth/verifytoken/`,{
      id: id,
      token: token
    })
    .then(res => {
      return res.status;
    })
    .catch(err => {
      return err.response.status;
    })
}