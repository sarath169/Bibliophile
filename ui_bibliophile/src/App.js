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
          <Route path="/bookdetails" element={<BookDetails />} />

          <Route path='/' element={<ProtectedRoute />} >
            <Route path='/books' element={<Books/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/searchresult' element={<SearchResult/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
