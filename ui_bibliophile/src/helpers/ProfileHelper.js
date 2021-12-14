import axios from "axios";

const API = process.env.REACT_APP_BACKEND;

export const getProfile = (publicUrl) => {
  return axios
    .get(`${API}/auth/public/profile/${publicUrl}/`)
    .then((res) => {
      // console.log(res)
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProfileById = (userId) => {
  const token = localStorage.getItem("bib_token");
  return axios
    .get(`${API}/auth/profile/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log(err.response.status);
      return err.response.status;
    });
};

export const getProfileUrl = async (userId) => {
  const data = await getProfile(userId);
  let url = data.public_url;
  // console.log(url);
  return url;
};

export const getUersReview = (userId) => {
  return axios
    .get(`${API}/book/review/user/${userId}/`)
    .then((res) => {
      // console.log(res.data.reviews);
      return res.data.reviews;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUersPagedReview = (userId, pageNumber) => {
  return axios
    .get(`${API}/book/review/paged/user/${userId}/?page=${pageNumber}`)
    .then((res) => {
      // console.log(res.data.reviews);
      return res.data.reviews;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUser = (name, url, description) => {
  // console.log(name, email, password);
  const token = localStorage.getItem("bib_token");
  return axios
    .put(
      `${API}/auth/profile/`,
      {
        name: name,
        public_url: url,
        description: description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      //console.log("Status:"+JSON.stringify(res))
      // console.log(res);

      if (res.status === 200) {
        return {
          status: "success",
          message: res.data.public_url,
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
    .catch((err) => {
      // console.log(err.response.status);
      if (err.response.status === 400) {
        return {
          status: 400,
          message: "Profile URL not Available. Use a different URL",
        };
      }
    });
};

export const uploadProfilePicture = (formData) => {
  const token = localStorage.getItem("bib_token");
  return axios
    .put(`${API}/auth/profile/`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded / progressEvent.total);
      },
    })
    .then((res) => {
      // console.log(res)
      res.data.profile_picture = `${API}${res.data.profile_picture}`;
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePassword = (oldPassword, newPassword) => {
  const token = localStorage.getItem("bib_token");
  return axios
    .put(
      `${API}/auth/profile/updatepassword/`,
      {
        old_password: oldPassword,
        new_password: newPassword
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        return {
          status: "success",
          message: "Password Updated Successfully",
        };
      }
    })
    .catch(err => {
      return {
        status: "error",
        message: err.response.data.msg,
      };
    })
}

export const getAllUsers = () => {
    return axios
        .get(`${API}/auth/getallusers/`)
        .then(res => {
//             console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getUserSearchResults = (searchKey) => {
  const API_URL = `${API}/auth/getuserresults/${searchKey}`;
  return axios
    .get(API_URL)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
      return;
    });
};

export const sendFriendRequestHelper = (userId) => {
  const token = localStorage.getItem("bib_token");
  const API_URL = `${API}/friend/sendfriendrequest/${userId}/`;
  return axios
    .get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
//       console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return;
    });
};

export const getRequestdUsersHelper = () => {
  const token = localStorage.getItem("bib_token");
  const API_URL = `${API}/friend/requestedusers/`;
  return axios
    .get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
//       console.log(res.data.requested_users);
      return res.data.requested_users;
    })
    .catch((err) => {
      return;
    });
};

export const getFriendRequests = () => {
  const token = localStorage.getItem("bib_token");
  const API_URL = `${API}/friend/getallfriendrequests/`;
  return axios
    .get(API_URL,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
//       console.log(res);
      return res.data;
    })
    .catch((err) => {
      return;
    });
};

export const acceptFriendRequestHelper = (requestId) => {
  const token = localStorage.getItem("bib_token");
  const API_URL = `${API}/friend/acceptfriendrequest/${requestId}/`
  return axios
    .get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
//       console.log(res);
      return res.msg;
    })
    .catch((err) => {
      return;
    });
};

export const rejectFriendRequestHelper = (requestId) => {
  const token = localStorage.getItem("bib_token");
  const API_URL = `${API}/friend/rejectfriendrequest/${requestId}/`
  return axios
    .get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
//       console.log(res);
      return res.msg;
    })
    .catch((err) => {
      return;
    });
};

export const cancelFriendRequestHelper = (requestId) => {
  const token = localStorage.getItem("bib_token");
  const API_URL = `${API}/friend/cancelrequest/${requestId}/`
  return axios
    .get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
//       console.log(res.data);
      return res.data.msg;
    })
    .catch((err) => {
      console.log(err.response)
      return;
    });
};

export const unfriendRequestHelper = (removeeId) => {
  const token = localStorage.getItem("bib_token");
  const API_URL = `${API}/friend/unfriend/${removeeId}/`
  return axios
    .get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
//       console.log(res);
      return res.msg;
    })
    .catch((err) => {
      return;
    });
};

export const getFriendsHelper = () => {
  const token = localStorage.getItem("bib_token");
  const API_URL = `${API}/friend/getfriends/`
  return axios
    .get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
//       console.log(res);
      return res.data.friends;
    })
    .catch((err) => {
      return;
    });
};