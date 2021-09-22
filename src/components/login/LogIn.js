import { Form, Field } from "react-final-form";
import {
  LogInContainer,
  StyledLoadingCardFooter,
  StyledLoadingCardInput,
} from "./style";
import { TextField } from "mui-rff";
import { Button, FormGroup } from "@material-ui/core";
import { Alert, FormControlLabel } from "@mui/material";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Checkbox } from "final-form-material-ui";

import axios from "axios";

export const LogIn = ({ classes, type, handleChangeIndex }) => {
  const history = useHistory();
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorUserNotAccepted, setErrorUserNotAccepted] = useState(false);

  const toRegistration = () => {
    history.replace("/registration");
  };

  const tryLogIn = async (values) => {
     const { data } = await axios.get(
      `/api/tryLogIn/${values.email}/${values.number}/${values.password}`,
      values
    );
    if (data.message !== "UserNotAccepted") {
      setErrorUserNotAccepted(false);
      if (data.message === "passwordAccepted") {
        if (values.saveMe === true) {
          localStorage.setItem("user", data.email);
        } else {
          sessionStorage.setItem("user", data.email);
        }
        history.go("/");
      } else if (data.message === "passwordNotAccepted") {
        setErrorPassword(true);
      }
    } else {
      setErrorUserNotAccepted(true);
    }
  };

  return (
    <LogInContainer>
      <Form
        onSubmit={tryLogIn}
        initialValues={{
          email: null,
          number: null,
          password: null,
          saveMe: false,
        }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            {errorUserNotAccepted && true ? (
              <Alert severity="error" className={classes.alertLogin}>
                Такого аккаунта не существует
              </Alert>
            ) : errorPassword && true ? (
              <Alert severity="error" className={classes.alertLogin}>
                Неверный пароль
              </Alert>
            ) : (
              ""
            )}
            <StyledLoadingCardInput>
              <div>
                {type === "email" ? (
                  <TextField
                    required={true}
                    error={errorUserNotAccepted}
                    label="Электронная почта"
                    name="email"
                    className={classes.textFieldLogin}
                  />
                ) : (
                  <TextField
                    required={true}
                    error={errorUserNotAccepted}
                    label="Номер телефона"
                    name="number"
                    className={classes.textFieldLogin}
                  />
                )}
              </div>
              <div>
                <TextField
                  required={true}
                  error={errorPassword}
                  label="Пароль"
                  name="password"
                  className={classes.textFieldLogin}
                />
              </div>
            </StyledLoadingCardInput>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                label="Запомнить меня"
                control={
                  <Field
                    name="saveMe"
                    component={Checkbox}
                    type="checkbox"
                    color={"primary"}
                  />
                }
              />
              <div
                onClick={() => {
                  handleChangeIndex(1);
                }}
                style={{
                  fontSize: "19px",
                  color: "#2196f3",
                  cursor: "pointer",
                }}
              >
                Забыли пароль ?
              </div>
            </FormGroup>

            <StyledLoadingCardFooter>
              <Button type="submit" className={classes.buttonLogin}>
                {"ВОЙТИ"}
              </Button>
              <div
                onClick={() => {
                  toRegistration();
                }}
                style={{
                  fontSize: "25px",
                  marginTop: "25px",
                  color: "#2196f3",
                  cursor: "pointer",
                }}
              >
                Регистрация
              </div>
            </StyledLoadingCardFooter>
          </form>
        )}
      />
    </LogInContainer>
  );
};
