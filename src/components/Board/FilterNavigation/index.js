import React, { useState } from "react";
import {FilterStyled} from "./styled";
import {Hashtags} from "./hashtags/hashtags";

export const FilterNavigation = () => {


  return (
    <FilterStyled>
     <Hashtags type={"hashtagsFilter"}/>
    </FilterStyled>
  );
};
