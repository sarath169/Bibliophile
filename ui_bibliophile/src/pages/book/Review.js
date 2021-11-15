import React, {useState, useEffect} from 'react'
import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import ReviewCard from '../../components/ReviewCard'
import { getReview } from '../../helpers/BookAPICalles'

const useStyle = makeStyles(()=>({
    addReview: {
        border: '1px solid black',
        padding: '25px',
        borderRadius: '5px',
    },
    textfield:{
        marginBottom: '10px',
    },
    reviews: {
        marginTop: '20px'
    }
}))

const Review = ({bookId}) => {
    const classes = useStyle();

    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        getReview(bookId)
        .then(res => {
            setReviews(res.reviews);
        })
        .catch(err => console.log(err));
    },[bookId])

    return (
        <>
            <div className={classes.addReview}>
                <Typography variant="h5">
                    Your Thoughts on this book
                </Typography>
                <form>
                    <Box component="fieldset" mb={1} borderColor="transparent">
                        <Rating
                            // value={value}
                            // onChange={(event, newValue) => {
                            //     setValue(newValue);
                            // }}
                        />
                    </Box>
                    <TextField
                    className={classes.textfield}
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    >
                    Add
                    </Button>
                </form>
            </div>
            <div className={classes.reviews}>
                {
                    (reviews.length > 0) 
                    && 
                    (<Typography variant="h5">
                        Book Reviews
                    </Typography>
                    )
                }
                
                {
                    reviews.map((review)=>(
                        <ReviewCard key={Review.id} review={review} />
                    ))
                }
            </div>
        </>
    )
}

export default Review
