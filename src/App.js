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
    const userLocalStorage = localStorage.getItem("userIdentification");
    const userSessionStorage = sessionStorage.getItem("userIdentification");
    if (userLocalStorage === null && userSessionStorage === null) {
      history.replace("/login");
    } else {
      history.replace("/");
    }
  }, [history]);

  const logOut = () => {
    localStorage.removeItem("userIdentification");
    sessionStorage.removeItem("userIdentification");
    history.replace("/login");
  };

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <MainStyle>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
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
