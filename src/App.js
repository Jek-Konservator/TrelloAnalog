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
    const userStorage = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : sessionStorage.getItem("user")
      ? sessionStorage.getItem("user")
      : null;

    if (userStorage) {
      await axios
        .get(`/api/getUserInfo/${userStorage}`)
        .then(({ data }) => {
          data.completed && setUser(data);
        })
        .catch((err) => {
          history.replace("/login");
          setUser(null);
          console.log("ошибка авторизации", err);
        });
    } else {
      setUser(null);
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

// TODO: КОММИТЫ С НАЗВАНИЯМИ ТОДО ЖДУ

// TODO: добавить загрузку картинок
// TODO: сделать норм стили и фиксануть баги по ui которые я в телеге тебе отписал ( закреплённое сообщение в диа)
// TODO: добавить поиск и фильтрацию в строке,
//  после название доски поиск и потом кнопка с фильтрами и
//  там выбираю почему фильтровать
//  ( хештеги которые могут быть у каждой карточки и будут отображаться фиксированно снизу
// TODO: сделай нормальную обработку ошибок и вывод сообщений и перепеши уже на тернарки блядский гет юзер на 505 строк)
// TODO: а да, нейминги давай нормальные к свойстам объекта и функциям, какой нахуй ренейм тейбл, и таск.таск  юзер.юзер
// TODO: сортировка(Переделать fain().sort(time : 1||-1).exec(()=>(docs)))
