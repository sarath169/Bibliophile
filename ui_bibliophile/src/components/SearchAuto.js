import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { getAllBooks } from "../helpers/BookAPICalles";

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
  suggestionDiv:{
    color: 'black',
    position: 'absolute',
    backgroundColor: 'white',
    padding: '10px',
    fontSize: '18px',
    border: '1px solid black',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px'
  },
  ss:{
    borderBottom: '1px solid black',
    padding: '5px 2px',
    cursor: 'pointer',
    "&:hover":{
      backgroundColor: '#d4d4d4',
    }
  }
}));

const SearchAuto = () => {
  const classes = useStyle();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{
    getAllBooks()
        .then((res)=>{
            setBooks(res);
        })
        .catch(err => console.log(err))
  },[])

  const handleChange = (e) => {
    let text = e.target.value;
    let matches = []
    if (text.length >0){
      matches = books.filter(book => {
        const regex = new RegExp(`${text}`, "gi");
        return book.title.match(regex)
      })
    }
    setSuggestions(matches);
    setSearchKey(text);
  }

  const onSuggestClickHandler = (text) => {
    setSearchKey(text);
    setSuggestions([]);
    handleSearch(text);
  }

  const handleSearch = (searchText = "") => {
    let searchItem = searchKey;
    if (searchText.length > searchKey.length){
      searchItem = searchText
    }
    try {
      if (searchItem!=="") {
        navigate(`/search/${searchItem}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.search}>
      <TextField
        className={classes.searchField}
        value={searchKey}
        onChange={handleChange}
        onBlur={()=>{
          setTimeout(() => {
            setSuggestions([])
          }, 1000);
        }}
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
      {suggestions.length > 0 &&(
      <div className={classes.suggestionDiv}>
         {suggestions.map((suggestion, i) => (
          <div key={i} className={classes.ss}
            onClick={()=>onSuggestClickHandler(suggestion.title)}
          >{suggestion.title}</div>
        ))}
      </div>
      )}
    </div>
  );
};

export default SearchAuto;
