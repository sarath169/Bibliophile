import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import {
  getProfile,
  getUersReview,
  sendFriendRequestHelper,
} from "../../helpers/ProfileHelper";
import { getUsersBook } from "../../helpers/BookAPICalles";
import BookCard from "../../components/BookCard";
import ReviewCardUser from "../../components/ReviewCardUser";
import user from "../../images/user.png";
import ProfileCardSkeleton from "../../components/Skeleton/ProfileCardSkeleton";
import BookSkeleton from "../../components/Skeleton/BookSkeleton";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "20px",
  },
  profilePicture: {
    height: "200px",
    width: "200px",
    borderRadius: "100px",
  },
  description: {
    textAlign: "justify",
  },
  title: {
    marginBottom: "3px",
  },
  section: {
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
  },
  button: {
    marginTop: "15px",
  },
  link: {
    display: "block",
    marginTop: "10px",
    textAlign: "center",
    padding: "5px",
    backgroundColor: "blue",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    borderRadius: "5px",
  },
  skeletonWraper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [loadingBookShelf, setLoadingBookShelf] = useState(true);
  const [publicUrl, setPublicUrl] = useState("");
  const [userId, setUserId] = useState(0);
  const [profile, setProfile] = useState({});
  const [readList, setReadList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [shelfList, setShelfList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [owner, setOwner] = useState(false);

  const sendFriendRequest = () => {
    sendFriendRequestHelper(userId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigatetoFriendRequests = () => {
    navigate(`/profile/friendrequests/${userId}`);
  };

  const navigatetoFriends = () => {
    navigate(`/profile/friends`);
  };

  const navigateToUpdateInfo = () => {
    navigate(`/profile/updateinfo`);
  };

  useEffect(() => {
    // setReviews([]);
    // setUserId(0);
    const profileUrl = location.pathname;
    setPublicUrl(profileUrl.split("/").at(-1));
    if (publicUrl !== "") {
      getProfile(publicUrl).then((res) => {
        if (res) {
          let profile_id = res.id;
          setUserId(profile_id);
          if (localStorage.getItem("bib_id") === profile_id.toString()) {
            setOwner(true);
          } else {
            setOwner(false);
          }
          setProfile(res);
          setLoading(false);
          setLoadingBookShelf(false);
          getUsersBook(profile_id).then((res) => {
            if (res && profile_id !== 0) {
              for (let i in res) {
                if (i === "RL") setReadList(res[i]);
                else if (i === "WL") setWishList(res[i]);
                else if (i === "SL") setShelfList(res[i]);
              }
            }
          });
          if (profile_id !== 0) {
            getUersReview(profile_id).then((res) => {
              if (res) {
                setReviews(res);
              } else {
                setReviews([]);
              }
            });
          }
        }
      });
    }
  }, [location.pathname, publicUrl, userId]);

  let img_url = "";
  if (profile.profile_picture) {
    img_url = profile.profile_picture;
  } else {
    img_url = user;
  }

  return (
    <Container className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          {loading ? (
            <ProfileCardSkeleton />
          ) : (
            <>
              <img src={img_url} alt="" className={classes.profilePicture} />
              <Typography variant="h5">{profile.name}</Typography>
              <Typography variant="body1">{profile.email}</Typography>
              <Typography variant="caption">
                Public URL: <br />
                <Link to={`${location.pathname}`}>
                  {`localhost:3000${location.pathname}`}
                </Link>
              </Typography>
              {owner ? (
                <>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={navigateToUpdateInfo}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={navigatetoFriendRequests}
                  >
                    Friend Requests
                  </Button>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={navigatetoFriends}
                  >
                    Friends
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={sendFriendRequest}
                  >
                    Add Friend
                  </Button>
                </>
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.title}>
              About
            </Typography>
            {loading ? (
              <Skeleton animation="wave" width={"100%"} height={200} />
            ) : (
              <Typography variant="subtitle1" className={classes.description}>
                {profile.description}
              </Typography>
            )}
          </div>
          <div>
            {(loading || loadingBookShelf) && (
              <div className={classes.skeletonWraper}>
                {[1, 2, 3, 4].map((n) => (
                  <BookSkeleton key={n} />
                ))}
              </div>
            )}
          </div>
          <div>
            {readList.length > 0 && (
              <div className={classes.section}>
                <Typography variant="h6" className={classes.title}>
                  Read List Collection
                </Typography>
                <Grid container spacing={2}>
                  {readList.map((book) => (
                    <Grid key={book.id} item xs={12} sm={3}>
                      <BookCard book={book} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
            {wishList.length > 0 && (
              <div className={classes.section}>
                <Typography variant="h6" className={classes.title}>
                  Wish List Collection
                </Typography>
                <Grid container spacing={2}>
                  {wishList.map((book) => (
                    <Grid key={book.id} item xs={12} sm={3}>
                      <BookCard book={book} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
            {shelfList.length > 0 && (
              <div className={classes.section}>
                <Typography variant="h6" className={classes.title}>
                  Shelf List Collection
                </Typography>
                <Grid container spacing={2}>
                  {shelfList.map((book) => (
                    <Grid key={book.id} item xs={12} sm={3}>
                      <BookCard book={book} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </div>
          <div className={classes.section}>
            {reviews.length > 0 && (
              <>
                <Typography variant="h6" className={classes.title}>
                  Recent Reviews
                </Typography>
                <div>
                  {reviews.map((review, index) => (
                    <ReviewCardUser key={index} review={review} />
                  ))}
                </div>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
