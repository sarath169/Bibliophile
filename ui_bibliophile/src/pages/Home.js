import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import BookCard from "../components/BookCard";
import {
  getPopularBooks,
  getTopRatedBooks,
  getRecommendedBooks,
} from "../helpers/BookAPICalles";
import BookSkeleton from "../components/Skeleton/BookSkeleton";
import { isAuthenticated } from "../helpers/AuthHelper";
import defaultBook from '../images/default-book.jpg';

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
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));

const Home = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [popularBooks, setPopularBooks] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const bibId = localStorage.getItem("bib_id");

  useEffect(() => {
    setTimeout(() => {
      getPopularBooks()
        .then((res) => {
          if (res) {
            setLoading(false);
            setPopularBooks(res);
          }
        })
        .catch((err) => console.log(err));

      getTopRatedBooks()
        .then((res) => {
          if (res) {
            setTopRatedBooks(res);
          }
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  useEffect(() => {
    if(bibId){
    isAuthenticated() &&
      getRecommendedBooks()
        .then((res) => {
          console.log(res);
          if (res) {
            setLoading(false);
            setRecommendedBooks(res);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [bibId]);

  return (
    <Container className={classes.container}>
      {isAuthenticated() ? (<section>
        <Typography variant="h5" className={classes.title}>
          Recommendation
        </Typography>
        {loading && (
          <div className={classes.skeletonWraper}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <BookSkeleton key={n} />
            ))}
          </div>
        )}
        <Grid container spacing={2}>
          {recommendedBooks.map((book) => {
            return (
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
            );
          })}
        </Grid>
      </section>) : (<></>)}
      <section>
        <Typography variant="h5" className={classes.title}>
          Popular Books
        </Typography>
        {loading && (
          <div className={classes.skeletonWraper}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <BookSkeleton key={n} />
            ))}
          </div>
        )}
        <Grid container spacing={2}>
          {popularBooks.map((book) => {
            book["googleSearch"] = false;
            return (
              <Grid key={book.id} item xs={12} sm={4} md={2}>
                <BookCard book={book} />
              </Grid>
            );
          })}
        </Grid>
      </section>

      <section>
        <Typography variant="h5" className={classes.title}>
          Top Rated Books
        </Typography>
        {loading && (
          <div className={classes.skeletonWraper}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <BookSkeleton key={n} />
            ))}
          </div>
        )}
        <Grid container>
          {topRatedBooks.map((book) => (
            <Grid key={book.id} item xs={12} sm={4} md={2}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </section>
    </Container>
  );
};

export default Home;
