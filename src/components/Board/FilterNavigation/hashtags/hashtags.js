import React, { useContext, useState } from "react";
import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { StyledHashtags } from "./styledHashtags";
import axios from "axios";
import { UserContext} from "../../../../context";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const Hashtags = ({hashtagsParamsNull, taskHashtags, type, editHashtagTask, getTasksHashtag }) => {
  const { user, getUser } = useContext(UserContext);
  const [hashtagsParams, setHashtagsParams] = useState({taskHashtags});
  const [visibleNewHashtags, setVisibleNewHashtags] = useState(false);
  const [newHashtagsText, setNewHashtagsText] = useState("");

  const newHashtags = async () => {
    await axios
      .post(`api/newHashtag`, {
        hashtag: newHashtagsText,
        idUser: user.userInfo.id,
      })
      .then(({ data }) => {
        getUser();
        setVisibleNewHashtags(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledHashtags>
      {user ? (
        <>
          <Autocomplete
            sx={
              type === "taskHashtags" ? { width: "200px" } : { width: "300px" }
            }
            defaultValue={taskHashtags}
            multiple
            onChange={(event, value) => {
              const tags = value.map((e) => e);
              setHashtagsParams({
                ...hashtagsParams,
                taskHashtags: tags,
              });
            }}
            options={user.userInfo.hashtags}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                  error={hashtagsParamsNull}
                {...params}
                variant="standard"
                label="Хештеги"
                placeholder="Хештеги"
              />
            )}
          />

          {type === "taskHashtags" ? (
            <>
              <IconButton onClick={() => editHashtagTask(hashtagsParams)}>
                <CheckCircleOutlineIcon color={"primary"} />
              </IconButton>{" "}
            </>
          ) : (
            <>
              <Button onClick={() => getTasksHashtag(hashtagsParams)}>
                Применить
              </Button>
              {visibleNewHashtags ? (
                <>
                  <TextField
                    label={"Хештег"}
                    onChange={(e) => setNewHashtagsText(e.target.value)}
                  />
                  <IconButton onClick={() => newHashtags()}>
                    <CheckCircleOutlineIcon color={"primary"} />
                  </IconButton>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setVisibleNewHashtags(true);
                  }}
                >
                  Добавить хэштэг
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        ""
      )}
    </StyledHashtags>
  );
};
