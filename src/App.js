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
import { Table } from "./components/main/table";
// TODO: стейT можно хранить в объекте const [user, setUser] = useState({name:"oleg",age:19});
// TODO: опять же нейминги, и не ДОпускай ТАкого ПОтому ЧТо КАк нибудть ПРоебёшься и разбей по папкам всё в мейне ( MainPage)
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
      // потом перепиши это на тернарки, сократишь код в 2 раза const {data} = userLocalStorage !== null ? await axios.get(`/api/getUserInfo/${userLocalStorage}`) : await axios.get(`/api/getUserInfo/${userSessionStorage}`)
      // я думаю ты понял о чем я
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
