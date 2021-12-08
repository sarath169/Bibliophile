import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
    acceptFriendRequestHelper,
    rejectFriendRequestHelper,
  } from "../helpers/ProfileHelper";
import defaultUserImage from "../images/user.png";

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
  link: {
    display: "block",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
  },
  button: {
    marginBottom: "3px",
  },
}));

const FriendRequestCard = ({ user, changeRequestStatus }) => {
  const classes = useStyles();

  const API = process.env.REACT_APP_BACKEND;
  let img_url = "";
  if (user.profile_picture) {
    img_url = `${API}${user.profile_picture}`;
  } else {
    img_url = defaultUserImage;
  }

  const acceptFriendRequest = (requestId) => {
    acceptFriendRequestHelper(requestId)
      .then((res) => {
        console.log(res);
        changeRequestStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectFriendRequest = (requestId) => {
    rejectFriendRequestHelper(requestId)
      .then((res) => {
        console.log(res);
        changeRequestStatus();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card className={classes.card}>
      <div className={classes.container}>
        <CardMedia
          image={img_url}
          component="img"
          className={classes.media}
          title={user.name}
        />
      </div>
      <CardContent>
        <Typography noWrap gutterBottom className={classes.bookTitle}>
          <Link to={`/profile/${user.public_url}`} className={classes.link}>
            {user.name}
          </Link>
        </Typography>
        {
          <Button
            className={classes.button}
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
            className={classes.button}
            variant="outlined"
            color="secondary"
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

export default FriendRequestCard;
