import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";

import { UserContext } from "../Components/UserContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/auth/",
});

export default function NavBar() {
  const history = useHistory();

  const { token, setToken, searchResult, setSearchResult, userEmail } =
    useContext(UserContext);
  const [input, setInput] = useState("");
  const homeView = () => {
    history.push("/home");
  };
  const signupView = () => {
    history.push("/signup");
  };
  const loginView = () => {
    history.push("/");
  };
  const searchResultView = () => {
    history.push("/search");
  };
  const Detail = () => {
    history.push("/detail");
  };
  const logoutView = () => {
    const url = "logout/";
    const formdata = new FormData();
    formdata.append("user", userEmail);
    axiosInstance
      .post(url, formdata)
      .then(function (response) {
        console.log(response.data);
        setToken(null);
        history.push("/");
        // setUsers(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const searchChangeHandler = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };
  const handleBookSearch = async (event) => {
    // search = event.target.value
    console.log(event);
    console.log(input);
    try {
      if (input) {
        // https://www.googleapis.com/books/v1/volumes?q=harrypotter&download=epub&key=AIzaSyDyxUzn7KYQ1j5_lZIQbz0PUxJrzKFHU2w
        const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${input}&download=epub&maxResults=12&key=AIzaSyDyxUzn7KYQ1j5_lZIQbz0PUxJrzKFHU2w`;
        axios
          .get(API_URL)
          .then(function (response) {
            console.log(response.data.items);
            setSearchResult(response.data.items);
            history.push("/search");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Bibliophile
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={searchChangeHandler}
            />
            <Button color="inherit" onClick={handleBookSearch}>
              Search
            </Button>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={signupView}>
              Signup
            </Button>
            {token ? (
              <Button color="inherit" onClick={logoutView}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={loginView}>
                Login
              </Button>
            )}
          </Typography>
          {/* <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box> */}
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}