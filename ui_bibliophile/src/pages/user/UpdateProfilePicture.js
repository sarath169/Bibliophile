import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import UpdateLinks from "../../components/UpdateLinks";
import { getProfileById, uploadImage } from "../../helpers/ProfileHelper";

const useStyles = makeStyles(() => ({
  card: {
    marginTop: "25px",
    minWidth: "450px",
    padding: "5px",
  },
  avatar: {
    height: "100px",
    width: "100px",
  },
  title: {
    textAlign: "center",
  },
  field: {
    marginTop: "8px",
  },
  links: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "blue",
    textDecoration: "none",
  },
  resp: {
    display: "block",
    textAlign: "center",
    color: "red",
  },
  input: {
    display: "none",
  },
  icon: {
    marginLeft: "-75px",
    marginTop: "80px",
  },
}));

const UpdateProfilePicture = () => {
  const classes = useStyles();

  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);

  const [response, setResponse] = useState("");

  useEffect(() => {
    getProfileById(localStorage.getItem("bib_id"))
      .then((res) => {
        if (res) {
          setImage(res.profile_picture);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const uploadImage = () => {

    let error = false;

    if(image===""){
        setImageError(true);
        error = true;
    }

    if (!error) {
        console.log(image);
        // const formData = new FormData();
        // formData.append('profile_picture', image, image.name);
        // console.log(formData);
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item sx={12} sm={3}>
          <UpdateLinks />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card} variant="outlined">
            <Typography variant="h4" className={classes.title}>
              Update Profile Picture
            </Typography>
            <Typography className={classes.resp}>{response}</Typography>
            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar src={image} className={classes.avatar} />
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={e=>setImage(e.target.files[0])}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    className={classes.icon}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
              <Button
                className={classes.field}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={uploadImage}
              >
                Upload
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateProfilePicture;
