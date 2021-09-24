import React from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { BoardMenu } from "../tables and tasks/boardsMenu";

axios.defaults.baseURL = "http://localhost:3001/";

export const Header = () => {
  const LogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div>
      {(localStorage.getItem("user") !== null ||
        sessionStorage.getItem("user") !== null) && (
        <StyledHeader>
          <BoardMenu />
          <div>Логин</div>
          <div>Дата</div>
          <div onClick={LogOut}>Выйти</div>
        </StyledHeader>
      )}
    </div>
  );
};
