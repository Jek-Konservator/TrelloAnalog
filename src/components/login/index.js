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
    const userLocalStorage = localStorage.getItem("userIdentification");
    const userSessionStorage = sessionStorage.getItem("userIdentification");
    if (userLocalStorage !== null || userSessionStorage !== null) {
      history.replace("/");
    }
  }, [history]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUsersNumber = async (values) => {
    const data = await axios.get(
      `/api/getUsersNumber/${values.number}`,
      values
    );
    //localStorage.setItem("userIdentification", true)
    console.log(data.data);
  };
  const getUsersEmail = async (values) => {
    const data = await axios.get(
      `/api/getUsersEmail/${values.email}/${values.password}`,
      values
    );

    if (data.data.massage !== "emailNotAccepted") {
      setErrorEmail(false)
      if (data.data.massage === "passwordAccepted") {
        if (values.saveMe === true) {
          localStorage.setItem("userIdentification", true);
        } else {
          sessionStorage.setItem("userIdentification", true);
        }
        history.replace("/");
      } else if (data.data.massage === "passwordNotAccepted") {
        setErrorPassword(true);
      }
    } else {
      setErrorEmail(true);
    }
  };

  let formData = {
    email: "",
    number: "",
    password: "",
    saveMe: false,
  };
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
            <LoginEmail
              props={{ formData, getUsersEmail, classes, errorPassword, errorEmail }}
            />
          </TabPanel>
          <TabPanel value="2">
            <LoginNumber props={{ formData, getUsersNumber, classes }} />
          </TabPanel>
        </Card>
      </TabContext>
    </StyledLogin>
  );
};
