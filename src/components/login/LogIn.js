import { Form } from "react-final-form";
import {
  LogInContainer,
  StyledLoadingCardFooter,
  StyledLoadingCardInput,
} from "./style";
import { TextField } from "mui-rff";
import { Button, FormGroup } from "@material-ui/core";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
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
    if (data.massage !== "UserNotAccepted") {
      setErrorUserNotAccepted(false);
      if (data.massage === "passwordAccepted") {
        if (values.saveMe === true) {
          localStorage.setItem("userIdentification", true);
          localStorage.setItem("userId", data.id);
        } else {
          sessionStorage.setItem("userIdentification", true);
          sessionStorage.setItem("userId", data.id);
        }
        history.replace("/");
      } else if (data.massage === "passwordNotAccepted") {
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
                    error={errorUserNotAccepted}
                    label="Электронная почта"
                    name="email"
                    className={classes.textFieldLogin}
                  />
                ) : (
                  <TextField
                    error={errorUserNotAccepted}
                    label="Номер телефона"
                    name="number"
                    className={classes.textFieldLogin}
                  />
                )}
              </div>
              <div>
                <TextField
                  error={errorPassword}
                  label="Пароль"
                  name="password"
                  className={classes.textFieldLogin}
                />
              </div>
            </StyledLoadingCardInput>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                name="saveMe"
                control={<Checkbox defaultChecked={false} />}
                label="Запомнить меня"
                style={{ userSelect: "none" }}
              />
              <div
                onClick={() => {
                  handleChangeIndex(1);
                }}
                className={classes.linkLogin}
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
                className={classes.linkLogin}
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
