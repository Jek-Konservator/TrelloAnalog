import { StyledLoadingCardFooter, StyledLoadingCardInput } from "./style";
import { TextField } from "mui-rff";
import { Button, FormGroup } from "@material-ui/core";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
import React from "react";

export const LoginEmail = ({props}) => {

   let formData = props.formData;
    let onSubmit = props.getUsersEmail;
    let classes = props.classes;

    return (
    <>
     <Form
        onSubmit={onSubmit}
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
              <div>
                <TextField
                  label="Пароль"
                  name="password"
                  className={classes.textFieldLogin}
                />
              </div>
            </StyledLoadingCardInput>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                control={<Checkbox defaultChecked={false} />}
                label="Запомнить меня"
              />
              <Link
                to={"/resetpassword"}
                className={classes.linkLogin}
                style={{ fontSize: "19px" }}
              >
                Забыли пороль ?
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
