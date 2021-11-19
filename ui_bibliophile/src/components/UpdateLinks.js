import React from "react";
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  link:{
    textDecoration: 'none',
    fontSize: '18px',
    color: 'blue',

  }
}));

const UpdateLinks = () => {
  const classes = useStyles();
  return (
    <div className={classes.menu}>
      <Typography variant="h6" className={classes.title}>
        Update Information
      </Typography>
      <List>
        <ListItem>
          <Link to="/profile/updateinfo" className={classes.link}>Personal Info</Link>
        </ListItem>
        <ListItem>
            <Link to="/profile/updatepicture" className={classes.link}>Profile Picture</Link>
        </ListItem>
        <ListItem>
            <Link to="/profile/updatepassword" className={classes.link}>Password</Link>
        </ListItem>
      </List>
    </div>
  );
};

export default UpdateLinks;
