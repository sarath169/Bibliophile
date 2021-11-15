import axios from "axios";

const API = process.env.REACT_APP_BACKEND;

console.log(API);
export const getPopularBooks = () => {
  return axios
    .get(`${API}/book/top_ten_popular/`)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getTopRatedBooks = () => {
  return axios
    .get(`${API}/book/top_ten_rated/`)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getBookDetails = (id) => {
  return axios
    .get(`${API}/book/get/${id}/`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};
export const getGoogleBookDetails = (id) => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes/${id}/`)
    .then((res) => {
      console.log(res.data, "google");
      let data = {
        author: res.data.volumeInfo.authors,
        category: res.data.volumeInfo.categories,
        title: res.data.volumeInfo.title,
        description: res.data.volumeInfo.description,
        page_count: res.data.volumeInfo.pageCount,
        publisher: res.data.volumeInfo.publisher,
        image_link_small: res.data.volumeInfo.imageLinks.smallThumbnail,
        image_link_large: res.data.volumeInfo.imageLinks.thumbnail,
        language: res.data.volumeInfo.language,
        preview_link: res.data.volumeInfo.previewLink,
      };
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};

export const getAllBooks = () => {
  return axios
    .get(`${API}/book/`)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getUsersBook = (id) => {
  return axios
    .get(`${API}/book/get_users_book/${id}/`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};
