import React from "react";
import { Header } from "./components/header";
import { GlobalStyled, MainStyle } from "./GlobalStyle";
import { Cards } from "./components/card";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/login";
import {NewUser} from "./components/login/newUser";
import {ResetPassword} from "./components/login/resetPassword";

const App = () => {
  return (
    <Router>
      <MainStyle>
        <GlobalStyled />
        <Header />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Cards />
          </Route>
          <Route exact path="/registration">
            <NewUser />
          </Route>
          <Route exact path="/resetpassword">
            <ResetPassword />
          </Route>
        </Switch>
      </MainStyle>
    </Router>
  );
};

export default App;
