import React from "react";
import { Button, TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";

export const Search = ({ setTextSearch, searchTask, textSearch }) => {
  return (
    <div
      style={{
        height: "80px",
        padding: "5px",
        width: "95%",
        backgroundColor: "#d3eafd",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
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
    </div>
  );
};
