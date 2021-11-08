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
  const { user, token } = useContext(UserContext);

  const [favourites, setFavourites] = useState([]);
  let favourites_id = [];
  const [favouritesChanged, setFavouritesChanged] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [modalStyle] = useState(getModalStyle);

  console.log(props.results);

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "inline-grid",
    },
    // card:{
    //   height: 500,
    // },
    // image:{
    //   height: "100%",
    // },
    // media: {
    //   height: 300,
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

  const listfavourites = () => {
    const API_URL = "http://127.0.0.1:8000/api/listfavourites/";
    axios
      .get(API_URL, {
        params: { user: user },
        headers: { Authorization: "token " + token },
      })
      .then((response) => {
        console.log(response);
        setFavourites(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToFavourite = (id, secret, farm, server, title) => {
    const API_URL = "http://127.0.0.1:8000/api/addfavourite/";
    axios
      .post(
        API_URL,
        {
          user: user,
          id: id,
          secret: secret,
          farm: farm,
          server: server,
          title: String(title),
        },
        { headers: { Authorization: "token " + token } }
      )
      .then(function (response) {
        console.log(response);
        setFavouritesChanged(favouritesChanged + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const populatefavourites = () => {
    favourites_id = [];
    favourites.map((favourite) => {
      console.log(favourite.id);
      favourites_id = [...favourites_id, favourite.id];
      console.log(favourites_id);
    });
  };

  const handleDetailsView = () => {
    history.push("/details");
  };

  const isPresent = (id, secret, farm, server, title, image) => {
    console.log(favourites);
    console.log(id);
    populatefavourites();
    console.log(favourites_id);
    {
      if (favourites_id.indexOf(id) !== -1) {
        return (
          <>
            <div>
              <button type="button" onClick={() => handleOpen(image)}>
                View Notes
              </button>
            </div>
          </>
        );
      } else {
        return (
          <>
            <label>
              <input
                onClick={() => {
                  addToFavourite(id, secret, farm, server, title);
                }}
                type="checkbox"
              />
              <span>Add to favourites</span>
            </label>
          </>
        );
      }
    }
  };

  const handleOpen = (obj) => {
    setModalObject(obj);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    listfavourites();
  }, [favouritesChanged]);

  return (
    <div className={classes.root}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      ></Modal>
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
                    <CardActionArea
                    height = "600">
                      <CardMedia
                        component="img"
                        height="100%"
                        image={srcPath}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {title}
                        </Typography>
                      </CardContent>
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
