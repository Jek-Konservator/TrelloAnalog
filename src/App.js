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
      // TODO: потом перепиши это на тернарки, сократишь код в 2 раза const {data} = userLocalStorage !== null ? await axios.get(`/api/getUserInfo/${userLocalStorage}`) : await axios.get(`/api/getUserInfo/${userSessionStorage}`)
      // TODO: я думаю ты понял о чем я
      const { data } = await axios.get(`/api/getUserInfo/${userLocalStorage}`);
      if (data.completed) {
        setUser(data);
      }
    } else if (userSessionStorage !== null) {
      const { data } = await axios.get(
        `/api/getUserInfo/${userSessionStorage}`
      );
      if (data.completed) {
        setUser(data);
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


// TODO: добавить загрузку картинок


// TODO: добавить поиск и фильтрацию в строке,
//  после название доски поиск и потом кнопка с фильтрами и
//  там выбираю почему фильтровать
//  ( хештеги которые могут быть у каждой карточки и будут отображаться фиксированно снизу

// TODO: сделать норм стили и фиксануть баги по ui которые я в телеге тебе отписал ( закреплённое сообщение в диа)

// TODO: сделай нормальную обработку ошибок и вывод сообщений и перепеши уже на тернарки блядский гет юзер на 505 строк)

// TODO: