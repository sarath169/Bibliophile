import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { addBook, isBookInShelf } from "../helpers/BookAPICalles";

const useStyle = makeStyles(() => ({
  select: {
    minWidth: "180px",
    marginBottom: "10px",
  },
}));

const AddBook = (props) => {
  const classes = useStyle();
  const userId = localStorage.getItem("bib_id");
  const bookId = props.bookId;
  // const seoId = props.seoId;
  const [listType, setListType] = useState("");
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    isBookInShelf(userId, bookId)
      .then((res) => {
        setShowForm(!res);
      })
      .catch((err) => console.log(err));
  }, [userId, bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addBook(bookId, listType)
      .then((res) => {
        // console.log(res.status);
        if (res.status === "success") {
          setShowForm(false);
          props.setBookAdded();
        } else {
          console.log(res);
          console.log("failed to add");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <Typography variant="body1" color="primary">
            Add this book to your personal collection
          </Typography>
          <FormControl variant="outlined">
            <InputLabel>Add to Shelf</InputLabel>
            <Select
              className={classes.select}
              value={listType}
              onChange={(e) => setListType(e.target.value)}
              required
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="RL">Read List</MenuItem>
              <MenuItem value="WL">Wish List</MenuItem>
              <MenuItem value="SL">Shelf List</MenuItem>
            </Select>
          </FormControl>
          <Button
            // className={classes.field}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Add
          </Button>
        </form>
      ) : (
        <>
        {props.setBookAdded}
        <Typography variant="body1" color="secondary">
          {/* This book is available in your collection. */}
        </Typography>
        </>
      )}
    </div>
  );
};

export default AddBook;
