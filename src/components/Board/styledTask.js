import styled from "styled-components";

export const StyledBoards = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;


export const StyledTitle = styled.div`
  margin-bottom: 10px;
  padding-left: 10px;
  width: 100%;
  max-height: 80px;
  min-height: 40px;
  font-size: 25px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #32bdf8ff;
`;

export const StyledData = styled.div`
  margin: 10px 10px 10px 10px;
  font-size: 20px;
  display: flex;
  min-height: 80px;
  max-height: 120px;
  justify-content: space-between;
  align-items: flex-start;
  word-wrap: break-word;
  text-align: left;
`;
// TODO: какого хуя доска в тасках находиться?
export const StyledTitleBoard = styled.div`
  padding: 30px 0 30px 30px;
  font-size: 30px;
  display: flex;
`;
