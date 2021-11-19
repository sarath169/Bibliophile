import axios from "axios";

const API = process.env.REACT_APP_BACKEND;

export const getProfile = (publicUrl) => {
    return axios
        .get(`${API}/auth/public/profile/${publicUrl}/`)
        .then(res => {
            // console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getProfileById = (userId) =>{
    const token = localStorage.getItem("bib_token");
    return axios
        .get(`${API}/auth/profile/`,{
            headers: {
                Authorization: `Token ${token}`,
            }
        })
        .then(res => {
            // console.log(res.data);
            return res.data;
        })
        .catch(err=>{
            console.log(err)
        })

}

export const getProfileUrl = async (userId) => {
    const data = await getProfile(userId)
    let url = data.public_url;
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

export const updateUser = (name, url, description) =>{
        // console.log(name, email, password);
        const token = localStorage.getItem("bib_token");
        return axios
        .put(`${API}/auth/profile/`,{
            name: name,
            public_url: url,
            description: description
        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
        .then(res => {
            //console.log("Status:"+JSON.stringify(res))
            // console.log(res);
            
            if(res.status === 200){
                return {
                    status: "success",
                    message: res.data.public_url
                }
            } else {
                let msg = res.data.email[0] ? res.data.email[0] : "Something went wrong. Please try again."
        
                return {
                    status: "error",
                    message: msg
                }
            }
        })
        .catch(err => {
            // console.log(err.response.status);
            if(err.response.status === 400){
                return {
                    status: 400,
                    message: "Profile URL not Available. Use a different URL"
                }
            }
        })
    }

export const uploadImage = (formData) => {
    return axios
        .put(`${API}/auth/profile/`, formData)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

}