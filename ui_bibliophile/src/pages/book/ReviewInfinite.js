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
  getReviewByPage,
} from "../../helpers/BookAPICalles";
import { isAuthenticated } from "../../helpers/AuthHelper";
import InfiniteScroll from "react-infinite-scroll-component";

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

const Review = ({ bookId, bookAdded, setStatChanged }) => {
  const classes = useStyle();

  const [isBookAvailable, setIsBookAvailable] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchNext = async () => {
    if (pageNumber <= totalPages || pageNumber === 1) {
      await getReviewByPage(bookId, pageNumber)
        .then((res) => {
          // console.log(res);
          if (res) setReviews([...reviews, ...res.reviews]);
          setPageNumber(pageNumber + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    setReviews([]);
    getBookDetails(bookId).then((res) => {
      if (res) {
        setIsBookAvailable(true);
      }
    });
    fetchNext().then(() => {
      getReview(bookId)
        .then((res) => {
          if (res) setTotalPages(Math.ceil(res.reviews.length / 2));
        })
        .catch((err) => console.log(err));
    });
  }, [bookId, bookAdded]);

  const addComment = (e) => {
    e.preventDefault();
    addReview(bookId, rating, comment).then((res) => {
      if (res.status === "success") {
        getReview(bookId)
          .then((res) => {
            setReviews(res.reviews);
            setStatChanged();
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
        <div>
          <InfiniteScroll
            dataLength={reviews.length}
            next={fetchNext}
            hasMore={true}
            loader={""}
            className={classes.incr}
          >
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Review;
