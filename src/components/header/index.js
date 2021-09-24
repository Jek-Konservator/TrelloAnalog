import React from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { BoardMenu } from "../tables and tasks/boardsMenu";

axios.defaults.baseURL = "http://localhost:3001/";
 // TODO: Сюда просто прокинь компонет типа SIdeBar или шо то такое, и там внутри него сделай логику, и всё будет гуд и прокинь туда открытие закрытие
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
