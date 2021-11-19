import { Button, Card, CardContent, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import UpdateLinks from '../../components/UpdateLinks';
import { getProfileById, updateUser } from '../../helpers/ProfileHelper';

const useStyles = makeStyles(()=>({
    card:{
        marginTop: '25px',
        minWidth: '450px',
        padding: '5px'
    },
    title: {
        textAlign: "center"
    },
    field: {
        marginTop: '8px'
    },
    links: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    link:{
        color: 'blue',
        textDecoration: 'none',
    },
    resp: {
        display: 'block',
        textAlign: 'center',
        color: 'red',
    }
}))

const UpdateProfileInfo = () => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [url, setUrl] = useState('');
    const [urlError, setUrlError] = useState(false);
    const [description, setDescription] = useState('');
    const [response, setResponse] = useState('');

    useEffect(()=>{
        getProfileById(localStorage.getItem("bib_id"))
        .then(res =>{
            if(res){
                setName(res.name);
                setUrl(res.public_url);
                setDescription(res.description);
            }
        })
        .catch(err=>console.log(err));
    },[])

    const handleUpdate = (e) => {
        e.preventDefault();

        let error = false;

        setNameError(false);
        setUrlError(false);

        if(name===''){
            setNameError(true);
            error=true;
        }
        if(url===''){
            setUrlError(true);
            error = true;
        }

        if(!error){
            updateUser(name, url, description)
            .then(res => {
                if(res.status !== 'error'){
                        if(res.status === 'success'){
                           setResponse("Profile Updated");
                           window.location.reload(true);
                        } else {
                            setResponse(res.message)
                        }
                } else {
                    setResponse(res.message);
                }
            })
            .catch(err => console.log(err));
        }
    }

    return (
       <Container>
           <Grid container>
               <Grid item sx={12} sm={3}>
                   <UpdateLinks />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Card className={classes.card} variant="outlined">
                    <Typography variant="h4" className={classes.title}>
                        Update Personal Info
                    </Typography>
                    <Typography className={classes.resp}>{response}</Typography>
                    <CardContent>
                        <form noValidate onSubmit={handleUpdate}>
                        <TextField
                                className={classes.field}
                                label="Name"
                                variant="outlined"
                                type="text"
                                fullWidth
                                required
                                error={nameError}
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        <TextField
                                className={classes.field}
                                label="Profile URL"
                                variant="outlined"
                                type="email"
                                fullWidth
                                required
                                error={urlError}
                                value={url}
                                onChange={(e)=>setUrl(e.target.value)}
                            />
                        <TextField
                                className={classes.field}
                                label="About"
                                variant="outlined"
                                type="text"
                                multiline
                                rows={8}
                                fullWidth
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            />
                            <Button
                                className={classes.field}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >Update</Button>
                        </form>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
       </Container>
    )
}

export default UpdateProfileInfo
