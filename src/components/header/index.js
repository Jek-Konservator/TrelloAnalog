import React, { useCallback, useEffect } from "react";
import { StyledHeader } from "./style";
import axios from "axios";
import { useHistory } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3001/";

export const Header = () => {
  const history = useHistory();

  const getUser = useCallback(() => {
    const user = localStorage.getItem("userIdentification");
    if (user === null) {
      history.replace("/login");
    } else {
      history.replace("/");
    }
  }, [history]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  /* const body = {
    login: "ke1_rotwavresnoK",
    password: "qwf2qwwfqwfqwqfwqfwwfqwf!@rfw",
    role: "Huilusha",
  };

  const createUser = () => {
    axios.post(`/api/createUser`, body);
  };*/

  return (
    <StyledHeader>
      <div>Логин</div>
      <div>Дата</div>
      <div>Выйти</div>
    </StyledHeader>
  );
};
