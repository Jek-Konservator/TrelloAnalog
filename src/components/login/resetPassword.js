import React, { useCallback, useEffect, useState } from "react";
import {
  StyledLoadingCardFooter,
  StyledLoadingCardInput,
  StyledLoadingCardTitle,
  StyledLogin,
} from "./style";
import { Button, Card, Radio } from "@material-ui/core";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import useStyles from "../../styledMUI";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";
//TODO:переверстай радио на 1 компонент табами как на страничке логина
export const ResetPassword = () => {
  const history = useHistory();

  const getUser = useCallback(() => {
    const user = localStorage.getItem("userIdentification");
    if (user !== null) {
      history.replace("/");
    }
  }, [history]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmitForgotPassword = async (values) => {
    console.log(values, "<= values");
    if (selectedValue === "a") {
      const a = await axios.get(
        `/api/getUsersPasswordEmail/${values.email}`,
        values
      );
      console.log(a);
    } else if (selectedValue === "b") {
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

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <StyledLogin>
      <StyledLoadingCardTitle>Восстанавливать пароль</StyledLoadingCardTitle>
      <TabContext value={value}>
        <Card className={classes.cardLogin}>
          <TabList onChange={handleChange} style={{ width: "100%" }}>
            <Tab
              label="Восстанавливать пароль"
              value="1"
              style={{ width: "100%", maxWidth: "none" }}
            />
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
                      <Radio
                        checked={selectedValue === "a"}
                        onChange={handleChangeRadio}
                        value="a"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <TextField
                        variant="outlined"
                        disabled={selectedValue === "b"}
                        label="Электронная почта"
                        name="email"
                        className={classes.textFieldLogin}
                      />
                    </div>
                    <div>
                      <Radio
                        checked={selectedValue === "b"}
                        onChange={handleChangeRadio}
                        value="b"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "B" }}
                      />
                      <TextField
                        variant="outlined"
                        disabled={selectedValue === "a"}
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
