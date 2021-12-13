import React from 'react'
import {Link} from 'react-router-dom'
import { Box, Card, CardContent, CardHeader, Typography, makeStyles } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';

const useStyle = makeStyles((theme)=>({
    card:{
        marginBottom: '5px',
        backgroundColor: '#f2f2f2',
        padding: '3px',
    },
    link: {
        textDecoration: 'none',
        fontSize: '13px',
    },
    rating: {
        
    },
    comment:{
        fontSize: '13px',
    },
    user:{
        textAlign: 'right',
    }
}))

const ReviewCardSmall = ({review}) => {
    const classes = useStyle();

    return (
        <div className={classes.card}>
            <p className={classes.bookTitle}>
                {<Link to={"/books/"+review.book_title.split(" ").join("-") + `-id-${review.book_id}`} className={classes.link}>
                    <Typography className={classes.link}>{review.book_title} </Typography>
                </Link>}
            </p>
            <p className={classes.rating}>
                <Rating name="read-only" value={review.rating} size="small" readOnly />
            </p>
            <p>
                <Typography className={classes.comment}>{review.comment}</Typography>
            </p>
            <p className={classes.user}>
                - 
                <Link to={"/profile/"+review.public_url} className={classes.link}>
                    <Typography variant="caption">{review.user_name}</Typography>
                </Link>
            </p>
        </div>
    )
}

export default ReviewCardSmall
