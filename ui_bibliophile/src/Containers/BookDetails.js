import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";

import Carousell from "../Components/Carousel";
import { ClassNames } from "@emotion/react";

function BookDetails(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 20,
      marginLeft: 200,
      marginRight: 200,
      marginBottom: 20,
    },
    image: {
      height: "70%",
      width: "100%",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <img
            src="http://books.google.com/books/content?id=ZVVYDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            className={classes.image}
          />
        </Grid>
        <Grid item xs={8}>
        <Box component="div" sx={{ display: "inline" }}>
            Title
          </Box>
          <Box
            component="span"
            sx={{
                display: "inline"
            }}
          >
            Harry Potter: The Complete Collection (1-7)
          </Box>
          <Box component="div" sx={{ display: "inline" }}>
            Description
          </Box>
          <Box
            component="span"
            sx={{
              display: "block",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
            }}
          >
            "As we celebrate the 20th anniversary of Harry Potter and the
            Sorcerer's Stone in the US, readers everywhere are invited to
            explore the extraordinary subjects of the Hogwarts curriculum -
            Potions & Alchemy, Divination, Care of Magical Creatures, and more -
            and examine incredible historical artifacts, items from J.K.
            Rowling's personal archive, and stunning original artwork from Harry
            Potter series artists Mary GrandPré, Jim Kay, and Brian Selznick.
            Published in conjunction with the special exhibition Harry Potter: A
            History of Magic (coming to the New-York Historical Society after a
            record-breaking sold-out run at the British Library), this complete
            catalogue of the over 150 artifacts on display gives readers an
            up-close look at magical treasures from all over the world.
            Exclusive to the New York run are amazing artifacts from American
            institutions - including an original Audubon illustration, a
            narwhal's tusk (or is it a unicorn's horn?), an ancient Iranian
            astrolabe, and more - as well as never-before-seen original artwork
            by Mary GrandPré and early correspondence between J.K. Rowling and
            her American editor, Arthur Levine. This special publication is an
            essential volume for Harry Potter fans, history buffs, and
            bibliophiles, and a fascinating exploration of the history of the
            magic at the heart of the Harry Potter stories.",
          </Box>
          <Box component="div" sx={{ display: "inline" }}>
            Publisher{" "}
          </Box>
          <Box
            component="span"
            sx={{
              display: "block",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
            }}
          >
            Pottermore Publishing "publishedDate": "2015-12-14",
          </Box>
          <Box component="div" sx={{ display: "inline" }}>
            PublishedDate{" "}
          </Box>
          <Box
            component="span"
            sx={{
              display: "block",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
            }}
          >
            2015-12-14
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default BookDetails;
