import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import ClosedCaptionOutlinedIcon from "@material-ui/icons/ClosedCaptionOutlined";
import {
  getBookDetails,
  getBookStatistics,
  getGoogleBookDetails,
} from "../../helpers/BookAPICalles";
import { isAuthenticated } from "../../helpers/AuthHelper";
import AddBook from "../../components/AddBook";
import Review from "./ReviewInfinite";
import defaultBookCover from "../../images/default-book.jpg";
import SocialShare from "../../components/SocialShare";
import GroupIcon from "@material-ui/icons/Group";
import RateReviewIcon from "@material-ui/icons/RateReview";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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
  bookImage: {
    height: "100%",
    width: "100%",
  },
  title: {
    margin: "20px 0px",
    textAlign: "center",
  },
  bookDetails: {
    "& p": {
      marginTop: "3px",
    },
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
  linkIcon: {
    marginRight: "5px",
  },
  description: {
    textAlign: "justify",
  },
  socialshare: {
    textAlign: "justify",
    paddingTop: "10px",
  },
  review: {
    marginTop: "10px",
  },
  stat: {
    textAlign: "justify",
  },
}));

const BookDetails = () => {
  const classes = useStyles();
  const { seoId } = useParams();
  //   console.log(seoId, "seoId");
  const bookId = seoId.split("id-").slice(-1)[0];

  const [bookDetails, setBookDetails] = useState([]);
  const [bookStat, setBookStat] = useState({});
  const [bookAdded, setBookAdded] = useState(false);
  const [statChanged, setStatChanged] = useState(false);

  //   console.log(bookId, "bookId")

  function handleBookAdded() {
    setBookAdded(true);
    changeStatistics();
  }

  function changeStatistics() {
    setStatChanged(!statChanged);
  }

  useEffect(() => {
    if (bookId) {
      getBookDetails(bookId)
        .then((res) => {
          if (res) {
            setBookDetails(res);
          } else {
            getGoogleBookDetails(bookId)
              .then((res) => {
                setBookDetails(res);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [bookId, seoId]);

  useEffect(() => {
    getBookStatistics(bookId)
      .then((res) => {
        setBookStat(res);
      })
      .catch((err) => console.log(err));
  }, [bookId, statChanged]);

  let details = String(bookDetails.description).replace(/(<([^>]+)>)/gi, "");

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <div>
            {bookDetails.image_link_small ? (
              <img
                src={bookDetails.image_link_small}
                alt={bookDetails.title}
                className={classes.bookImage}
              />
            ) : (
              <img
                src={defaultBookCover}
                alt={bookDetails.title}
                className={classes.bookImage}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.bookDetails}>
            <Typography variant="h4"> {bookDetails.title} </Typography>
            <br />
            <div>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <AccountCircleOutlinedIcon className={classes.linkIcon} />{" "}
                Author: {bookDetails.author}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <PublicOutlinedIcon className={classes.linkIcon} /> Publisher:{" "}
                {bookDetails.publisher}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <MenuBookOutlinedIcon className={classes.linkIcon} /> Page
                Count: {bookDetails.page_count}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <ClosedCaptionOutlinedIcon className={classes.linkIcon} />{" "}
                Language: {bookDetails.language}
              </Typography>
            </div>
            <div><Typography className={classes.description}>{details}</Typography></div>
            <Typography className={classes.socialshare}>
              <SocialShare
                url={`https://7958-2405-201-c009-f05c-ebd0-c730-312-96a0.ngrok.io/books/${seoId}`}
              />
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>
            <p className={classes.stat}>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <GroupIcon className={classes.linkIcon} />{" "}
                {bookStat.book_shelf_count} People has this book in their shelf
              </Typography>
            </p>
            <p className={classes.stat}>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <RateReviewIcon className={classes.linkIcon} />{" "}
                {bookStat.review_count} People reviewd this book
              </Typography>
            </p>
            <p className={classes.stat}>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <StarBorderIcon className={classes.linkIcon} />{" "}
                {bookStat.five_Start_review_count} Five start rating
              </Typography>
            </p>
          </div>
          {isAuthenticated() && (
            <AddBook
              bookId={bookId}
              seoId={seoId}
              setBookAdded={handleBookAdded}
            />
          )}
        </Grid>
      </Grid>
      <div className={classes.review}>
        {/* {isAuthenticated() && <Review bookId={bookId} bookAdded={bookAdded} />} */}
        {bookId && <Review bookId={bookId} bookAdded={bookAdded} setStatChanged={changeStatistics} />}
      </div>
    </Container>
  );
};

export default BookDetails;
