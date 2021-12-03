import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import { getFriendRequests } from "../../helpers/ProfileHelper";
import FriendRequestCard from "../../components/FriendRequestCard";

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

function FriendRequests() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getFriendRequests()
        .then((res) => {
          setLoading(false);
          console.log(res.pending_requests);
          setFriendRequests(res.pending_requests);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  return (
    <Container className={classes.container}>
      <section>
        <Typography variant="h5" className={classes.title}>
          Pending Requests
        </Typography>
        <div>
          {loading && (
            <div className={classes.skeletonWraper}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Skeleton width={"100%"} height={50} animation="wave" />
              ))}
            </div>
          )}
        </div>
        <Grid container spacing={1}>
          {friendRequests && (friendRequests.map((user) => (
            <Grid key={user.id} item xs={3} sm={4} md={2}>
              <FriendRequestCard user={user} />
            </Grid>
          )))}
        </Grid>
      </section>
    </Container>
  );
}

export default FriendRequests;
