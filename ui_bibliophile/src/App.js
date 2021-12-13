import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./helpers/ProtectedRoute";
import BookDetails from "./pages/book/BookDetails";
import Books from "./pages/book/BooksInfinite";
import SearchResult from "./pages/book/SearchResult";
import Home from "./pages/Home";
import Profile from "./pages/user/Profile";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import UpdatePassword from "./pages/user/UpdatePassword";
import UpdateProfileInfo from "./pages/user/UpdateProfileInfo";
import UpdateProfilePicture from "./pages/user/UpdateProfilePicture";
import VerifyEmail from "./pages/user/VerifyEmail";
import VerifyUser from "./pages/user/VerifyUser";
import ChangePassword from "./pages/user/ChangePassword";
import SocialShare from "./components/SocialShare";
import UserResults from "./pages/user/UserResults";
import FriendRequests from "./pages/user/FriendRequests";
import Friends from "./pages/user/Friends";
import RegistrationSuccess from "./pages/user/RegistrationSuccess"

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/verifyuser" element={<VerifyUser />} />
          <Route path="/books/:seoId" element={<BookDetails />} />
          <Route path="/profile/:publicUrl" element={<Profile />} />
          <Route path="/socialshare" element={<SocialShare />} />
          <Route path="/success" element={<RegistrationSuccess/>}/>

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/books" element={<Books />} />
            <Route path="/profile/updateinfo" element={<UpdateProfileInfo />} />
            <Route
              path="/profile/updatepicture"
              element={<UpdateProfilePicture />}
            />
            <Route
              path="/profile/updatepassword"
              element={<UpdatePassword />}
            />
            <Route path="/search/:searchKey" element={<SearchResult />} />
            <Route
              path="/profile/search/:searchKey"
              element={<UserResults />}
            />
            <Route
              path="/profile/friendrequests"
              element={<FriendRequests />}
            />
          </Route>
          <Route
              path="/profile/friends"
              element={<Friends />}
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
