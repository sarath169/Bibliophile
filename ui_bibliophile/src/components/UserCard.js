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
  bookTitle: {
    fontWeight: "bold",
  },
}));

const UserCard = ({ user}) => {
  const classes = useStyles();
  const navigate = useNavigate();


  const API = process.env.REACT_APP_BACKEND
  let img_url=""
    if(user.profile_picture){
      img_url = `${API}${user.profile_picture}`;
    } else {
      img_url = defaultUserImage;
    }
  
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
          {user.name}
        </Typography>
        {
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
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
