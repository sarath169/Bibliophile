import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { getAllBooks } from "../../helpers/BookAPICalles";
import BookCard from "../../components/BookCard";
import BookSkeleton from "../components/Skeleton/BookSkeleton";


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

const Books = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getAllBooks()
        .then((res) => {
          setLoading(false);
          setBooks(res);
        })
        .catch((err) => console.log(err));
    }, 5000);
  }, []);

  return (
    <Container className={classes.container}>
      <section>
        <Typography variant="h5" className={classes.title}>
          Collection
        </Typography>
        <div>
          {loading && (
            <div className={classes.skeletonWraper}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                <BookSkeleton key={n} />
              ))}
            </div>
          )}
        </div>
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid key={book.id} item xs={12} sm={4} md={2}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </section>
    </Container>
  );
};

export default Books;
