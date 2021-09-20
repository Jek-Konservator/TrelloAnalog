import { StyledLoadingCardFooter, StyledLoadingCardInput } from "./style";
import { TextField } from "mui-rff";
import { Button, FormGroup } from "@material-ui/core";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
import React from "react";

export const LoginUser = ({
  formData,
  TryLogIn,
  classes,
  errorPassword,
  errorUserNotAccepted,
  value,
}) => {
  return (
    <>
      <Form
        onSubmit={TryLogIn}
        initialValues={{
          ...formData,
        }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            {" "}
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
                Неверный пароль{" "}
              </div>
            ) : (
              ""
            )}
            <StyledLoadingCardInput>
              <div>
                {value === "1" ? (
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
              <Link
                to={"/resetpassword"}
                className={classes.linkLogin}
                style={{ fontSize: "19px" }}
              >
                Забыли пароль ?
              </Link>
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
    </>
  );
};
