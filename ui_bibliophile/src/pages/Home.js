import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import BookCard from "../components/BookCard";
import { getPopularBooks, getTopRatedBooks, getLatestReview } from "../helpers/BookAPICalles";
import BookSkeleton from "../components/Skeleton/BookSkeleton";
import ReviewCardSmall from "../components/ReviewCardSmall";

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
  },
  reviews:{
    
  },
  reviewTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '15px',
    display: 'block',
    backgroundColor: '#dedede',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    padding: '5px 0px',
    marginBottom: '5px',
  }
}));

const Home = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [popularBooks, setPopularBooks] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      getPopularBooks()
        .then((res) => {
          if(res){
            setLoading(false);
            setPopularBooks(res);
          }
        })
        .catch((err) => console.log(err));
  
      getTopRatedBooks()
        .then((res) => {
          if(res){
            setTopRatedBooks(res)
          }
        })
        .catch((err) => console.log(err));

        getLatestReview()
        .then((res) => {
          if(res){
            setReviews(res);
          }
        })
        .catch((err) => console.log(err));
  }, []);

  return (
    <Container className={classes.container}>
      <Grid container spacing={1}>
        <Grid item lg={10}>
      <section>
        <Typography variant="h5" className={classes.title}>
          Popular Books
        </Typography>
        {
          loading && (
            <div className={classes.skeletonWraper}>
              {[1,2,3,4,5].map((n)=> <BookSkeleton key={n} />)}
            </div>
          )
        }
        <Grid container spacing={2}>
          {popularBooks.map((book) => {
            book["googleSearch"] = false;
            return (
              <Grid key={book.id} item xs={12} sm={3} >
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
              {[1,2,3,4,5].map((n)=> <BookSkeleton key={n} />)}
            </div>
          )
        }
        <Grid container>
          {topRatedBooks.map((book) => (
            <Grid key={book.id} item xs={12} sm={3}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </section>
      </Grid>
        <Grid item lg={2}>
          <div className={classes.reviews}>
            <label className={classes.reviewTitle}>
              Review Feed
            </label>
            {
              reviews.map((review, index) => (
                <ReviewCardSmall key={index} review={review} />
              ))
            }
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
