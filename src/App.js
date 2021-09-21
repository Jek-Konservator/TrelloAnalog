import React, {useCallback, useEffect, useState} from "react";
import { Header } from "./components/header";
import { GlobalStyled, MainStyle, theme } from "./GlobalStyle";
import { Cards } from "./components/card";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./components/login";
import { NewUser } from "./components/login/newUser";
import { ResetPassword } from "./components/login/resetPassword";
import { UserContext } from "./context";
import {ThemeProvider} from "styled-components";

const App = () => {
  const [userId, setUserId] = useState("");

  const history = useHistory();
  const getUser = useCallback(() => {
    const userLocalStorage = localStorage.getItem("userIdentification");
    const userSessionStorage = sessionStorage.getItem("userIdentification");
    if (userLocalStorage === null && userSessionStorage === null) {
      history.replace("/login");
    } else {
      setUserId()
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
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ getUser }}>
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
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
