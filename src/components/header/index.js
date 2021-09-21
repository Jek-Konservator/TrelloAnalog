import React from "react";
import { StyledHeader } from "./style";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

export const Header = () => {


  const LogOut = () => {
   localStorage.clear()
    sessionStorage.clear()
  };

  return (
    <StyledHeader>
      <div>Логин</div>
      <div>Дата</div>
      <div onClick={LogOut}>Выйти</div>
    </StyledHeader>
  );
};
