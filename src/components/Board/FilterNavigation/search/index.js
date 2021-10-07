import React from "react";
import { Button, TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import {StyleSearch} from "./styled";

export const Search = ({ setTextSearch, searchTask, textSearch }) => {
  return (
    <StyleSearch>
      <TextField
        label="Поиск"
        placeholder="Поиск"
        size="small"
        onChange={(e) => {
          setTextSearch({ ...textSearch, text: e.target.value });
        }}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <Button onClick={searchTask}>Найти</Button>
    </StyleSearch>
  );
};
