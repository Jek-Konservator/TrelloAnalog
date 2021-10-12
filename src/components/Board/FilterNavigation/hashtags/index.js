import React, { useContext, useState } from "react";
import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import { StyledHashtags } from "./styled";
import axios from "axios";
import { UserContext } from "../../../../context";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

export const Hashtags = ({
  hashtagsParamsNull,
  setVisibleEditHashtagTask,
  taskHashtags,
  type,
  editHashtagTask,
  getTasksHashtag,
}) => {
  const { user, getUser } = useContext(UserContext);
  const [hashtagsParams, setHashtagsParams] = useState({ taskHashtags });
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
      {user && (
        <>
          <div
            style={
              type !== "taskHashtags"
                ? { display: "flex", flexDirection: "column" }
                : { display: "flex", alignItems: "center" }
            }
          >
            <Autocomplete
              sx={
                type === "taskHashtags"
                  ? { width: "310px" }
                  : { width: "240px" }
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
                <IconButton
                  style={{ marginLeft: "10px", boxSizing: "border-box" }}
                  onClick={() => setVisibleEditHashtagTask(false)}
                >
                  <CancelIcon style={{ fontSize: 30 }} color={"primary"} />
                </IconButton>
                <IconButton onClick={() => editHashtagTask(hashtagsParams)}>
                  <CheckCircleOutlineIcon
                    style={{ fontSize: "30px" }}
                    color={"primary"}
                  />
                </IconButton>
              </>
            ) : (
              <>
                <Button onClick={() => getTasksHashtag(hashtagsParams)}>
                  Применить
                </Button>
              </>
            )}
          </div>

          {visibleNewHashtags ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                label={"Хештег"}
                onChange={(e) => setNewHashtagsText(e.target.value)}
              />

              <IconButton
                style={{ marginLeft: "10px" }}
                onClick={() => setVisibleNewHashtags(false)}
              >
                <CancelIcon style={{ fontSize: 30 }} color={"primary"} />
              </IconButton>
              <IconButton onClick={() => newHashtags()}>
                <CheckCircleOutlineIcon
                  style={{ fontSize: 30 }}
                  color={"primary"}
                />
              </IconButton>
            </div>
          ) : (
            type !== "taskHashtags" && (
              <Button
                onClick={() => {
                  setVisibleNewHashtags(true);
                }}
              >
                Добавить хeштeг
              </Button>
            )
          )}
        </>
      )}
    </StyledHashtags>
  );
};
