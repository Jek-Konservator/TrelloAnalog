import React, { useCallback, useEffect } from "react";
import { StyledHeader } from "./style";
import { Button } from "@material-ui/core";
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

  const creats = () => {
    localStorage.setItem("asd", 123);
  };

  return (
    <StyledHeader>
      <div>Логин</div>
      <div>Дата</div>
      <div>Выйти</div>
      <Button onClick={creats}>ХУй</Button>
    </StyledHeader>
  );
};
