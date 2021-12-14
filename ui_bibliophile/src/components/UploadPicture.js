import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import defaultUserImage from "../images/user.png";

function UploadPicture() {
  let fileName = "default" + ".png";
  var url = null;
  var returnData = null;
  const s3Upload = () => {
    axios
      .post("http://127.0.0.1:8000/auth/getpresignedurltoupload/", {
        fileName: "default1", //parameter 1
        fileType: "png", //parameter 2
      })
      .then((response) => {
        console.log(response);
        returnData = response.data;
        console.log(returnData);
        // var signedRequest = returnData.signedRequest;
        url = returnData["url"];
        console.log(url);

        const formData = new FormData();

        // append the fields in presignedPostData in formData
        console.log(returnData);
        var obj = {};

        Object.keys(returnData["fields"]).forEach((key) => {
          formData.append(key, returnData["fields"][key]);
          obj[key] = returnData["fields"][key];
        });

        // append the file
        formData.append("file", defaultUserImage);
        console.log(formData);

        // formData.append('Content-Type', 'video/webm');
        console.log(obj);
        var options = {
          headers: {
            "Content-Type": "images/*",
          },
        };
        // http_response = requests.post(response['url'], data=response['fields'], files=files)

        axios
          .put(url, defaultUserImage, options)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });

        const t = axios.post(url, formData, options);
        t.then(function (response) {
          console.log(response, "heyyy", obj, response.status);
          if (response.status === 204) {
            // call backend api to store s3path object
            console.log(fileName);
          }
        });
        t.catch(function (error) {
          console.log(error, "wayyy");
        });
      });
  };
  return (
    <div>
      <form>
        <input type="file" id="myfile" name="myfile" />
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
