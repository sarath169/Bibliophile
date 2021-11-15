import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import ClosedCaptionOutlinedIcon from '@material-ui/icons/ClosedCaptionOutlined';
import { getBookDetails } from '../../helpers/BookAPICalles';
import AddBook from '../../components/AddBook';

const useStyles = makeStyles(()=>({
    container: {
        marginTop: '20px',
        "& section":{
            backgroundColor: '#f2f2f2',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
        }
    },
    bookImage:{
        height: '100%',
        width: '100%'
    },
    title: {
        margin: '20px 0px',
        textAlign: 'center'
    },
    bookDetails:{
        "& p":{
            marginTop: '3px',
        }
    },
    wrapIcon: {
        verticalAlign: 'middle',
        display: 'inline-flex',
    },
    linkIcon:{
        marginRight: '5px',
    },
    description:{
        textAlign: 'justify'
    }
}));

const BookDetails = () => {
    const classes = useStyles();
    const location = useLocation();
    
    const [bookDetails, setBookDetails] = useState({});

    const bookId=location.state;
    
    useEffect(()=>{
        // console.log(bookId)
        getBookDetails(bookId)
        .then(res=>{
            setBookDetails(res);
        })
        .catch(err => console.log(err));
    },[bookId]);

    let details = String(bookDetails.description).replace(/(<([^>]+)>)/gi, "");

    return (
        <Container className={classes.container}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <div>
                        <img src={bookDetails.image_link_small} alt={bookDetails.title} className={classes.bookImage} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.bookDetails}>
                        <Typography variant="h4"> {bookDetails.title} </Typography>
                        <br />
                        <p><Typography variant="subtitle1" className={classes.wrapIcon}>
                            <AccountCircleOutlinedIcon className={classes.linkIcon}  /> Author: {bookDetails.author}
                        </Typography></p>
                        <p><Typography variant="subtitle1" className={classes.wrapIcon}>
                            <PublicOutlinedIcon className={classes.linkIcon}  /> Publisher: {bookDetails.publisher}
                        </Typography></p>
                        <p><Typography variant="subtitle1" className={classes.wrapIcon}>
                            <MenuBookOutlinedIcon className={classes.linkIcon}  /> Page Count: {bookDetails.page_count}
                        </Typography></p>
                        <p><Typography variant="subtitle1" className={classes.wrapIcon}>
                            <ClosedCaptionOutlinedIcon className={classes.linkIcon}  /> Language: {bookDetails.language}
                        </Typography></p>
                        <p><Typography className={classes.description}>{details}</Typography></p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <AddBook />
                </Grid>
            </Grid>
        </Container>
    )
}

export default BookDetails
