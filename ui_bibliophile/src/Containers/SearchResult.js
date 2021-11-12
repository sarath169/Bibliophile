import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import Display from "./Display";
import { UserContext } from "../Components/UserContext";
import "./SearchResult.css";

function SearchResult() {
  const { token, searchResult } = useContext(UserContext);
  const history = useHistory();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(token);
  console.log(searchResult);

  const displayImages = () => {
    console.log(images);
    return (
      <React.Fragment>
        <div className="">
          {images.length > 0 ? (
            <>
              {console.log("entered images")}
              <Display results={images} />
            </>
          ) : (
            <>
              {console.log("length of images <0")}
              {loading ? (
                <>
                  <div className="container center">
                    <CircularProgress loading color="secondary" />
                  </div>
                </>
              ) : (
                <>
                  <div> no images </div>
                </>
              )}
            </>
          )}
        </div>
      </React.Fragment>
    );
  };

  useEffect(() => {
    if (searchResult) {
      console.log(searchResult);
      setImages(searchResult);
    }
  });
  useEffect(() => {
    if (setImages) {
      displayImages();
    }
  }, [images]);

  return (
    <div className="body">
      <div>{displayImages()}</div>
    </div>
  );
}

export default SearchResult;
