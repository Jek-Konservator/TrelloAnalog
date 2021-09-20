import React, { useState } from "react";
import {
  StyledLoadingCardFooter,
  StyledLoadingCardInput,
  StyledLoadingCardTitle,
  StyledLogin,
} from "./style";
import { Button, Card } from "@material-ui/core";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import useStyles from "../../styledMUI";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";

export const NewUser = () => {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState("1");

  let formData = {
    email: "",
    number: "",
    password: "",
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmitNewUser = async (values) => {
    const a = await axios.post(`/api/createUser`, values);
    if (a.data.message === "AddUsers") {
      localStorage.setItem("userIdentification", true);
      history.replace("/");
    } else {
      console.log(a.data.message);
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
                        label="Электронная почта"
                        name="email"
                        className={classes.textFieldLogin}
                      />
                    </div>
                    <div>
                      <TextField
                        label="Номер телефона"
                        name="number"
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
                  <StyledLoadingCardFooter>
                    <Button type="submit" className={classes.buttonLogin}>
                      ЗАРЕГИСТРИРОВАТЬСЯ
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
