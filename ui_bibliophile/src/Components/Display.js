import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Modal } from "@material-ui/core";

import { UserContext } from "../Components/UserContext";

function Display(props) {
  const history = useHistory();
  const { token } = useContext(UserContext);

  console.log(props.results);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "inline-grid",
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

  const handleDetailsView = () => {
    history.push("/details");
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {props.results.map((book) => {
          // console.log(book.searchInfo.textSnippet, "textSnippet");
          let title = book.volumeInfo.title;
          // let text = book.searchInfo.textSnippet;
          let srcPath = book.volumeInfo.imageLinks.smallThumbnail;
          return (
            <>
              <Grid item xs={3}>
                <div className={classes.card}>
                  <Card>
                    <CardActionArea height="400">
                      <CardMedia
                        component="img"
                        height="500"
                        image={srcPath}
                        alt="green iguana"
                      />
                      <div className={classes.cardcontent}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {title}
                          </Typography>
                        </CardContent>
                      </div>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={handleDetailsView}
                      >
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}

export default Display;
