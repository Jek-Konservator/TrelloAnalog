import React, {useState} from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { TablesMenu } from "../main";
import {Button} from "@mui/material";
axios.defaults.baseURL = "http://localhost:3001/";
 // TODO: Сюда просто прокинь компонет типа SIdeBar или шо то такое, и там внутри него сделай логику, и всё будет гуд и прокинь туда открытие закрытие
export const Header = () => {
    const [openTableMenu, setOpenTableMenu] = useState(false);
  const LogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
  };
  const openTableMenuut = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <StyledHeader>
        <Button onClick={setOpenTableMenu}/>
      <div>Логин</div>
      <div>Дата</div>
      <div onClick={LogOut}>Выйти</div>
      <TablesMenu />
    </StyledHeader>
  );
};
