import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Box, Container, Grid, TextField, Card, CardContent, Button, Typography, makeStyles } from '@material-ui/core';
import { signin, isAuthenticated } from '../../helpers/AuthHelper';

const useStyle = makeStyles((theme) => ({
    card:{
        marginTop: '25px',
        minWidth: '450px',
        padding: '5px'
    },
    avatar: {
        height: '100px',
        width: '100px'
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

const SignIn = () => {
    const classes = useStyle();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [response, setResponse] = useState('');

    if(isAuthenticated()){
        console.log("Authenticated");
        navigate("/"); 
        // return null;
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);

        if(email===''){
            setEmailError(true);
        }
        if(password===''){
            setPasswordError(true);
        }
        if(email&&password){
            signin(email, password)
            .then(res => {
                if(res.status === 'success'){
                    navigate("/");
                } else {
                    setResponse(res.message);
                }
            })
            .catch(err => console.log(err));
        }
        setEmail('');
        setPassword('');
    }

    return (
        <Container>
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4} >
                <Card className={classes.card} variant="outlined">
                    
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Avatar className={classes.avatar} />
                    </Box>
                    <Typography variant="h4" className={classes.title}>
                        Sign In
                    </Typography>
                    <Typography className={classes.resp}>{response}</Typography>
                    <CardContent>
                        <form noValidate onSubmit={handleSignIn}>
                            <TextField
                                className={classes.field}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                error={emailError}
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <TextField
                                className={classes.field}
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                required
                                error={passwordError}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <Button
                                className={classes.field}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >Sign In</Button>
                        </form>
                        <div className={classes.links}>
                            <Link to="/signup" className={classes.link}>New Registration</Link>
                            <Link to="#" className={classes.link}>Forget Password</Link>
                            <Link to="/verifyuser" className={classes.link}>Verify Account</Link>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </Container>
    )
}

export default SignIn
