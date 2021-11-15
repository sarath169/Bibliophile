import axios from "axios"

const API = process.env.REACT_APP_BACKEND

export const getPopularBooks = () => {
    return axios.get(`${API}/book/top_ten_popular/`)
            .then(res => {
                // console.log(res);
                return res.data;
            })
            .catch(err => console.log(err))
}

export const getTopRatedBooks = () => {
    return axios.get(`${API}/book/top_ten_rated/`)
            .then(res => {
                // console.log(res);
                return res.data;
            })
            .catch(err => console.log(err))
}

export const getBookDetails = (id) => {
    return axios.get(`${API}/book/get/${id}/`)
            .then(res => {
                // console.log(res);
                return res.data;
            })
            .catch(err => console.log(err))
}

export const getAllBooks = () => {
    return axios.get(`${API}/book/`)
            .then(res => {
                // console.log(res);
                return res.data;
            })
            .catch(err => console.log(err));
}

export const getUsersBook = (id) =>{
    return axios.get(`${API}/book/get_users_book/${id}/`)
    .then(res => {
        console.log(res);
        return res.data;
    })
    .catch(err => console.log(err))
}