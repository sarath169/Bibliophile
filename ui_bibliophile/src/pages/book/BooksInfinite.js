import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { getAllBooks, getBooksByPage } from "../../helpers/BookAPICalles";
import BookCard from "../../components/BookCard";
import BookSkeleton from "../../components/Skeleton/BookSkeleton";

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
  skeletonWraper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));

const Books = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchNext = async () => {
    if (pageNumber <= totalPages || pageNumber === 1) {
      setLoading(true);
      await getBooksByPage(pageNumber)
        .then((res) => {
          setTimeout(()=>{
            setLoading(false);
            setBooks([...books, ...res]);
            setPageNumber(pageNumber + 1);
          },5000)
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
      fetchNext().then(() => {
        getAllBooks()
          .then((res) => {
            setTotalPages(Math.ceil(res.length / 12));
          })
          .catch((err) => console.log(err));
      });
  }, []);

  const MultipleBookSkeleton = () => {
    return (
      <div className={classes.skeletonWraper}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
          <BookSkeleton key={n} />
        ))}
      </div>
    );
  };

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
        <div>{loading && <MultipleBookSkeleton />}</div>
      </section>
    </Container>
  );
};

export default Books;
