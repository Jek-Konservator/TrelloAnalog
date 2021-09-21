import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { ResetPassword } from "./resetPassword";
import { LogIn } from "./LogIn";

export const LogInUser = ({ classes, type }) => {
  const [index, setIndex] = useState(0);

  const handleChangeIndex = (value) => {
    setIndex(value);
  };

  return (
    <SwipeableViews
      style={{ height: "100%" }}
      index={index}
      onChangeIndex={handleChangeIndex}
    >
      <LogIn
        classes={classes}
        type={type}
        handleChangeIndex={handleChangeIndex}
      />
      <ResetPassword handleChangeIndex={handleChangeIndex} type={type} />
    </SwipeableViews>
  );
};
