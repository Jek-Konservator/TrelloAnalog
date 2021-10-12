import styled, { createGlobalStyle } from "styled-components";
import { createTheme } from "@mui/material/styles";

export const GlobalStyled = createGlobalStyle`
body {
  margin: 0;
  font-family: Roboto;
  color:black;
  background-color: #e6eef5;
}
`;
export const StyleMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyleContent = styled.div`
  background-color: #2196f3;
  padding: 30px;
  width: calc(70vw - 60px);
  margin: 40px 0 40px 0;
  border-radius: 15px;
  min-height: calc(100vh - 200px);
  box-shadow: 4px 4px 10px gray;
`;

export const theme = createTheme({
  palette: {
    secondary: {
      main: "#fff"
    },
  },
});
