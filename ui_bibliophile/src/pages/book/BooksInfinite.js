import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { getAllBooks, getBooksByPage } from "../../helpers/BookAPICalles";
import BookCard from "../../components/BookCard";

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
  incr: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
  books: {
    display: "flex",
    margin: "2% auto",
    alignItems: "flexStart",
  },
}));

const Books = () => {
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchNext = useCallback(async () => {
    if (pageNumber <= totalPages || pageNumber === 1) {
      await getBooksByPage(pageNumber)
        .then((res) => {
          setBooks([...books, ...res]);
          setPageNumber(pageNumber + 1);
        })
        .catch((err) => console.log(err));
    }
  },[pageNumber, books, totalPages]);

  useEffect(() => {
    fetchNext().then(() => {
      getAllBooks()
        .then((res) => {
          setTotalPages(Math.ceil(res.length / 12));
        })
        .catch((err) => console.log(err));
    });
  }, [fetchNext]);

  

  return (
    <Container className={classes.container}>
      <section>
        <Typography variant="h5" className={classes.title}>
          Collection
        </Typography>
        <div className={classes.books}>
          <InfiniteScroll
            dataLength={books.length}
            next={fetchNext}
            hasMore={true}
            loader={""}
            className={classes.incr}
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </Container>
  );
};

export default Books;
