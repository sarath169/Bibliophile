import React, { useState, useEffect } from "react";
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
import UpdateLinks from "../../components/UpdateLinks";
import { getProfileById, uploadProfilePicture } from "../../helpers/ProfileHelper";

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
  text: {
    display: 'block',
    textAlign: 'center'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
}));

const UpdateProfilePicture = () => {
  const classes = useStyles();

  const [image, setImage] = useState("");
  const [uploadImage, setUploadImage] = useState({})
  const [text, setText] = useState("Upload to make it parmanent")
  const [showText, setShowText] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProfileById(localStorage.getItem("bib_id"))
      .then((res) => {
        if (res) {
          setImage(res.profile_picture);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setUploadImage(e.target.files[0])
    var url = URL.createObjectURL(e.target.files[0]);
    setImage(url);
    setErrorMessage("");
    setShowText(true);
  }

  const handleUploadImage = () => {

    setErrorMessage("");
    let error = false; 

    if(!uploadImage.name){
        setErrorMessage("Please select an Image first");
        error = true;
    }
    console.log(error);
    if (!error) {
        const formData = new FormData();
        formData.append('profile_picture', uploadImage, uploadImage.name);
        // console.log(formData);
        uploadProfilePicture(formData)
        .then(res=>{
          // console.log(res);
          setImage(res.profile_picture);
          setText("Profile picture uploaded")
          // setShowText(false);
        })
        .catch(err =>{
          console.log(err);
        })
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
            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar src={image} className={classes.avatar} />
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={handleChange}
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
              <p className={classes.error}>{errorMessage}</p>
              { showText && (
              <Typography variant="caption" className={classes.text}>
                {text}
                </Typography>
              )}
              <Button
                className={classes.field}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUploadImage}
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
