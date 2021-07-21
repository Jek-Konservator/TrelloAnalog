import React from "react";
import { StyledCard, StyledData, StyledTitle } from "./styledCard";
import { Button } from "@material-ui/core";

export const Card = ({ title, data, openModal }) => {
  return (
    <StyledCard>
      <StyledTitle>{title}</StyledTitle>
      <div>
          <StyledData>{data[0]}</StyledData>
          <StyledData>{data[1]}</StyledData>
          <StyledData>{data[2]}</StyledData>
      </div>
      <Button onClick={() => openModal(data)}>Развернуть</Button>
    </StyledCard>
  );
};
