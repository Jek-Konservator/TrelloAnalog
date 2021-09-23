import React from "react";
import { StyleBackModal, StyleModal } from "./styledModal";
import { StyledData } from "./styledCard";

export const Moadal = ({ data }) => {

  return (
    <StyleBackModal>
      <StyleModal>
        {data.map((e) => (
          <StyledData>{e}</StyledData>
        ))}
      </StyleModal>
    </StyleBackModal>
  );
};
