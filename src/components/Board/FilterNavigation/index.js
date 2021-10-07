import React from "react";
import { FilterStyled } from "./styled";
import { Hashtags } from "./hashtags";
import { Search } from "./search";

export const FilterNavigation = ({
  setTextSearch,
  searchTask,
  getTasksHashtag,
  textSearch,
}) => {
  return (
    <FilterStyled>
      <div
        style={{
          backgroundColor: "#d3eafd",
          width: "95%",
          height: "100%",
          borderRadius: "15px",
          padding: "10px",
        }}
      >
        <Search
          textSearch={textSearch}
          setTextSearch={setTextSearch}
          searchTask={searchTask}
        />
        <Hashtags getTasksHashtag={getTasksHashtag} type={"hashtagsFilter"} />
      </div>
    </FilterStyled>
  );
};
