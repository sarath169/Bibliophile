import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';

import UserCard from "../../components/UserCard";
import { getFriendsHelper } from "../../helpers/ProfileHelper";


const useStyles = makeStyles(() => ({
  container: {
    marginTop: "20px",
    "& section": {
      backgroundColor: "#f2f2f2",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "5px",
    },
  },
  title: {
    padding: "3px",
    margin: "20px 0px",
    textAlign: "center",
    backgroundColor: "white",
  },
  notfound:{
    textAlign: 'center',
  },
  peopleicon:{
    height: '150px',
    width: '150px',
  }
}));

const Friends = () => {
  const classes = useStyles();

  const [friends, setFriends] = useState([]);
  const displayUsers = () => {
    console.log(friends);

    return (
      <>
        <Container className={classes.container}>
          <section>
            {/* {console.log(searchResult)} */}
            <Typography variant="h5" className={classes.title}>
              Friends
            </Typography>
            {friends.length > 0 ? (
              <>
                <Grid container spacing={1}>
                  {friends.map((user) => {
                    return (
                      <Grid key={user.id} item xs={12} sm={4} md={2}>
                        <UserCard user={user} />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            ) : (
              <>
                <div className={classes.notfound}>
                  <PeopleIcon size="large" color="primary" className={classes.peopleicon}/>
                  <Typography variant="h6">No friends available</Typography>
                </div>
              </>
            )}
          </section>
        </Container>
      </>
    );
  };

  useEffect(() => {
    getFriendsHelper()
      .then((res) => setFriends(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>{displayUsers()}</div>
    </div>
  );
};

export default Friends;
