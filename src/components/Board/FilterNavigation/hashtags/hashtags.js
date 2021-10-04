import React, {useState} from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import {StyledHashtags} from "./styledHashtags";
import axios from "axios";

export const Hashtags = ({type, id}) => {

    const [hashtagsParams, setHashtagsParams] = useState();

    const hashtags = [
        { id: 0, name: "Папе" },
        { id: 1, name: "Маме" },
        { id: 2, name: "Работа" },
        { id: 3, name: "ДР" },
    ];
console.log(hashtags)

    const useHashtags = () =>{

    if( type === "taskHashtags"){
        //console.log(hashtagsParams)
        // hashtags.includes(name)
       // axios.post(`/api/editTaskHashtags`, {id, hashtagsParams})
    }else{}}



  return (
    <StyledHashtags>
      <Autocomplete
        sx={ type === "taskHashtags" ?  { width: "200px" } : { width: "300px" }}
        multiple
        onChange={(event, value) => {
          const tags = value
            .map((e) => e.name)
            .join()
            .toString();
          setHashtagsParams({
            ...hashtagsParams,
            hashtags: tags,
          }); console.log(value);
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
      <Button onClick={useHashtags}>Применить</Button>
    </StyledHashtags>
  );
};
