import { Form } from "react-final-form";
import {
  LogInContainer,
  StyledLoadingCardFooter,
  StyledLoadingCardInput,
} from "./style";
import { TextField } from "mui-rff";
import { Button, FormGroup } from "@material-ui/core";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export const LogIn = ({ classes, type, handleChangeIndex }) => {
  const history = useHistory();
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorUserNotAccepted, setErrorUserNotAccepted] = useState(false);

  const tryLogIn = async (values) => {
    const data = await axios.get(
      `/api/tryLogIn/${values.email}/${values.number}/${values.password}`,
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Такого аккаунта не существует
              </div>
            ) : errorPassword && true ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Неверный пароль
              </div>
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
              />
              <div
                onClick={() => {
                  handleChangeIndex(1);
                }}
                className={classes.linkLogin}
                style={{ fontSize: "19px" }}
              >
                Забыли пароль ?
              </div>
            </FormGroup>

            <StyledLoadingCardFooter>
              <Button type="submit" className={classes.buttonLogin}>
                {"ВОЙТИ"}
              </Button>
              <Link
                to={"/registration"}
                className={classes.linkLogin}
                style={{ fontSize: "25px", marginTop: "30px" }}
              >
                {"Регистрация"}
              </Link>
            </StyledLoadingCardFooter>
          </form>
        )}
      />
    </LogInContainer>
  );
};
