import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  Typography
} from "@material-ui/core";

const useStyle = makeStyles(()=>({
    select: {
        minWidth: "190px",
        marginBottom: "10px",
    }
}))

const AddBook = () => {
    const classes = useStyle();
    

  return (
    <div>
      <form>
          <Typography variant="body1" color="primary">
              Add this book to your personal collection
            </Typography>
        <FormControl variant="outlined">
          <InputLabel>Add to Shelf</InputLabel>
          <Select
          className={classes.select}
            //   value={}
            //   onChange={}
          >
            <MenuItem value={"RL"}>Read List</MenuItem>
            <MenuItem value={"WL"}>Wish List</MenuItem>
            <MenuItem value={"SL"}>Shelf List</MenuItem>
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
    </div>
  );
};

export default AddBook;
