import axios from "axios";

const API = process.env.REACT_APP_BACKEND;

export const getProfile = (userId) => {
    return axios
        .get(`${API}/auth/public/profile/${userId}/`)
        .then(res => {
            // console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getProfileUrl = async (userId) => {
    const data = await getProfile(userId)
    let url = data.name.split(' ').join('.')+"."+data.id;
    // console.log(url);
    return url;
}

export const getUersReview = (userId) => {
    return axios
        .get(`${API}/book/review/user/${userId}/`)
        .then(res => {
            // console.log(res.data.reviews);
            return res.data.reviews;
        })
        .catch(err => {
            console.log(err);
        })
}
