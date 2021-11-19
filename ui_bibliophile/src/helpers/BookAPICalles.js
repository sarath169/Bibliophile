import axios from "axios";

const API = process.env.REACT_APP_BACKEND;

// console.log(API);

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
      //   console.log(res);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return;
    });
};

export const getSearchResults = (searchKey) => {
  const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}&download=epub&maxResults=12&key=AIzaSyDyxUzn7KYQ1j5_lZIQbz0PUxJrzKFHU2w`;
  return axios
    .get(API_URL)
    .then((res) => {
      //   console.log(res.data.items);
      return res.data.items;
    })
    .catch((err) => {
      return});
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

export const getUsersBook = (userId) => {
  return axios
    .get(`${API}/book/get_users_book/${userId}/`)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const isBookInShelf = async (userId, bookId) => {
  const data = await getUsersBook(userId);
  for (let i in data) {
    let list = data[i];
    for (const book of list) {
      if (book.id === bookId) return true;
    }
  }
  return false;
};

export const addBook = (bookId, shelfType) => {
  const token = localStorage.getItem("bib_token");
  const data = {
    book_id: bookId,
    shelf_type: shelfType,
  };
  return axios
    .post(`${API}/book/add/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data.id) {
        return {
          status: "success",
        };
      } else {
        return {
          status: "error",
        };
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      return {
        status: "error",
        message: err.response.data.detail,
      };
    });
};

export const getReview = (bookId) => {
  return axios
    .get(`${API}/book/review/book/${bookId}/`)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => {
        console.log("No review");
        return;
    });
    
};

export const addReview = (bookId, rating, comment) => {
  const token = localStorage.getItem("bib_token");
  const data = {
    "rating": rating,
    "comment": comment,
    "book_id": bookId
  };
  return axios
    .post(`${API}/book/review/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
    //   console.log(res);
      if (res.data.id) {
        return {
          status: "success",
          data: res.data
        };
      } else {
        return {
          status: "error",
        };
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      return {
        status: "error",
        message: err.response.data.detail,
      };
    });
};

