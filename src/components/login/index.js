import React, {useState} from "react";
import { StyledLoadingCardTitle, StyledLogin } from "./style";
import { Card, Tabs, Tab } from "@material-ui/core";
import useStyles from "../../styledMUI";
import { LogInUser } from "./LogInUser";
import SwipeableViews from "react-swipeable-views";

export const Login = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <StyledLogin>
      <StyledLoadingCardTitle>Авторизация</StyledLoadingCardTitle>
      <Card className={classes.cardLogin}>
        <Tabs
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          <Tab label="ПО EMAIL" style={{ width: "50%" }} />
          <Tab label="ПО ТЕЛЕФОНУ" style={{ width: "50%" }} />
        </Tabs>
        <SwipeableViews
          style={{ width: "100%" }}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <LogInUser classes={classes} type="email" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LogInUser type="tel" classes={classes} />
          </TabPanel>
        </SwipeableViews>
      </Card>
    </StyledLogin>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};
