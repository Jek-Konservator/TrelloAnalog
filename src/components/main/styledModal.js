import styled from "styled-components";

export const StyleBackModal = styled.div`
  position: absolute;
  height: calc(100vh - 50px);
  width: 100%;
  z-index: 1;
  background: rgba(220, 220, 220, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyleModal = styled.div`
  height: 600px;
  width: 400px;
  z-index: 2;
  background-color: white;
`;
