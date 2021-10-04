import React, { useState } from "react";
import {
  StyledLoadingCardFooter,
  StyledLoadingCardInput,
  StyledLoadingCardTitle,
  StyledLogin,
} from "./style";
import { Card } from "@mui/material";
import { Button } from "@material-ui/core";

import { TabPanel, TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import useStyles from "../../styles/styledMUI";

import { useHistory } from "react-router-dom";
import axios from "axios";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";
import { Alert } from "@mui/material";

export const NewUser = () => {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorNumber, setErrorNumber] = useState(false);

  let formData = {
    email: "",
    number: "",
    password: "",
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toLogin = () => {
    history.replace("/login");
  };

  const onSubmitNewUser = async (values) => {
    const { data } = await axios.post(`/api/createUser`, values);
    if (data.message === "emailUsed") {
      setErrorEmail(true);
      setErrorNumber(false);
    } else if (data.message === "numberUsed") {
      setErrorNumber(true);
      setErrorEmail(false);
    } else if (data.message === "AddUsers") {
      history.replace("/login");
    } else {
    }
  };

  return (
    <StyledLogin>
      <StyledLoadingCardTitle>Регистрация</StyledLoadingCardTitle>
      <TabContext value={value}>
        <Card className={classes.cardLogin}>
          <TabList onChange={handleChange} style={{ width: "100%" }}>
            <Tab
              label="Регистрация"
              value="1"
              style={{ width: "100%", maxWidth: "none" }}
            />
          </TabList>
          {errorEmail && true ? (
              <Alert severity="error" className={classes.alertLogin} style={{width: "100%", marginBottom: "-48px"}}>
                Данная электронная почта уже используется
              </Alert>
          ) : errorNumber && true ? (
              <Alert severity="error" className={classes.alertLogin} style={{width: "100%", marginBottom: "-48px"}}>
                Данная номер телефона уже используется
              </Alert>
          ) : (
              ""
          )}
          <TabPanel value="1">
            <Form
              onSubmit={onSubmitNewUser}
              initialValues={{
                ...formData,
              }}
              render={({ handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <StyledLoadingCardInput>
                    <div>
                      <TextField
                        error={errorEmail}
                        required={true}
                        label="Электронная почта"
                        name="email"
                        className={classes.textFieldLogin}
                      />
                    </div>
                    <div>
                      <TextField
                        error={errorNumber}
                        required={true}
                        label="Номер телефона"
                        name="number"
                        className={classes.textFieldLogin}
                      />
                    </div>
                    <div>
                      <TextField
                        required={true}
                        label="Пароль"
                        name="password"
                        className={classes.textFieldLogin}
                      />
                    </div>
                  </StyledLoadingCardInput>
                  <StyledLoadingCardFooter>
                    <Button type="submit" className={classes.buttonLogin}>
                      ЗАРЕГИСТРИРОВАТЬСЯ
                    </Button>
                    <div
                      onClick={() => {
                        toLogin();
                      }}
                      className={classes.linkLogin}
                      style={{
                        fontSize: "25px",
                        marginTop: "25px",
                        color: "#2196f3",
                        cursor: "pointer",
                      }}
                    >
                      У меня уже есть аккаунт
                    </div>
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
