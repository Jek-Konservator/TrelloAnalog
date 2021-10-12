import React, { useContext } from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { BoardMenu } from "../Board/boardsMenu";
import { UserContext } from "../../context";
import { useHistory } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001/";
export const Header = () => {
  const history = useHistory();

  const { getUser } = useContext(UserContext);

  const LogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    getUser();
  };
  const toMain = () => {
    history.replace("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledHeader>
        <BoardMenu />
        <div style={{ cursor: "pointer" }} onClick={toMain}>
          ГЛАВНАЯ
        </div>
        <div style={{ cursor: "pointer" }} onClick={LogOut}>
          ВЫЙТИ
        </div>
      </StyledHeader>
    </div>
  );
};
