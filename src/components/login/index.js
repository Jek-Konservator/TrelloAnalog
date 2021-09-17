import React, {useState} from "react";
import {
  StyledLoadingCard,
  StyledLoadingCardButtom,
  StyledLoadingCardInput,
  StyledLoadingCardTitle,
  StyledLogin,
} from "./style";
import {Button, TextField} from "@material-ui/core";

export const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

  return (
    <StyledLogin>
      <StyledLoadingCard>
        <StyledLoadingCardTitle>
          <>Добро пожаловать</>
        </StyledLoadingCardTitle>
        <StyledLoadingCardInput>
          <TextField>asdasd</TextField>
          <TextField>222</TextField>
          <TextField>asdasd</TextField>
        </StyledLoadingCardInput>
        <StyledLoadingCardButtom>
          <Button>asd2</Button>
        </StyledLoadingCardButtom>
      </StyledLoadingCard>
    </StyledLogin>
  );
};
