import React from "react";
import Carousel from "react-elastic-carousel";
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
import Image from "material-ui-image";

import { UserContext } from "../Components/UserContext";

function Carousell(props) {
  const items = props.items;
  const length = props.length;
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {
      height:'100%',
    },
    // card:{
    //   height: 600,
    // },
    // image:{
    //   height: 300,
    // },
    cardContent: {
      height: 130,
    },
    cardActions:{
        height:"100%",
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
  const Item = ({ srcPath, title }) => {
    return (
      <div className={classes.card}>
        <Card>
          <CardActionArea height="400">
            <CardMedia
              component="img"
              height="450"
              image={srcPath}
              alt="green iguana"
            />
            <div className={classes.cardContent}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
              </CardContent>
            </div>
          </CardActionArea>
          <div className={classes.cardActions}>
          <CardActions>
            <Button size="small" color="primary" onClick={handleDetailsView}>
              Details
            </Button>
          </CardActions>
          </div>
        </Card>
      </div>
    );
  };
  return (
      <div className={classes.root}>
    <Carousel >
      {console.log(items, length)}
      {length > 0 ? (
        items.map((item, i) => (
          <>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Item key={i} {...item} />
              </Grid>
              <Grid item xs={3}>
                <Item key={i} {...item} />
              </Grid>
              <Grid item xs={3}>
                <Item key={i} {...item} />
              </Grid>
              <Grid item xs={3}>
                <Item key={i} {...item} />
              </Grid>
            </Grid>
          </>
        ))
      ) : (
        <>
          <Image src="http://127.0.0.1:8000/static/images/no_data_image.jpg"/>
        </>
      )}
    </Carousel>
    </div>
  );
}

export default Carousell;
