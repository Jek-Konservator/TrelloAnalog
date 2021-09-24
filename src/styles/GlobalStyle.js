import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
body {
  margin: 0;
  font-family: Roboto;
  background-color: #84e9f2;
  color:black;
}
`;
export const MainStyle = styled.div`
  width: 100%;
`;
export const theme = {
  colors: {
    primary: "#0070AE",
  },
};
