import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Description, Email } from "@material-ui/icons";
import {
  acceptFriendRequestHelper,
  rejectFriendRequestHelper,
} from "../helpers/ProfileHelper";
import "./FriendRequestCard.css";

const useStyles = makeStyles(() => ({
  card: {
    display: "inline-block",
    flexdirection: "row",
    width: "100%",
    alignSelf: "auto",
    marginTop: "20px",
    marginLeft: "15px",
    // flexgrow: 1,
    verticalAlign: "middle",
  },
  container: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },
  media: {
    paddingTop: "3px",
    width: "auto",
    maxHeight: "100px",
  },
  bookTitle: {
    fontWeight: "bold",
  },
}));

const FriendRequestCard = ({ user }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  //   Email, name, profile_picture, public_url, Description, friends.

  if (!user.profile_picture) {
    user.profile_picture = "http://127.0.0.1:8000/static/images/default.jpg";
  }

  const acceptFriendRequest = (requestId) => {
    acceptFriendRequestHelper(requestId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectFriendRequest = (requestId) => {
    rejectFriendRequestHelper(requestId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewDetails = () => {
    navigate("/profile/Sarath.Chandra.Rayala.1638436931");
  };

  return (
    <>
      <div className="courses-container">
        <div className="course">
          <div className="course-preview">
            <img
            className="profile-pic"
              src={user.profile_picture}
              alt="Profile Pic"
              width="100"
              height="100"
            />
          </div>
          <div className="course-info">
            <h2> <a href={`http://localhost:3000/profile/${user.public_url}`} className='a-name'>{user.name}</a></h2>
            <button
              className="btn"
              onClick={() => {
                acceptFriendRequest(user.request_id);
              }}
            >
              Accept
            </button>
            <button
              className="btn"
              onClick={() => {
                rejectFriendRequest(user.request_id);
              }}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequestCard;
