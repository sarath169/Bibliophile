import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

import UserCard from "../../components/UserCard";
import { getUserSearchResults } from "../../helpers/ProfileHelper";
import noBook from "../../images/no_results.png";

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

const UserResults = () => {
  const classes = useStyles();
  const { searchKey } = useParams();

  const [searchResult, setSearchResult] = useState([]);


  useEffect(() => {
    getUserSearchResults(searchKey)
      .then((res) => {
        setSearchResult(res);
      })
      .catch((err) => console.log(err));
  }, [searchKey]);

  return (
    <Container className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        Search Result
      </Typography>
      {searchResult.length > 0 ? (
        <Grid container spacing={1}>
          {searchResult.map((user) => {
            return (
              <Grid key={user.id} item xs={12} sm={4} md={2}>
                <UserCard user={user} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div>
          <img
            src={noBook}
            alt="No Results Found"
            width="100%"
            height="600"
          />
        </div>
      )}
    </Container>
  );
};

export default UserResults;
