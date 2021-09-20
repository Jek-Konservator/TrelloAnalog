import React, { useContext, useEffect} from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {UserContext} from "../../context";
axios.defaults.baseURL = "http://localhost:3001/";

export const Header = () => {
  const history = useHistory();
  const {getUser} = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, [getUser]);

  /* const body = {
    login: "ke1_rotwavresnoK",
    password: "qwf2qwwfqwfqwqfwqfwwfqwf!@rfw",
    role: "Huilusha",
  };*/

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
