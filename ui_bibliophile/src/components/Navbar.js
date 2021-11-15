import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AppBar, Button, makeStyles, Toolbar, Typography} from '@material-ui/core'
import { isAuthenticated, signout } from '../helpers/AuthHelper'
import Search from './Search'


const useStyle = makeStyles((theme) => ({
    logo:{
        display: 'inline',
        marginRight: '10px'
    },
    toolbar:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoSearch:{
        display: 'felx',
        flexGrow: 1
    },
    search: {
        display: 'inline'
    }
}))



const Navbar = () => {
    const classes = useStyle();
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <div className={classes.logoSearch}>
                    <Typography variant="h6" className={classes.logo}>
                        Bibliophile
                    </Typography>
                    <div className={classes.search}>
                        {
                            isAuthenticated() && (
                                <Search />
                            )
                        }
                    </div>
                </div>
                <div>
                    <Button color='inherit' component={Link} to="/" >Home</Button>
                    {
                        isAuthenticated() ? (
                            <>
                                <Button color='inherit' component={Link} to="/books">Books</Button>
                                <Button color='inherit' component={Link} to="/profile">Profile</Button>
                                <Button color='inherit' onClick={()=>{signout(()=> navigate("/"))}}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button color='inherit' component={Link} to="/signin" >Sign In</Button>
                                <Button color='inherit' component={Link} to="/signup" >Sign Up</Button>
                            </>
                        )
                    }
                    
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
