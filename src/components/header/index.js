import React, { useState } from "react";
import { StyledHeader } from "./style";
import { Button } from "@material-ui/core";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

export const Header = () => {

  const body = {
    login: "ke1_rotwavresnoK",
    password: "qwf2qwwfqwfqwqfwqfwwfqwf!@rfw",
    role: "Huilusha",
  };

  const createUser = () => {
    axios.post(`/api/createUser`, body);
  };

  const creats = async () => {
    const a = axios.get(`/api/creates`);
    console.log(a)
  };

  return (
    <StyledHeader>
      <div>Логин</div>
      <div>Дата</div>
      <div>Выйти</div>
      <Button onClick={createUser}>ХУй</Button>
    </StyledHeader>
  );
};
