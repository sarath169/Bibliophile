import { Box, Card, CardContent, CardHeader, Typography, makeStyles } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png';

const useStyle = makeStyles((theme)=>({
    card:{
        marginBottom: '5px'
    },
    profilePicture: {
        height: '50px',
        width: '50px'
    },
    link: {
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 'bold'
    }
}))

const ReviewCard = ({review}) => {
    const classes = useStyle();

    const API = process.env.REACT_APP_BACKEND
    let img_url=""
    if(review.user_image){
        img_url = `${API}${review.user_image}`;
    } else {
        img_url = user;
    }
    
    return (
        <Card className={classes.card}>
            <CardHeader 
                avatar={
                    <img src={img_url} className={classes.profilePicture}alt=""/>
                  }
                title={<Link to={"/profile/"+review.user_url} className={classes.link}> {review.user_name }</Link>}
                subheader={review.reviewed_at}
            />
            <CardContent>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={review.rating} readOnly />
                    <br />
                    <Typography variant="body1">{review.comment}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ReviewCard
