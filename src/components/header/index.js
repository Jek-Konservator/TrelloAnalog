import React, { useContext, useEffect} from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import {UserContext} from "../../context";
axios.defaults.baseURL = "http://localhost:3001/";

export const Header = () => {
  const {getUser} = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, [getUser]);


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
