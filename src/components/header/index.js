import React, { useState } from "react";
import { StyledHeader } from "./style";
import { Button } from "@material-ui/core";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

export const Header = () => {
  const [users, setUser] = useState([]);

  const huisosnya = async () => {
    const { data } = await axios.get(`/api/getUsers`);
    // setUser(data);
    console.log(data, "<=res");
  };

  const body = {
    idUser: "a39ebc39-9c0b-4ef8-bb6d-6bb9bd380a22",
    login: "ke1_rotwavresnoK",
    password: "qwf2qwwfqwfqwqfwqfwwfqwf!@rfw",
    role: "Huilusha",
  };
  const createUser = async () => {
    await axios.post(`/api/createUser`, body);
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
