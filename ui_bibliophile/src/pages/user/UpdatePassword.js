import { Button, Card, CardContent, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, {useState } from 'react'
import UpdateLinks from '../../components/UpdateLinks';
import {  } from '../../helpers/ProfileHelper';

const useStyles = makeStyles(()=>({
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

const UpdatePassword = () => {
    const classes = useStyles();
    
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("")
    
    const [response, setResponse] = useState('');


    const handleUpdate = (e) => {
        e.preventDefault();

        let error = false;

        setNewPasswordError(false);
        setConfirmNewPasswordError(false);

        if(newPassword===''){
            setNewPasswordError(true);
            error = true;
        }
        if(confirmNewPassword===''){
            setConfirmNewPasswordError(true);
            error = true;
        }

        if(!error){
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
                        Update Password
                    </Typography>
                    <Typography className={classes.resp}>{response}</Typography>
                    <CardContent>
                        <form noValidate onSubmit={handleUpdate}>
                        <TextField
                                className={classes.field}
                                label="New Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                required
                                error={newPasswordError}
                                value={newPassword}
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />
                        <TextField
                                className={classes.field}
                                label="Confirm New Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                required
                                error={confirmNewPasswordError}
                                value={confirmNewPassword}
                                onChange={(e)=>setConfirmNewPassword(e.target.value)}
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

export default UpdatePassword
