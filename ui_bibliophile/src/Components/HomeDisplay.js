import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { UserContext } from "../Components/UserContext";
import "./Display.css";
import BookCard from "./BookCard";
import { Grid } from "@mui/material";

function HomeDisplay(props) {
  const history = useHistory();
  const { token } = useContext(UserContext);

  console.log(props.results);

  const handleDetailsView = () => {
    history.push("/details");
  };

  return (
    <div>
        {props.results ? (
          props.results.map((book) => (
            <div>
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <>
            <div className="image">
              <img
                src="http://127.0.0.1:8000/static/images/no_data_image.jpg"
                alt="No Data"
              />
            </div>
          </>
        )}
    </div>
  );
}

export default HomeDisplay;
