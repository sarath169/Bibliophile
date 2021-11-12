import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Carousell from "../Components/Carousel";
import { UserContext } from "../Components/UserContext";
import { textAlign } from "@mui/system";

function Home() {
    const { token } = useContext(UserContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      //   display: "inline-grid",
      marginBottom: 30,
      marginLeft: 200,
      marginRight: 200,
      marginTop: 30,
    },
    title:{
        textAlign: "center",
    },
    coursel: {
      height: "100%",
      marginBottom: 10,
    },
    // card:{
    //   height: 600,
    // },
    // image:{
    //   height: 300,
    // },
    cardcontent: {
      height: 130,
    },
    // media: {
    //   height: 900,
    //   width: "100%",
    // },
    // title: {
    //   height: 80,
    // },
    topPadding: {
      padding: "10px",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const items = [
    {
      srcPath:
        "http://books.google.com/books/content?id=f280CwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      title: "Harry Potter: The Complete Collection (1-7)",
    },
    {
      srcPath:
        "http://books.google.com/books/content?id=ZVVYDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      title: "Harry Potter: A History of Magic",
    },
    {
      srcPath:
        "http://books.google.com/books/content?id=Au4hDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      title: "A Harry Potter Hogwarts Library Book",
    },
  ];
  const [popularBooks, setPopularBooks] = useState(items);
  const [topRatedBooks, setTopRatedBooks] = useState(items);

  const listPopularBooks = () => {
    const API_URL = "http://127.0.0.1:8000/book/top_ten_popular/";
    axios
      .get(API_URL, {
        headers: { Authorization: "token " + token },
      })
      .then((response) => {
        console.log(response);
        setPopularBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const listTopRatedBooks = () => {
    const API_URL = "http://127.0.0.1:8000/book/top_ten_rated/";
    axios
      .get(API_URL, {
        headers: { Authorization: "token " + token },
      })
      .then((response) => {
        console.log(response);
        setTopRatedBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

//   useEffect(() => {
//     listPopularBooks();
//     listTopRatedBooks();
//   }, []);

  console.log(popularBooks.length, "popularbooks length")
  console.log(topRatedBooks.length, "topratedbooks length")

  return (
    <div className={classes.root}>
        <h2 className = {classes.title}>Popular Books</h2>
      <div className={classes.coursel}>
        <Carousell items={popularBooks} length = {popularBooks.length} />
      </div>
      <br/>
      <h2 className = {classes.title}>Top Rated Books</h2>
      <div className={classes.coursel}>
        <Carousell items={topRatedBooks} length = {topRatedBooks.length}/>
      </div>
    </div>
  );
}

export default Home;
