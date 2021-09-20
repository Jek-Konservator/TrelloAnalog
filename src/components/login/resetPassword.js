import React  from "react";
import { StyledLoadingCardFooter, StyledLoadingCardInput } from "./style";
import { Button } from "@material-ui/core";
import useStyles from "../../styledMUI";
import axios from "axios";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";

//TODO:переверстай радио на 1 компонент табами как на страничке логина
export const ResetPassword = ({ handleChangeIndex, type }) => {
  const classes = useStyles();

  const onSubmitForgotPassword = async (values) => {
    if (type === "email") {
      const { data } = await axios.get(
        `/api/getUsersPasswordEmail/${values.email}`,
        values
      );
      console.log(data);
    } else if (type === "tel") {
      const { data } = await axios.get(
        `/api/getUsersPasswordNumber/${values.number}`,
        values
      );
      console.log(data);
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
          <StyledLoadingCardInput>
            <div>
              {type === "email" ? (
                <TextField
                  label="Электронная почта"
                  name="email"
                  className={classes.textFieldLogin}
                />
              ) : (
                <TextField
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
              style={{ fontSize: "25px", marginTop: "30px" }}
            >
              У меня уже есть аккаунт
            </div>
          </StyledLoadingCardFooter>
        </form>
      )}
    />
  );
};
