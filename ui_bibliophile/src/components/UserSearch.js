import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { getAllUsers } from "../helpers/ProfileHelper";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";

const useStyle = makeStyles((theme) => ({
  search: {
    // margin
  },
  searchField: {
    backgroundColor: "white",
    paddingLeft: "3px",
    borderBottom: "0px",
    border: "1px solid white",
    borderRadius: "3px",
  },
  suggestionDiv: {
    color: "black",
    position: "absolute",
    backgroundColor: "white",
    padding: "10px",
    fontSize: "18px",
    border: "1px solid black",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    width: "100px"
  },
  ss: {
    borderBottom: "1px solid black",
    padding: "5px 2px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d4d4d4",
    },
  },
  anchortag: {
    textDecoration: "none",
  },
}));

const UserSearch = () => {
  const classes = useStyle();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    let text = e.target.value;
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.name.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchKey(text);
  };

  const onSuggestClickHandler = (text) => {
    setSearchKey(text);
    setSuggestions([]);
  };

  const handleSearch = () => {
    // console.log(searchKey);
    try {
      if (searchKey) {
        navigate(`/profile/${searchKey}`, { state: { isProfilePage: true } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearInput = () => {
    setSearchKey("");
  };

  return (
    <div className={classes.search}>
      <TextField
        className={classes.searchField}
        value={searchKey}
        onChange={handleChange}
        placeholder="UserSearch"
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 1000);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {suggestions.length === 0 ? (
                <IconButton onClick={handleSearch}>
                  <SearchOutlined />
                </IconButton>
              ) : (
                <IconButton onClick={clearInput}>
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      {searchKey.length > 0 && (
        <>
          <div className={classes.suggestionDiv}>
            {suggestions.map((suggestion, i) => (
              <>
                <div key={i} className={classes.ss}>
                  <a
                    className={classes.anchortag}
                    href={`http://localhost:3000/profile/${suggestion.public_url}`}
                    // target="_blank"
                  >
                    {suggestion.name}
                  </a>
                </div>
              </>
            ))}
            {/* <div className={classes.ss}>
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <a className={classes.anchortag} href={`#`} target="_blank">
                {searchKey}
              </a>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default UserSearch;
