import React from "react";
import { Header } from "./components/header";
import {GlobalStyled, MainStyle} from "./GlobalStyle";
import {Cards} from "./components/card";

const App = () => {
  return (
    <MainStyle>
        <GlobalStyled/>
      <Header />
      <Cards/>
    </MainStyle>
  );
};

export default App;
