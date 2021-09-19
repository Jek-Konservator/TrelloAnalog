import React, { useCallback, useEffect, useState } from "react";
import { StyledLoadingCardTitle, StyledLogin } from "./style";
import { Card } from "@material-ui/core";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import useStyles from "../../styledMUI";
import { LoginEmail } from "./loginEmail";
import { LoginNumber } from "./loginNumber";
import { useHistory } from "react-router-dom";
import axios from "axios";
//TODO: тут я думаю ты сам всё понимаешь
export const Login = () => {
  const history = useHistory();

  const getUser = useCallback(() => {
    const user = localStorage.getItem("userIdentification");
    if (user !== null) {
      history.replace("/");
    }
  }, [history]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const classes = useStyles();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmitNewUser = (values) => {
    //axios.post(`/api/createUser`, formData);
    /*localStorage.setItem("userIdentification", true)*/
  };
  const getUsersNumber = (values) => {
    console.log(values);
    //axios.get(`/api/getUsersNumbe`, formData);
    /*localStorage.setItem("userIdentification", true)*/
  };
  const getUsersEmail = (values) => {
    console.log(values);
    //axios.get(`/api/getUsersEmail`, formData);
    /*localStorage.setItem("userIdentification", true)*/
  };

  let formData = {
    email: "",
    number: "",
    password: "",
  };
  //TODO: сделай 1 компонент из 2х
  //TODO: react swipeble views ( в примере материала есть )
  return (
    <StyledLogin>
      <StyledLoadingCardTitle>Авторизация</StyledLoadingCardTitle>
      <TabContext value={value}>
        <Card className={classes.cardLogin}>
          <TabList onChange={handleChange} style={{ width: "100%" }}>
            <Tab label="ПО EMAIL" value="1" style={{ width: "50%" }} />
            <Tab label="ПО ТЕЛЕФОНУ" value="2" style={{ width: "50%" }} />
          </TabList>
          <TabPanel value="1">
            <LoginEmail props={{ formData, getUsersEmail, classes }} />
          </TabPanel>
          <TabPanel value="2">
            <LoginNumber props={{ formData, getUsersNumber, classes }} />
          </TabPanel>
        </Card>
      </TabContext>
    </StyledLogin>
  );
};
