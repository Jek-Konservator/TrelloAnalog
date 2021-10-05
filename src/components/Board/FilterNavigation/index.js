import React  from "react";
import {FilterStyled} from "./styled";
import {Hashtags} from "./hashtags/hashtags";

export const FilterNavigation = ({getTasksHashtag}) => {


  return (
    <FilterStyled>
     <Hashtags getTasksHashtag={getTasksHashtag} type={"hashtagsFilter"}/>
    </FilterStyled>
  );
};
