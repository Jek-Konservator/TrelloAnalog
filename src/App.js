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
import axios from "axios";

const App = () => {
  const [userId, setUserId] = useState("");

  const history = useHistory();
  const getUser = useCallback( async () => {
    const userLocalStorage = localStorage.getItem("user");
    const userSessionStorage = sessionStorage.getItem("user");
    if (userLocalStorage === null && userSessionStorage === null) {
      history.replace("/login");
    } else if (userLocalStorage !== null) {
      const {data} = await axios.get(`/api/getUserInfo/${userLocalStorage}`)
      console.log(data)
      setUserId(data)
      history.replace("/");
    }
    else if (userSessionStorage !== null) {
      const {data} = await axios.get(`/api/getUserInfo/${userSessionStorage}`)
      console.log(data)
      setUserId(data)
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
  }, [getUser, history]);
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
