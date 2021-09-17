import styled from "styled-components";
import { Card } from "@material-ui/core";
import { TabList} from "@mui/lab";
import Tab from "@mui/material/Tab";




export const StyledLogin = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const StyledLoadingCard = styled(Card)`
  padding: 0 0 20px 0;
  width: 450px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLoadingCardTitle = styled.div`
  font-size: 25px;
`;
export const StyledLoadingCardInput = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledLoadingCardTabList = styled(TabList)`
 width: 100%;
`;
export const StyledLoadingCardTabTab = styled(Tab)`
 width: 50%;
`;
export const StyledLoadingCardButtom = styled.div``;
