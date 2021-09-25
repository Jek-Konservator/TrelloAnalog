import styled from "styled-components";

export const StyledBoards = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const StyledCard = styled.div`
  background-color: white;
  opacity: 0.8;
  width: 250px;
  height: 350px;
  margin: 10px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  word-wrap: break-word;
`;
export const StyledTitle = styled.div`
  margin: 10px 0 10px 0;
  font-size: 25px;
  text-align: center;
  word-wrap: break-word;
`;
export const StyledData = styled.div`
  margin: 10px;
  width: 230px;
  font-size: 15px;
  text-align: left;
`;
export const StyledHeaderBoard = styled.div`
  padding: 30px 0 30px 30px;
  font-size: 30px;
`;
