import React, { useState } from "react";
import { StyledLoadingCardFooter, StyledLoadingCardInput } from "./style";
import { Button } from "@material-ui/core";
import useStyles from "../../styledMUI";
import axios from "axios";
import { Alert } from "@mui/material";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";

export const ResetPassword = ({ handleChangeIndex, type }) => {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [timeToClear, setTimeToClear] = useState(10);

  const classes = useStyles();
  const clear = () => {
    let time = 10;
    let a = setInterval(() => {
      time--;
      setTimeToClear(time);
    }, 1000);

    setTimeout(function () {
      setPassword("");
      setTimeToClear(10);
      clearInterval(a);
    }, 90000);
  };

  const onSubmitForgotPassword = async (values) => {
    if (type === "email") {
      const { data } = await axios.get(
        `/api/getUsersPasswordEmail/${values.email}`,
        values
      );
      if (data.docs !== null) {
        setError(false);
        setPassword(data.docs.password);
        clear();
      } else {
        setError(true);
      }
    } else if (type === "tel") {
      const { data } = await axios.get(
        `/api/getUsersPasswordNumber/${values.number}`,
        values
      );
      if (data.docs !== null) {
        setError(false);
        setPassword(data.docs.password);
      } else {
        setError(true);
      }
    }
  };

  return (
    <Form
      onSubmit={onSubmitForgotPassword}
      initialValues={{
        email: "",
        number: "",
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          {error && true ? (
            <Alert severity="error" className={classes.linkLogin}>
              Такого аккаунта не существует
            </Alert>
          ) : password !== "" ? (
            <Alert
              severity="success"
              className={classes.linkLogin}
            >
              Ващ пароль : {password}
              ({timeToClear})
            </Alert>
          ) : (
            ""
          )}
          <StyledLoadingCardInput>
            <div>
              {type === "email" ? (
                <TextField
                  error={error}
                  label="Электронная почта"
                  name="email"
                  className={classes.textFieldLogin}
                />
              ) : (
                <TextField
                  error={error}
                  label="Номер телефона"
                  name="number"
                  className={classes.textFieldLogin}
                />
              )}
            </div>
          </StyledLoadingCardInput>
          <StyledLoadingCardFooter>
            <Button type="submit" className={classes.buttonLogin}>
              ВОССТАНОВИТЬ ПАРОЛЬ
            </Button>
            <div
              onClick={() => {
                handleChangeIndex(0);
              }}
              className={classes.linkLogin}
              style={{
                fontSize: "25px",
                marginTop: "30px",
                color: "#2196f3",
                cursor: "pointer",
              }}
            >
              Вернуться к авторизации
            </div>
          </StyledLoadingCardFooter>
        </form>
      )}
    />
  );
};
