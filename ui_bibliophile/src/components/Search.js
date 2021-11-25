import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  searchField: {
    backgroundColor: "white",
    paddingLeft: "3px",
    borderBottom: "0px",
    border: "1px solid white",
    borderRadius: "3px",
  },
}));

const Search = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  console.log("search.js")

  const [searchKey, setSearchKey] = useState("");

  const handleSearch = () => {
    // console.log(searchKey);
    try {
      if (searchKey) {
        navigate(`/search/${searchKey}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TextField
      className={classes.searchField}
      value={searchKey}
      onChange={(e) => setSearchKey(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
