import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {
    // maxHeight: '250px',
  },
  container: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },
  media: {
    paddingTop: "3px",
    width: "auto",
    maxHeight: "150px",
  },
  bookTitle: {
    fontWeight: "bold",
  },
}));

const BookCard = ({ book }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Card className={classes.card}>
      <div className={classes.container}>
        <CardMedia
          image={book.image_link_small}
          component="img"
          className={classes.media}
          title={book.title}
        />
      </div>
      <CardContent>
        <Typography noWrap gutterBottom className={classes.bookTitle}>
          {book.title}
        </Typography>
        {book.googleSearch ? (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
                let title = book.title.split(' ').join('-')
                console.log(title)
                navigate(`/books/${book.id}/${title}`, {
                state: { bookId: book.id, isGoogleSearch: book.googleSearch },
              });
            }}
          >
            Details
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
                let title = book.title.split(' ').join('-')
                console.log(title)
                navigate(`/books/${book.id}/${title}`, {
                  state: { bookId: book.id, isGoogleSearch: book.googleSearch },
                });
            }}
          >
            Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
