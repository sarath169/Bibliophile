import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Container, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { getProfile, getUersReview } from '../../helpers/ProfileHelper';
import { getUsersBook } from '../../helpers/BookAPICalles';
import BookCard from '../../components/BookCard';
import ReviewCardUser from '../../components/ReviewCardUser';
import user from '../../images/user.png';

const useStyles = makeStyles(()=>({
    container: {
        marginTop: '20px',
    },
    profilePicture: {
        height: '200px',
        width: '200px',
        borderRadius: '100px'
    },
    description: {
        textAlign: 'justify',
    },
    title: {
        marginBottom: '3px',
    },
    section: {
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f2f2f2',
        borderRadius: '10px'
    },
    button: {
        marginTop: '15px',
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    }
}))

const Profile = () => {
    const location = useLocation();
    const classes = useStyles();
    
    const [publicUrl, setPublicUrl] = useState("");
    const [userId, setUserId] = useState(0);
    const [profile, setProfile] = useState({});
    // const [bookShelf, setBookShelf] = useState({});
    const [readList, setReadList] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [shelfList, setShelfList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [owner, setOwner] = useState(false);
    
    // console.log(userId);
    
    useEffect(()=>{
        const profileUrl = location.pathname;
        setPublicUrl(profileUrl.split("/").at(-1));
        // console.log(userId);
        // console.log("use effect called");
        if(publicUrl!==""){
            console.log(publicUrl);
            getProfile(publicUrl)
            .then(res=>{
                if(localStorage.getItem("bib_id") ===  String(res.id)){
                    setOwner(true);
                }
                setUserId(res.id);
                if(res){
                    setProfile(res);
                    getUsersBook(userId)
                    .then(res => {
                        if(res && userId!==0){
                            // setBookShelf(res);
                            for (let i in res) {
                                if(i==='RL')
                                    setReadList(res[i]);
                                else if(i==='WL')
                                    setWishList(res[i]);
                                else if(i==='SL')
                                    setShelfList(res[i]);
                            }
                            getUersReview(userId)
                            .then(res=>{
                                if(res){
                                    setReviews(res);
                                }
                            })
                        }
                    })
                }
            })
        }

    },[location.pathname, publicUrl, userId])

    let img_url=""
    if(profile.profile_picture){
        img_url = profile.profile_picture;
    } else {
        img_url = user;
    }
    
    return (
        <Container className={classes.container}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={3}>
                    <img src={img_url} alt="" className={classes.profilePicture}/>
                    <Typography variant="h5">
                        {profile.name}
                    </Typography>
                    <Typography variant="body1">
                        {profile.email}
                    </Typography>
                    <Typography variant="caption">
                        Public URL: <br />
                        <Link to={`${location.pathname}`}>
                            {`localhost:3000${location.pathname}`}
                        </Link>
                    </Typography>
                    {
                        owner && 
                            <Button 
                                variant="contained" 
                                size="small" 
                                fullWidth 
                                color="primary" 
                                className={classes.button}>
                                    <Link to="/profile/updateinfo" className={classes.link}>
                                        Edit Profile
                                    </Link>
                            </Button>
                    }
                </Grid>
                <Grid item xs={12} sm={9}>
                    <div className={classes.section}>
                        <Typography variant="h6" className={classes.title}>About</Typography>
                        <Typography variant="subtitle1" className={classes.description}>{profile.description}</Typography>
                    </div>
                    <div>
                    {
                        (readList.length > 0) && (
                            <div className={classes.section}>
                                <Typography variant="h6" className={classes.title}>Read List Collection</Typography>
                                <Grid container spacing={2}>
                                    {readList.map((book) => (
                                        <Grid key={book.id} item xs={12} sm={3}>
                                        <BookCard book={book} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        )
                    }
                    {
                        (wishList.length > 0) && (
                            <div className={classes.section}>
                                <Typography variant="h6" className={classes.title}>Wish List Collection</Typography>
                                <Grid container spacing={2}>
                                    {wishList.map((book) => (
                                        <Grid key={book.id} item xs={12} sm={3}>
                                        <BookCard book={book} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        )
                    }
                    {
                        (shelfList.length > 0) && (
                            <div className={classes.section}>
                                <Typography variant="h6" className={classes.title}>Shelf List Collection</Typography>
                                <Grid container spacing={2}>
                                    {shelfList.map((book) => (
                                        <Grid key={book.id} item xs={12} sm={3}>
                                        <BookCard book={book} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        )
                    }
                    </div>
                    <div className={classes.section}>
                        {
                            (reviews.length > 0) && (
                                <>
                                    <Typography variant="h6" className={classes.title}>Recent Reviews</Typography>
                                    {reviews.map((review, index)=>(
                                    <ReviewCardUser key={index} review={review} />))}
                                </>    
                            )
                        } 
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Profile
