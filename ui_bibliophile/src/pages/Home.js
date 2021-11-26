import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import BookCard from "../components/BookCard";
import { getPopularBooks, getTopRatedBooks } from "../helpers/BookAPICalles";
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
  skeletonWraper:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
}));

const Home = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [popularBooks, setPopularBooks] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);

  useEffect(() => {
    setTimeout(()=>{
      getPopularBooks()
        .then((res) => {
          setLoading(false);
          setPopularBooks(res);
        })
        .catch((err) => console.log(err));
  
      getTopRatedBooks()
        .then((res) => setTopRatedBooks(res))
        .catch((err) => console.log(err));
    }, 5000)
  }, []);

  return (
    <Container className={classes.container}>
      <section>
        <Typography variant="h5" className={classes.title}>
          Popular Books
        </Typography>
        {
          loading && (
            <div className={classes.skeletonWraper}>
              {[1,2,3,4,5,6].map((n)=> <BookSkeleton key={n} />)}
            </div>
          )
        }
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
        {
          loading && (
            <div className={classes.skeletonWraper}>
              {[1,2,3,4,5,6].map((n)=> <BookSkeleton key={n} />)}
            </div>
          )
        }
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
