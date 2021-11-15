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

export const getUsersBook = (userId) =>{
    const token = localStorage.getItem("bib_token")
    return axios.get(`${API}/book/get_users_book/${userId}/`, { headers: {"Authorization" : `Token ${token}`} })
    .then(res => {
        // console.log(res);
        return res.data;
    })
    .catch(err => console.log(err))
}

export const isBookInShelf = async (userId,bookId) => {
    const data = await getUsersBook(userId);
    for(let i in data){
        let list = data[i];
        for(const book of list){
            if(book.id === bookId)
                return true
        }
    }
    return false;
}

export const addBook = (bookId, shelfType) => {
    const token = localStorage.getItem("bib_token")
    const data = {
        book_id: bookId,
        shelf_type: shelfType
    }
    return axios
        .post(`${API}/book/add/`, data, { 
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Token ${token}`,
            }
        })
    .then(res => {
        console.log(res)
        if(res.data.id){
            return {
                status: "success",
            }
        } else {
            return {
                status: "error",
            }
        }
    })
    .catch(err => {
        console.log(err.response.data);
        return {
            status: "error",
            message: err.response.data.detail
        }
    })
}

export const getReview = (bookId) => {
    const token = localStorage.getItem("bib_token")
    return axios.get(`${API}/book/review/book/${bookId}/`, { headers: {"Authorization" : `Token ${token}`} })
    .then(res => {
        console.log(res);
        return res.data;
    })
    .catch(err => console.log(err))
}