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

    let { data } =
      userLocalStorage !== null
        ? await axios.get(`/api/getUserInfo/${userLocalStorage}`)
        : userSessionStorage !== null
        ? await axios.get(`/api/getUserInfo/${userSessionStorage}`)
        : "";

    if (data) {
      data.completed && setUser(data);
    } else {
      history.replace("/login");
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
          {user && <Header />}
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

// TODO: а да, нейминги давай нормальные к свойстам объекта и функциям, какой нахуй ренейм тейбл, и таск.таск  юзер.юзер
