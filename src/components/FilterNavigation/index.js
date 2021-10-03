import React, { useState } from "react";
import { Container } from "./styled";
import {
  Autocomplete,
  Button,
  IconButton,
  InputBase,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const FilterNavigation = ({ getTasks }) => {
  const [filterParams, setFilterParams] = useState();

  const getFiltredData = () => {
    console.log(filterParams, "getFiltredData");
    getTasks(filterParams);
  };
  return (
    <Container>
      <TextField
        label="Поиск"
        placeholder="Поиск"
        size="small"
        onChange={(e) => {
          setFilterParams({ ...filterParams, text: e.target.value });
        }}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />

      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          multiple
          onChange={(event, value) => {
            const tags = value
              .map((e) => e.id)
              .join()
              .toString();
            setFilterParams({
              ...filterParams,
              hashtags: tags,
            });
          }}
          options={hashtags}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Хештеги"
              placeholder="Хештеги"
            />
          )}
        />
      </Stack>
      <Button onClick={getFiltredData}>Применить</Button>
    </Container>
  );
};

const hashtags = [
  { id: 0, name: "Папе" },
  { id: 1, name: "Маме" },
  { id: 2, name: "Работа" },
  { id: 3, name: "ДР" },
];
