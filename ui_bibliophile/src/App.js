import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import ProtectedRoute from './helpers/ProtectedRoute';
import BookDetails from './pages/book/BookDetails';
import Books from './pages/book/Books';
import SearchResult from './pages/book/SearchResult';
import Home from './pages/Home';
import Profile from './pages/user/Profile';
import SignIn from './pages/user/SignIn';
import SignUp from './pages/user/SignUp';
import UpdatePassword from './pages/user/UpdatePassword';
import UpdateProfileInfo from './pages/user/UpdateProfileInfo';
import UpdateProfilePicture from './pages/user/UpdateProfilePicture';
import VerifyUser from './pages/user/VerifyUser';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyuser" element={<VerifyUser />} />
          <Route path="/books/:seoId" element={<BookDetails />} />
          <Route path='/profile/:publicUrl' element={<Profile/>} />

          <Route path='/' element={<ProtectedRoute />} >
            <Route path='/books' element={<Books/>} />
            <Route path='/profile/updateinfo' element={<UpdateProfileInfo/>} />
            <Route path='/profile/updatepicture' element={<UpdateProfilePicture/>} />
            <Route path='/profile/updatepassword' element={<UpdatePassword/>} />
            <Route path='/search/:searchKey' element={<SearchResult/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
