import React, { useState } from "react";
import { StyledLoadingCardFooter, StyledLoadingCardInput } from "./style";
import useStyles from "../../styles/styledMUI";
import axios from "axios";
import { Alert, Button } from "@mui/material";
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
    }, 10000);
  };

  const onSubmitForgotPassword = async (values) => {
      const { data } = await axios.get(
        `/api/getUserPassword/${values.email}/${values.number}`,
        values
      );

      if (data.message === undefined) {
        setError(false);
        setPassword(data);
        clear();
      } else {
        setError(true);
      }
  };

  return (
    <Form
      onSubmit={onSubmitForgotPassword}
      initialValues={{
        email: null,
        number: null,
      }}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          {error && true ? (
            <Alert severity="error" className={classes.alertLogin}>
              Такого аккаунта не существует
            </Alert>
          ) : password !== "" ? (
            <Alert severity="success" className={classes.alertLogin}>
              Ващ пароль : {password}({timeToClear})
            </Alert>
          ) : (
            ""
          )}
          <StyledLoadingCardInput>
            <div>
              {type === "email" ? (
                <TextField
                  required={true}
                  error={error}
                  label="Электронная почта"
                  name="email"
                  className={classes.textFieldLogin}
                />
              ) : (
                <TextField
                  required={true}
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
