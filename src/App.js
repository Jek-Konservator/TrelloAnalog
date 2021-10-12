import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { GlobalStyled, StyleMain, theme } from "./styles/GlobalStyle";
import { Route, Switch, useHistory } from "react-router-dom";
import { Login } from "./components/login";
import { NewUser } from "./components/login/newUser";
import { ResetPassword } from "./components/login/resetPassword";
import { UserContext } from "./context";
import axios from "axios";

import { Main } from "./components/main";
import { Board } from "./components/Board";
import { ThemeProvider } from "@mui/material";
import { SnackBar } from "./components/Snackbar";

const App = () => {
  const [user, setUser] = useState(null);
  const [dataSnackBar, setDataSnackBar] = useState({});

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

  console.log(dataSnackBar);

  return (
    <UserContext.Provider value={{ getUser, user, setDataSnackBar }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
      <GlobalStyled />

      <SnackBar
        type={dataSnackBar.type}
        massage={dataSnackBar.massage}
        open={true}
      />
      <Switch>
        <StyleMain>
          {user && <Header />}
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </StyleMain>
      </Switch>
    </UserContext.Provider>
  );
};

export default App;

// TODO: КОММИТЫ С НАЗВАНИЯМИ ТОДО ЖДУ

// TODO: добавить загрузку картинок
// TODO: сделать норм стили и фиксануть баги по ui которые я в телеге тебе отписал ( закреплённое сообщение в диа)
// TODO: сделай нормальную обработку ошибок и вывод сообщений и перепеши уже на тернарки блядский гет юзер на 505 строк)
// TODO: а да, нейминги давай нормальные к свойстам объекта и функциям, какой нахуй ренейм тейбл, и таск.таск  юзер.юзер
// TODO: сортировка(Переделать fain().sort(time : 1||-1).exec(()=>(docs)))
