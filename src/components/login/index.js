import React, { useContext, useEffect, useState } from "react";
import { StyledLoadingCardTitle, StyledLogin } from "./style";
import { Card } from "@material-ui/core";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import useStyles from "../../styledMUI";
import { LoginEmail, LoginUser } from "./LoginUser";
import { LoginNumber } from "./loginNumber";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { UserContext } from "../../context";
import SwipeableViews from "react-swipeable-views";
import {Button} from "@mui/material";
//TODO: тут я думаю ты сам всё понимаешь
export const Login = () => {
  const history = useHistory();
  const { getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [index, setIndex] = useState(1);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorUserNotAccepted, setErrorUserNotAccepted] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setErrorUserNotAccepted(false);
  };
  const handleChangeIndex = (newValue) => {
    setIndex(newValue);
    console.log(newValue)
  };

  const TryLogIn = async (values) => {
    const data = await axios.get(
      `/api/TryLogIn/${values.email}/${values.number}/${values.password}`,
      values
    );
    if (data.data.massage !== "UserNotAccepted") {
      setErrorUserNotAccepted(false);
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
      setErrorUserNotAccepted(true);
    }
  };

  let formData = {
    email: null,
    number: null,
    password: null,
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
          <SwipeableViews onChangeIndex={(e)=> {handleChangeIndex(e)}} >
            <div index={1}>
              <Button onClick={handleChangeIndex}/>
              <TabPanel value="1">
                <LoginUser
                  formData={formData}
                  TryLogIn={TryLogIn}
                  classes={classes}
                  errorPassword={errorPassword}
                  errorUserNotAccepted={errorUserNotAccepted}
                  value={value}
                />
              </TabPanel>
              <TabPanel value="2">
                <LoginUser
                  formData={formData}
                  TryLogIn={TryLogIn}
                  classes={classes}
                  errorPassword={errorPassword}
                  errorUserNotAccepted={errorUserNotAccepted}
                  value={value}
                />
              </TabPanel>
            </div>
            <div index={2}> asd</div>
          </SwipeableViews>
        </Card>
      </TabContext>
    </StyledLogin>
  );
};
