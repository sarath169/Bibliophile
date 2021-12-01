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
import { acceptFriendRequestHelper, rejectFriendRequestHelper } from "../helpers/ProfileHelper";

const useStyles = makeStyles(() => ({
  card: {
    width: "175px",
    alignSelf: "auto",
    marginTop: "20px",
    marginLeft: "15px",
    flexgrow: 1,
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
    maxHeight: "150px",
  },
  bookTitle: {
    fontWeight: "bold",
  },
}));

const UserCard = ({ user }) => {
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

  return (
    <Card className={classes.card}>
      <div className={classes.container}>
        <CardMedia
          image={user.profile_picture}
          component="img"
          className={classes.media}
          title={user.name}
        />
      </div>
      <CardContent>
        <Typography noWrap gutterBottom className={classes.bookTitle}>
          {user.name}
        </Typography>
        {
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              //   console.log(seoId);
              navigate(`/profile/${user.public_url}`);
            }}
          >
            Details
          </Button>
        }
        {
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              acceptFriendRequest(user.request_id);
            }}
          >
            Accept
          </Button>
        }
        {
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              rejectFriendRequest(user.request_id);
            }}
          >
            Reject
          </Button>
        }
      </CardContent>
    </Card>
  );
};

export default UserCard;
