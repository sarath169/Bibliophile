import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

function UploadPicture() {
  const [fileName, setFileName] = useState();
  const [uploadImage, setUploadImage] = useState();
  const [imagePreviewURL, setImagePreviewURL] = useState();

  const handleChange = (e) => {
    setUploadImage(e.target.files[0]);
    console.log(e.target.files);
    setFileName(e.target.files[0]["name"]);
    setImagePreviewURL(URL.createObjectURL(e.target.files[0]));
  };
  const s3Upload = () => {
    axios
      .post("http://127.0.0.1:8000/auth/getpresignedurltoupload/", {
        fileName: fileName, //parameter 1
      })
      .then((response) => {
        // console.log(response);
        let returnData = response.data;
        let preSignedURL = returnData["url"];
        const formData = new FormData();

        // append the fields in presignedPostData in formData
        var obj = {};

        Object.keys(returnData["fields"]).forEach((key) => {
          formData.append(key, returnData["fields"][key]);
          obj[key] = returnData["fields"][key];
        });
        formData.append("file", uploadImage);
        var options = {
          headers: {
            "Content-Type": "images/*",
            "Access-Control-Allow-Origin": "*",
          },
        };

        axios
          .post(preSignedURL, formData, options)
          .then((response) => {
            // console.log(response, obj, response.status);
            if (response.status === 204) {
              // call backend api to store s3path object
              // console.log(fileName);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <div>
      <img
        src={imagePreviewURL}
        alt="Girl in a jacket"
        width="500"
        height="600"
      ></img>
      <form>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => {
            s3Upload();
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UploadPicture;
