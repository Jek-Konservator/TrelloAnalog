import React from "react";
import { StyledCard, StyledData, StyledTitle } from "./styledCard";
import { Button, Fab } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";

export const Task = ({ title, data, openModal}) => {

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

export const CardNewTable = () => {

    const newTable = () => {



    }


  return (
    <StyledCard>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </StyledCard>
  );
};
