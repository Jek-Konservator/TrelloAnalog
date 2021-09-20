import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
body {
  margin: 0;
  font-family: Roboto;
}
`;
export const MainStyle = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(to top left, #6eeeed, #bbdcff);
`;
export const theme = {
    colors: {
        primary: "#0070AE",
    },
};