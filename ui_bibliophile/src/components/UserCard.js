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

const UserCard = ({ user, profile_pic}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  console.log(user)
  console.log(profile_pic)

  //   Email, name, profile_picture, public_url, Description, friends.

  // if (!user.profile_picture){
  //     user.profile_picture = "http://127.0.0.1:8000/static/images/default.jpg"
  // }
  
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
      </CardContent>
    </Card>
  );
};

export default UserCard;
