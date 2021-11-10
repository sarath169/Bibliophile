import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import NavBar from "./Containers/NavBar";
import Login from "./Auth/Login/index";
import SignUp from "./Auth/SingUp/index";
import Home from "./Containers/Home";

import { UserProvider } from "./Components/UserContext";
import SearchResult from "./Containers/SearchResult";
import BookDetails from "./Containers/BookDetails";
import SendOtp from "./Containers/SendOtp";
import ValidateOtp from "./Containers/ValidateOtp";
import ForgotPassword from "./Containers/ForgotPassword";

function App() {
  const history = useHistory();

  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const providerValue = useMemo(
    () => ({
      token,
      setToken,
      searchResult,
      setSearchResult,
      userEmail,
      setUserEmail,
    }),
    [token, setToken, searchResult, setSearchResult, userEmail, setUserEmail]
  );
  return (
    <div>
      <BrowserRouter>
        <UserProvider value={providerValue}>
          <NavBar />
          <div className="">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/search">
                <SearchResult />
              </Route>
              <Route exact path="/details">
                <BookDetails />
              </Route>
              <Route exact path="/sendotp">
                <SendOtp />
              </Route>
              <Route exact path="/validateotp">
                <ValidateOtp />
              </Route>
              <Route exact path="/forgotpassword">
                <ForgotPassword />
              </Route>
            </Switch>
          </div>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
