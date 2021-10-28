import React, { useMemo, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import NavBar from "./Containers/NavBar"
import Login from "./Auth/Login/index";
import SignUp from "./Auth/SingUp/index";

import { UserProvider } from "./Components/UserContext";

function App() {
  const history = useHistory();

  const [token, setToken] = useState(null);

  const providerValue = useMemo(() => ({ token, setToken }), [token, setToken]);
  return (
    <div>
      <BrowserRouter>
        <UserProvider value={providerValue}>
          <NavBar />
          <div className="">
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              {/* <Route exact path="/sendotp">
                <SendOtp />
              </Route> */}
              {/* <Route exact path="/validateotp">
                <ValidateOtp />
              </Route> */}
              {/* <Route exact path="/forgotpassword">
                <ForgotPassword />
              </Route> */}
              {/* <Route exact path="/stats">
                <UserStats />
              </Route> */}
            </Switch>
          </div>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
