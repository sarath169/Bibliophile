import React, {useState, useEffect} from 'react'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { getAllBooks } from '../../helpers/BookAPICalles';
import BookCard from '../../components/BookCard';

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
    title: {
        padding: '3px',
        margin: '20px 0px',
        textAlign: 'center',
        backgroundColor: 'white'
    },
    
}));


const Books = () => {
    const classes = useStyles();

    const [books, setBooks] = useState([]);

    useEffect(()=>{
        getAllBooks()
        .then((res)=>{
            setBooks(res);
        })
        .catch(err => console.log(err))
    },[books]);

    return (
        <Container className={classes.container}>
            <section>
                <Typography variant="h5" className={classes.title}>
                    Collection
                </Typography>
                <Grid container spacing={2}>
                    {
                        books.map((book)=>(
                            <Grid key={book.id} item xs={12} sm={4} md={2}>
                                <BookCard book={book} />
                            </Grid>
                        ))
                    }
                </Grid>
            </section>
        </Container>
    )
}

export default Books;
