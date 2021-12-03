import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

import UserCard from "../../components/UserCard";
import { getFriendsHelper } from "../../helpers/ProfileHelper";
import defaultBook from "../../images/default-book.jpg";

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
            {friends ? (
              <>
                <Typography variant="h5" className={classes.title}>
                  Friends
                </Typography>
                <Grid container spacing={1}>
                  {friends.map((user) => {
                    return (
                      <Grid key={user.id} item xs={12} sm={4} md={2}>
                        <UserCard user={user} profile_pic = {user.profile_pic}/>
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            ) : (
              <>
                <div>
                  <img
                    src="http://127.0.0.1:8000/static/images/no_results.png"
                    alt="No Results Found"
                    width="100%"
                    height="600"
                  />
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

  // program to remove duplicate value from an array

  return (
    <div>
      <div>{displayUsers()}</div>
    </div>
  );
};

export default Friends;
