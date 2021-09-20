import React, {useContext, useEffect, useState} from "react";
import {
  StyledLoadingCardFooter,
  StyledLoadingCardInput,
  StyledLoadingCardTitle,
  StyledLogin,
} from "./style";
import { Button, Card } from "@material-ui/core";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import useStyles from "../../styledMUI";
import { Link} from "react-router-dom";
import axios from "axios";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";
import {UserContext} from "../../context";
//TODO:переверстай радио на 1 компонент табами как на страничке логина
export const ResetPassword = () => {

  const classes = useStyles();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmitForgotPassword = async (values) => {
    if (value === "1") {
      const a = await axios.get(
        `/api/getUsersPasswordEmail/${values.email}`,
        values
      );
    } else if (value === "2") {
      const a = await axios.get(
        `/api/getUsersPasswordNumber/${values.number}`,
        values
      );
      console.log(a);
    }
  };

  let formData = {
    email: "",
    number: "",
  };

  return (
    <StyledLogin>
      <StyledLoadingCardTitle>Восстанавливать пароль</StyledLoadingCardTitle>
      <TabContext value={value}>
        <Card className={classes.cardLogin}>
          <TabList onChange={handleChange} style={{ width: "100%" }}>
            <Tab label="EMAIL" value="1" style={{ width: "50%" }} />
            <Tab label="НОМЕР ТЕЛЕФОНА" value="2" style={{ width: "50%" }} />
          </TabList>
          <TabPanel value="1">
            <Form
              onSubmit={onSubmitForgotPassword}
              initialValues={{
                ...formData,
              }}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <StyledLoadingCardInput>
                    <div>
                      <TextField
                        label="Электронная почта"
                        name="email"
                        className={classes.textFieldLogin}
                      />
                    </div>
                  </StyledLoadingCardInput>
                  <StyledLoadingCardFooter>
                    <Button type="submit" className={classes.buttonLogin}>
                      {"ВОССТАНОВИТЬ ПАРОЛЬ"}
                    </Button>
                    <Link
                      to={"/login"}
                      className={classes.linkLogin}
                      style={{ fontSize: "25px", marginTop: "30px" }}
                    >
                      {"У меня уже есть аккаунт"}
                    </Link>
                  </StyledLoadingCardFooter>
                </form>
              )}
            />
          </TabPanel>
          <TabPanel value="2">
            <Form
              onSubmit={onSubmitForgotPassword}
              initialValues={{
                ...formData,
              }}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <StyledLoadingCardInput>
                    <div>
                      <TextField
                        label="Номер телефона"
                        name="number"
                        className={classes.textFieldLogin}
                      />
                    </div>
                  </StyledLoadingCardInput>
                  <StyledLoadingCardFooter>
                    <Button type="submit" className={classes.buttonLogin}>
                      {"ВОССТАНОВИТЬ ПАРОЛЬ"}
                    </Button>
                    <Link
                      to={"/login"}
                      className={classes.linkLogin}
                      style={{ fontSize: "25px", marginTop: "30px" }}
                    >
                      {"У меня уже есть аккаунт"}
                    </Link>
                  </StyledLoadingCardFooter>
                </form>
              )}
            />
          </TabPanel>
        </Card>
      </TabContext>
    </StyledLogin>
  );
};
