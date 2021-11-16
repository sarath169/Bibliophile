import React from 'react'
import {Link} from 'react-router-dom'
import { Box, Card, CardContent, CardHeader, Typography, makeStyles } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';

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

const ReviewCardUser = ({review}) => {
    const classes = useStyle();
    
    return (
        <Card className={classes.card}>
            <CardHeader 
                avatar={
                    <img src={review.book_image} className={classes.profilePicture}alt=""/>
                  }
                title={<Link to="#" className={classes.link}>{review.book_title} </Link>}
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

export default ReviewCardUser
