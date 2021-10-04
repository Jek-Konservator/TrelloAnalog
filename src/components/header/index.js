import React, { useContext } from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { BoardMenu } from "../Board/boardsMenu/boardsMenu";
import { UserContext } from "../../context";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001/";
export const Header = () => {
  const history = useHistory()

  const { getUser } = useContext(UserContext);

  const LogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    getUser();
  };
  const toMain = () => {
    history.replace("/")
  };

  return (
    <div>
      <StyledHeader>
        <BoardMenu />
        <Button onClick={toMain}>ГЛАВНАЯ</Button>
        <div style={{ cursor: "pointer" }} onClick={LogOut}>
          Выйти
        </div>
      </StyledHeader>
    </div>
  );
};
