import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { isAuthenticated, signout } from "../helpers/AuthHelper";
import SearchAuto from "./SearchBoth";
import { getProfileById } from "../helpers/ProfileHelper";
import UserSearch from "./UserSearch";


const useStyle = makeStyles((theme) => ({
  logo: {
    display: "inline",
    marginRight: "10px",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoSearch: {
    // display: 'felx',
    // flexGrow: 1
  },
  search: {
    // display: 'inline'
  },
}));

const Navbar = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const location = useLocation();

  const [publicUrl, setPublicUrl] = useState("");
  const bibId = localStorage.getItem("bib_id");

  useEffect(() => {
    if (bibId) {
      getProfileById(localStorage.getItem("bib_id"))
        .then((data) => {
          // console.log("Nav ",data);
          if(data === 401){
            localStorage.removeItem("bib_token");
            localStorage.removeItem("bib_id");
            navigate("/signin")
          } else{
            let profile_url = "/profile/" + data.public_url;
            // console.log("Nav Bar"+profile_url)
            setPublicUrl(profile_url);
          }
        })
        .catch((err) => {
          navigate("/signin");
        });
    }
  }, [bibId]);

  window.onbeforeunload = () => {
    // signout();
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.logoSearch}>
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <Typography variant="h6" className={classes.logo}>
                Bibliophile
              </Typography>
            </Grid>
            <Grid item sm={8}>
              {/* <div className={classes.search}>
                                {
                                    isAuthenticated() && (
                                        <Search />
                                    )
                                }
                            </div> */}
              <div className={classes.search} style={{ marginLeft: "10px" }}>
                {isAuthenticated() && (location.pathname.split("/")[1] === 'profile' ? (
                  <>
                    {/* {console.log("search", "isProfilePage")} */}
                    <UserSearch />
                  </>
                ) : (
                  <SearchAuto />
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
        <div>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {isAuthenticated() ? (
            <>
              <Button color="inherit" component={Link} to="/books">
                Books
              </Button>
              <Button
                color="inherit"
                component={Link}
                to={publicUrl}
                params={{ isProfilePage: true }}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  signout(() => navigate("/"));
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signin">
                Sign In
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
