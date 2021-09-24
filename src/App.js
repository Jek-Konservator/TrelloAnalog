import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { GlobalStyled, MainStyle, theme } from "./GlobalStyle";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./components/login";
import { NewUser } from "./components/login/newUser";
import { ResetPassword } from "./components/login/resetPassword";
import { UserContext } from "./context";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import {Board} from "./components/tables and tasks/board";
import {Main} from "./components/main";

const App = () => {
  const [userId, setUserId] = useState("");
  const [emailUser, setEmailUser] = useState("");

  const history = useHistory();

  const getUser = useCallback(async () => {
    const userLocalStorage = localStorage.getItem("user");
    const userSessionStorage = sessionStorage.getItem("user");
    if (userLocalStorage === null && userSessionStorage === null) {
      history.replace("/login");
    } else if (userLocalStorage !== null) {
      const { data } = await axios.get(`/api/getUserInfo/${userLocalStorage}`);
      setUserId(data.id);
      setEmailUser(data.email);
    } else if (userSessionStorage !== null) {
      const { data } = await axios.get(
        `/api/getUserInfo/${userSessionStorage}`
      );
      setUserId(data.id);
      setEmailUser(data.email);
    }
  }, [history]);

   useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ getUser, userId, emailUser }}>
        <MainStyle>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
            rel="stylesheet"
          />
          <GlobalStyled />
          <Header/>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route path="/registration">
              <NewUser />
            </Route>
            <Route path="/resetpassword">
              <ResetPassword />
            </Route>
            <Route path="/boards/:idBoard">
              <Board />
            </Route>
          </Switch>
        </MainStyle>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
