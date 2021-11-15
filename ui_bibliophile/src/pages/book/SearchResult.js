import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import BookCard from "../../components/BookCard";

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

const SearchResult = () => {
  const classes = useStyles();
  const { searchKey } = useParams();
  console.log(searchKey);

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const displayImages = () => {
    console.log(searchResult);
    return (
      <>
        <Container className={classes.container}>
          <section>
            <Typography variant="h5" className={classes.title}>
              Search Result
            </Typography>
            <Grid container spacing={2}>
              {searchResult.map((book) => (
                <Grid key={book.id} item xs={12} sm={4} md={2}>
                  <BookCard
                    book={{
                      id: book.id,
                      image_link_small:
                        book.volumeInfo.imageLinks.smallThumbnail,
                      title: book.volumeInfo.title,
                      googleSearch:true,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </section>
        </Container>
      </>
    );
  };

  useEffect(() => {
    // https://www.googleapis.com/books/v1/volumes?q=harrypotter&download=epub&key=AIzaSyDyxUzn7KYQ1j5_lZIQbz0PUxJrzKFHU2w
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&download=epub&maxResults=12&key=AIzaSyDyxUzn7KYQ1j5_lZIQbz0PUxJrzKFHU2w`;
    axios
      .get(API_URL)
      .then(function (response) {
        console.log(response.data.items);
        setSearchResult(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [searchKey]);

  return (
    <div>
      <div>{displayImages()}</div>
    </div>
  );
};

export default SearchResult;
