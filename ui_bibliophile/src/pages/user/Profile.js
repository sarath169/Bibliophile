import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Grid, Typography, makeStyles, Button } from "@material-ui/core";
import {
  getProfile,
  getUersReview,
  getUersPagedReview,
} from "../../helpers/ProfileHelper";
import { getUsersBook } from "../../helpers/BookAPICalles";
import BookCard from "../../components/BookCard";
import ReviewCardUser from "../../components/ReviewCardUser";
import user from "../../images/user.png";
import InfiniteScroll from "react-infinite-scroll-component";
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
  skeletonWraper:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
}));

const Profile = () => {
  const location = useLocation();
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
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchNext = async () => {
    if (pageNumber <= totalPages || pageNumber === 1) {
      setLoading(true);
      await getUersPagedReview(userId, pageNumber)
        .then((res) => {
          if (res) {
            setLoading(false);
            setReviews([...reviews, ...res]);
          }
          setPageNumber(pageNumber + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  const sendFriendRequest = () => {

  }

  useEffect(() => {
    const profileUrl = location.pathname;
    setPublicUrl(profileUrl.split("/").at(-1));
    if (publicUrl !== "") {
      setTimeout(() => {
        getProfile(publicUrl).then((res) => {
          if (localStorage.getItem("bib_id") === String(res.id)) {
            setOwner(true);
          }
          setUserId(res.id);
          if (res) {
            setProfile(res);
            getUsersBook(userId).then((res) => {
              if (res && userId !== 0) {
                for (let i in res) {
                  if (i === "RL") setReadList(res[i]);
                  else if (i === "WL") setWishList(res[i]);
                  else if (i === "SL") setShelfList(res[i]);
                }
                setLoadingBookShelf(false);
                fetchNext().then(() => {
                  getUersReview(userId).then((res) => {
                    if (res) {
                      setTotalPages(Math.ceil(res.length / 2));
                    }
                  });
                });
              }
            });
          }
        });
      }, 1000);
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
                <Link to="/profile/updateinfo" className={classes.link}>
                  Edit Profile
                </Link>
                <Link to="/progile/friendrequests" className={classes.link}>
                  Friend Requests
                  </Link>
                  </>
              ) : (<>
              <Button
            // className={classes.field}
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendFriendRequest()}
          >
            Add Friend
          </Button>
          
              </>)}
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          <div className={classes.section}>
            <Typography variant="h6" className={classes.title}>
              About
            </Typography>
            {
              loading ? (
                <Skeleton animation="wave" width={'100%'} height={200} />
              ) : (
                <Typography variant="subtitle1" className={classes.description}>
                  {profile.description}
                </Typography>
              )
            }
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
                  <InfiniteScroll
                    dataLength={reviews.length}
                    next={fetchNext}
                    hasMore={true}
                    loader={""}
                    className={classes.incr}
                  >
                    {reviews.map((review, index) => (
                      <ReviewCardUser key={index} review={review} />
                    ))}
                  </InfiniteScroll>
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
