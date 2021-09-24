import React, { useContext } from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { BoardMenu } from "../Board/boardsMenu";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context";

axios.defaults.baseURL = "http://localhost:3001/";
// TODO: Сюда просто прокинь компонет типа SIdeBar или шо то такое, и там внутри него сделай логику, и всё будет гуд и прокинь туда открытие закрытие
export const Header = () => {
  const { getUser } = useContext(UserContext);

  const LogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    getUser();
  };

  return (
    <div>
      <StyledHeader>
        <BoardMenu />
        <div>Логин</div>
        <div>Дата</div>
        <div style={{ cursor: "pointer" }} onClick={LogOut}>
          Выйти
        </div>
      </StyledHeader>
    </div>
  );
};
