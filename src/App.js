import React, { useCallback, useEffect } from "react";
import { Header } from "./components/header";
import { GlobalStyled, MainStyle } from "./GlobalStyle";
import { Cards } from "./components/card";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./components/login";
import { NewUser } from "./components/login/newUser";
import { ResetPassword } from "./components/login/resetPassword";

const App = () => {
  const history = useHistory();
  const getUser = useCallback(() => {
    const user = localStorage.getItem("userIdentification");
    if (user === null) {
      history.replace("/login");
    } else {
      history.replace("/");
    }
  }, [history]);

  const logOut = () => {
    localStorage.removeItem("userIdentification");
    history.replace("/login");
  };

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <MainStyle>
      <GlobalStyled />
      <Header logOut={logOut} />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Cards />
        </Route>
        <Route path="/registration">
          <NewUser />
        </Route>
        <Route path="/resetpassword">
          <ResetPassword />
        </Route>
      </Switch>
    </MainStyle>
  );
};

export default App;
