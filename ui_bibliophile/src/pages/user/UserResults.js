import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';

import UserCard from "../../components/UserCard";
import { getUserSearchResults } from "../../helpers/ProfileHelper";

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
         <div className={classes.notfound}>
                  <PeopleIcon size="large" color="primary" className={classes.peopleicon}/>
                  <Typography variant="h6">No user available</Typography>
                </div>
        </div>
      )}
    </Container>
  );
};

export default UserResults;
