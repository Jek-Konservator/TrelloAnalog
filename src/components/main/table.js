import React from "react";
import { StyledCard, StyledData, StyledTitle } from "./styledCard";
import { Button} from "@material-ui/core";
import {useParams} from "react-router-dom";
// TODO: ну тут нихуя сказать не могу тк тут должны быть таски я так понимю, но нихуя не таблицы, переименуй всю хуйню я заебался путаться)))))))) Board - доска
export const Table = () => {

    const {idTAbles} = useParams();

  return (
    <StyledCard>
      <StyledTitle>{idTAbles}</StyledTitle>
      <div>
      {/*  <StyledData>{data[0]}</StyledData>
        <StyledData>{data[1]}</StyledData>
        <StyledData>{data[2]}</StyledData>*/}
      </div>
      {/*<Button onClick={() => openModal(data)}>Развернуть</Button>*/}
    </StyledCard>
  );
};
