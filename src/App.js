import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { GlobalStyled, MainStyle, theme } from "./styles/GlobalStyle";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./components/login";
import { NewUser } from "./components/login/newUser";
import { ResetPassword } from "./components/login/resetPassword";
import { UserContext } from "./context";
import { ThemeProvider } from "styled-components";
import axios from "axios";

import { Main } from "./components/main";
import { Board } from "./components/Board";

// TODO: стейT можно хранить в объекте const [user, setUser] = useState({name:"oleg",age:19});
// TODO: опять же нейминги, и не ДОпускай ТАкого ПОтому ЧТо КАк нибудть ПРоебёшься и разбей по папкам всё в мейне ( MainPage)

const App = () => {
  const [user, setUser] = useState(null);

  const history = useHistory();

  const getUser = useCallback(async () => {
    const userLocalStorage = localStorage.getItem("user");
    const userSessionStorage = sessionStorage.getItem("user");
    if (userLocalStorage === null && userSessionStorage === null) {
      setUser(null);
      history.replace("/login");
    } else if (userLocalStorage !== null) {
      // потом перепиши это на тернарки, сократишь код в 2 раза const {data} = userLocalStorage !== null ? await axios.get(`/api/getUserInfo/${userLocalStorage}`) : await axios.get(`/api/getUserInfo/${userSessionStorage}`)
      // я думаю ты понял о чем я
      const { data } = await axios.get(`/api/getUserInfo/${userLocalStorage}`);
      if (data.completed) {
        setUser(data);
      }
    } else if (userSessionStorage !== null) {
      const { data } = await axios.get(
        `/api/getUserInfo/${userSessionStorage}`
      );
      if (data.completed) {
        setUser(data.user);
      }
    }
  }, [history]);

  useEffect(() => {
    getUser();
  }, [getUser, history]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ getUser, user }}>
        <MainStyle>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
            rel="stylesheet"
          />
          <GlobalStyled />
          {user !== null && <Header />}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Main />
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
