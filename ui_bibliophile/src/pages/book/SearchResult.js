import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

import BookCard from "../../components/BookCard";
import { getSearchResults } from "../../helpers/BookAPICalles";
import defaultBook from "../../images/default-book.jpg";
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

const SearchResult = () => {
  const classes = useStyles();
  const { searchKey } = useParams();

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getSearchResults(searchKey)
      .then((res) => setSearchResult(res))
      .catch((err) => console.log(err));
  }, [searchKey]);

  return (
      <Container className={classes.container}>
          <section>
            {/* {console.log(searchResult)} */}
            {searchResult.length > 0 ? (
              <>
                <Typography variant="h5" className={classes.title}>
                  Search Result
                </Typography>
                <Grid container spacing={1}>
                  {searchResult.map((book) => (
                    <Grid key={book.id} item xs={12} sm={4} md={2}>
                      <BookCard
                        book={{
                          id: book.id,
                          image_link_small: book.volumeInfo.imageLinks
                            ? book.volumeInfo.imageLinks.smallThumbnail
                            : defaultBook,
                          title: book.volumeInfo.title,
                          googleSearch: true,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <>
                <div>
                  <img
                    src={noBook}
                    alt="No Results Found"
                    width="100%"
                    height="600"
                  />
                </div>
              </>
            )}
          </section>
        </Container>
  );
};

export default SearchResult;
