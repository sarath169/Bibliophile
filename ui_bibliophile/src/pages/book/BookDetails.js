import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import ClosedCaptionOutlinedIcon from "@material-ui/icons/ClosedCaptionOutlined";
import {
  getBookDetails,
  getGoogleBookDetails,
} from "../../helpers/BookAPICalles";
import { isAuthenticated } from "../../helpers/AuthHelper";
import AddBook from "../../components/AddBook";
import Review from "./Review";

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
  review: {
    marginTop: "10px",
  },
}));

const BookDetails = () => {
  const default_cover_image =
    "http://127.0.0.1:8000/static/images/CoverNotFound2.jpg";
  const classes = useStyles();
  const { seoId } = useParams();
  //   console.log(seoId, "seoId");
  const bookId = seoId.split("id-").slice(-1)[0];

  const [bookDetails, setBookDetails] = useState([]);
  const [bookAdded, setBookAdded] = useState(false);
  //   console.log(bookId, "bookId")

  function handleBookAdded() {
    setBookAdded(true);
  }

  useEffect(() => {
    if (bookId) {
      getBookDetails(bookId)
        .then((res) => {
          if (res) {
            // console.log(res, "local book details");
            // console.log("local book details");
            setBookDetails(res);
          } else {
            getGoogleBookDetails(bookId)
              .then((res) => {
                // console.log(res, "google book details");
                // console.log("google book details");
                setBookDetails(res);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [seoId, bookId]);

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
                src={default_cover_image}
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
            <p>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <AccountCircleOutlinedIcon className={classes.linkIcon} />{" "}
                Author: {bookDetails.author}
              </Typography>
            </p>
            <p>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <PublicOutlinedIcon className={classes.linkIcon} /> Publisher:{" "}
                {bookDetails.publisher}
              </Typography>
            </p>
            <p>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <MenuBookOutlinedIcon className={classes.linkIcon} /> Page
                Count: {bookDetails.page_count}
              </Typography>
            </p>
            <p>
              <Typography variant="subtitle1" className={classes.wrapIcon}>
                <ClosedCaptionOutlinedIcon className={classes.linkIcon} />{" "}
                Language: {bookDetails.language}
              </Typography>
            </p>
            <Typography className={classes.description}>{details}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
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
        <Review bookId={bookId} bookAdded={bookAdded} />
      </div>
    </Container>
  );
};

export default BookDetails;
