import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { getAllBooks, getSearchResults } from "../helpers/BookAPICalles";

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
    maxHeight: '300px',
    color: 'black',
    position: 'absolute',
    backgroundColor: 'white',
    padding: '10px',
    fontSize: '18px',
    border: '1px solid black',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    overflowY:'scroll',
    zIndex: '2',
  },
  ss:{
    borderBottom: '1px solid black',
    padding: '5px 2px',
    cursor: 'pointer',
    "&:hover":{
      backgroundColor: '#d4d4d4',
    },
    hidden: {
      display: 'none',
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

      if(matches.length === 0){
        setTimeout(()=>{
          getSearchResults(text)
          .then(res => {
            matches = res.map(book => {
              // console.log(book.volumeInfo.title);
              // let title = book.volumeInfo.title +"-"+book.id
              // console.log(title);
              return {"title":book.volumeInfo.title, "id":book.id}
            })
            setSuggestions(matches);
            // console.log(matches);
          })
        },1000)
      }
    }
    setSuggestions(matches);
    setSearchKey(text);
  }

  const onSuggestClickHandler = (text, link) => {
    setSearchKey(text);
    setSuggestions([]);
    navigate(`/books/${link}`);
  }

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

  // book.title.split(" ").join("-") + `-id-${book.id}`;

  return (
    <div className={classes.search}>
      <TextField
        placeholder="Book Search"
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
         {suggestions.map((suggestion, i) => {
           let link = suggestion.title.split(" ").join("-") + `-id-${suggestion.id}`;
           return <div key={i} className={classes.ss}
              onClick={()=>onSuggestClickHandler(suggestion.title, link)}
            >{suggestion.title}</div>
         })}
      </div>
      )}
    </div>
  );
};

export default SearchAuto;

/*

(
          <div key={i} className={classes.ss}
            onClick={()=>onSuggestClickHandler(suggestion.title)}
          >{suggestion.title}</div>
        )

*/
