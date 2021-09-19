import React, { useCallback, useEffect } from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3001/";
// TODO: перенести бейз юрл в апп
// отсутствие лишнего кода в комментариях  ( ну если это конечно не какой то пиздец
// на странице логина и регистрации и "забыл пароль" не должно быть хедера

export const Header = ({ logOut }) => {
  return (
    <StyledHeader>
      <div>Логин</div>
      <div>Дата</div>
      <div onClick={logOut}>Выйти</div>
    </StyledHeader>
  );
};
