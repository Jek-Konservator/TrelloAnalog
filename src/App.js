import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./components/header";
import { GlobalStyled, MainStyle, theme } from "./GlobalStyle";
import { Tables } from "./components/main";
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
      <UserContext.Provider value={{ getUser, userId, emailUser }}>
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
            </Route>
            <Route path="/registration">
              <NewUser />
            </Route>
            <Route path="/resetpassword">
              <ResetPassword />
            </Route>
            <Route path="/tables/:idTAbles">
              <Table />
            </Route>
          </Switch>
        </MainStyle>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
