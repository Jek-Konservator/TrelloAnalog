import React from "react";
import { FilterStyled } from "./styled";
import {Hashtags} from "./hashtags";
import { Search } from "./search";

export const FilterNavigation = ({
  setTextSearch,
  searchTask,
  getTasksHashtag,
  textSearch,
}) => {
  return (
    <FilterStyled>
        <Search textSearch={textSearch} setTextSearch={setTextSearch} searchTask={searchTask} />
        <Hashtags getTasksHashtag={getTasksHashtag} type={"hashtagsFilter"} />
    </FilterStyled>
  );
};
