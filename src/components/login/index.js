import React, { useState } from "react";
import {
  StyledLoadingCard,
  StyledLoadingCardButtom,
  StyledLoadingCardInput, StyledLoadingCardTabList, StyledLoadingCardTabTab, StyledLoadingCardTitle,
  StyledLogin,
} from "./style";
import { Button, TextField } from "@material-ui/core";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import Tab from "@mui/material/Tab";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledLogin>
      <StyledLoadingCardTitle>Авторизация</StyledLoadingCardTitle>
      <TabContext value={value}>
        <StyledLoadingCard>
          <StyledLoadingCardTabList onChange={handleChange}>
            <StyledLoadingCardTabTab label="ПО EMAIL" value="1" />
            <StyledLoadingCardTabTab label="ПО ТЕЛЕФОНУ" value="2" />
          </StyledLoadingCardTabList>

          <TabPanel value="1">
            <StyledLoadingCardInput>
              <TextField label={"Логин"} />
              <TextField label={"Пороль"} />
            </StyledLoadingCardInput>
          </TabPanel>
          <TabPanel value="2">
            <StyledLoadingCardButtom>
              <Button>asd2</Button>
            </StyledLoadingCardButtom>
          </TabPanel>
        </StyledLoadingCard>
      </TabContext>
    </StyledLogin>
  );
};
