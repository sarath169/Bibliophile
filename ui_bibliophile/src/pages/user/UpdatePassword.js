import { Button, Card, CardContent, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, {useState } from 'react'
import UpdateLinks from '../../components/UpdateLinks';
import { updatePassword } from '../../helpers/ProfileHelper';

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
    }
}))

const UpdatePassword = () => {
    const classes = useStyles();
    
    const [oldPassword, setOldPassword] = useState("")
    const [oldPasswordError, setOldPasswordError] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false)
    
    const [response, setResponse] = useState('');
    const [textColor, setTextColor] = useState('red');


    const handleUpdate = (e) => {
        e.preventDefault();
        setResponse("");

        let error = false;

        setOldPasswordError(false);
        setNewPasswordError(false);
        setConfirmNewPasswordError(false);

        if(oldPassword === ''){
            setOldPasswordError(true);
            error = true;
        }
        if(newPassword===''){
            setNewPasswordError(true);
            error = true;
        }
        if(confirmNewPassword===''){
            setConfirmNewPasswordError(true);
            error = true;
        }

        if(newPassword !== confirmNewPassword){
            setResponse("New Password and confirm new password must be same");
            setTextColor('red');
            setConfirmNewPasswordError(true);
            error = true;
        }

        if(!error){
            updatePassword(oldPassword, newPassword)
            .then(res=>{
                setResponse(res.message);
                if(res.status === 'success'){
                    setTextColor('green');
                } else {
                    setTextColor('red');
                }

            })
            .catch(err => {
                console.log(err);
            })
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
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
                    <Typography className={classes.resp} style={{color: textColor}}>{response}</Typography>
                    <CardContent>
                        <form noValidate onSubmit={handleUpdate}>
                        <TextField
                                className={classes.field}
                                label="Old Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                required
                                error={oldPasswordError}
                                value={oldPassword}
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
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
