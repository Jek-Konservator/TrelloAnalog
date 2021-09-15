import React from "react";
import { Header } from "./components/header";
import { GlobalStyled, MainStyle } from "./GlobalStyle";
import { Cards } from "./components/card";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

  return (
    <Router>
      <MainStyle>
        <GlobalStyled />
        <Header />
        <Switch>
          <Route exact path="/">
            <Cards />
          </Route>
            <Route exact path="/">
            <Cards />
          </Route>
        </Switch>
      </MainStyle>
    </Router>
  );
};

export default App;
