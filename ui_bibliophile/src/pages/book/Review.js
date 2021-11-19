import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import ReviewCard from "../../components/ReviewCard";
import {
  addReview,
  getBookDetails,
  getReview,
} from "../../helpers/BookAPICalles";
import { isAuthenticated } from "../../helpers/AuthHelper";


const useStyle = makeStyles(() => ({
  addReview: {
    border: "1px solid black",
    padding: "25px",
    borderRadius: "5px",
  },
  textfield: {
    marginBottom: "10px",
  },
  reviews: {
    marginTop: "20px",
  },
}));

const Review = ({ bookId, bookAdded}) => {
  const classes = useStyle();

  const [isBookAvailable, setIsBookAvailable] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getBookDetails(bookId).then((res) => {
      if (res) {
        setIsBookAvailable(true);
      }
    });
    getReview(bookId)
      .then((res) => {
        if (res) setReviews(res.reviews);
      })
      .catch((err) => console.log(err));
  }, [bookAdded, bookId]);

  const addComment = (e) => {
    e.preventDefault();
    addReview(bookId, rating, comment).then((res) => {
      if (res.status === "success") {
        getReview(bookId)
          .then((res) => {
            setReviews(res.reviews);
          })
          .catch((err) => console.log(err));
      }
    });
    setRating(0);
    setComment("");
  };

  return (
    <>
      {isBookAvailable && isAuthenticated() && (
        <div className={classes.addReview}>
          <Typography variant="h5">Your Thoughts on this book</Typography>
          <form onSubmit={addComment}>
            <Box component="fieldset" mb={1} borderColor="transparent">
              <Rating
                name="user-rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
            <TextField
              className={classes.textfield}
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </div>
      )}
      <div className={classes.reviews}>
        {reviews.length > 0 && (
          <Typography variant="h5">Book Reviews</Typography>
        )}

        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </>
  );
};

export default Review;
