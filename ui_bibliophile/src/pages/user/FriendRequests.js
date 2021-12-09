import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { getFriendRequests } from "../../helpers/ProfileHelper";
import FriendRequestCard from "../../components/FriendRequestCard";
import FriendRequestsSkeleton from "../../components/Skeleton/FriendRequestsSkeleton";
import noResult from "../../images/no_results.png";

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
  skeletonWraper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

function FriendRequests() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState([]);
  const [requestStatusChanged, setRequestStatusChanged] = useState(false);

  const changeRequestStatus = () => {
    setRequestStatusChanged(!requestStatusChanged);
  };

  useEffect(() => {
    getFriendRequests()
      .then((res) => {
        setLoading(false);
        // console.log(res.pending_requests);
        setFriendRequests(res.pending_requests);
      })
      .catch((err) => console.log(err));
  }, [requestStatusChanged]);

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
                <FriendRequestsSkeleton key={n} />
              ))}
            </div>
          )}
        </div>
        <div>
          <Grid container spacing={2}>
            {friendRequests.length > 0 ? (
              friendRequests.map((user) => (
                <Grid key={user.id} item xs={12} sm={4} md={2}>
                  <FriendRequestCard
                    user={user}
                    changeRequestStatus={changeRequestStatus}
                  />
                </Grid>
              ))):(
                <img
                    src={noResult}
                    alt="No Results Found"
                    width="100%"
                    height="600"
                  />
              )}
          </Grid>
        </div>
      </section>
    </Container>
  );
}

export default FriendRequests;
