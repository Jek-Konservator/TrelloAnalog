import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import TagIcon from "@mui/icons-material/Tag";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { StyledData } from "./styled";
import axios from "axios";
import { Hashtags } from "../../FilterNavigation/hashtags";

export const TaskDescription = ({ task, getTasks }) => {
  const [visibleEditTask, setVisibleEditTask] = useState(false);
  const [visibleEditHashtagTask, setVisibleEditHashtagTask] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [hashtagsParamsNull, setHashtagsParamsNull] = useState(false);

  const editDescriptionTask = async (id) => {
    if (taskText !== "") {
      await axios
        .put(`/api/editTask`, { taskText, id })
        .then(() => {
          getTasks();
          setVisibleEditTask(false);
        })
        .catch((err) => {
          console.log("Ошибка редактирования описания задачи", err);
        });
    }
  };

  const editHashtagTask = async ({ taskHashtags }) => {
    if (taskHashtags) {
      axios
        .put(`/api/editTaskHashtags`, { id: task._id, hashtags: taskHashtags })
        .then(({ data }) => {
          console.log(data);
          setVisibleEditHashtagTask(false);
          setHashtagsParamsNull(false);
          getTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setHashtagsParamsNull(true);
    }
  };

  return (
    <StyledData>
      {task && (
        <>
          {visibleEditHashtagTask === true ? (
            <>
              <Hashtags
                setVisibleEditHashtagTask={setVisibleEditHashtagTask}
                hashtagsParamsNull={hashtagsParamsNull}
                taskHashtags={task.hashtags}
                type={"taskHashtags"}
                editHashtagTask={editHashtagTask}
              />
            </>
          ) : (
            <>
              {task.description !== "" ? (
                <>
                  {visibleEditTask ? (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        focused={true}
                        style={{ width: "85%" }}
                        inputProps={{ maxLength: 100 }}
                        defaultValue={task.description}
                        label={"Задача"}
                        onChange={(e) => setTaskText(e.target.value)}
                      />
                      <IconButton
                        style={{ marginLeft: "10px", boxSizing: "border-box" }}
                        onClick={() => setVisibleEditTask(false)}
                      >
                        <CancelIcon
                          style={{ fontSize: 30 }}
                          color={"primary"}
                        />
                      </IconButton>
                      <IconButton
                        style={{ marginLeft: "10px", boxSizing: "border-box" }}
                        onClick={() => editDescriptionTask(task._id)}
                      >
                        <CheckCircleOutlineIcon
                          style={{ fontSize: 30 }}
                          color={"primary"}
                        />
                      </IconButton>
                    </div>
                  ) : (
                    <>
                      <div
                        title={task.description}
                        style={{
                          maxWidth: " 80%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div>{task.description}</div>
                        <div style={{ color: "#2196f3" }}>
                          {task.hashtags.map((hashtag) => {
                            // TODO: tut
                            return "#" + hashtag;
                          })}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <IconButton onClick={() => setVisibleEditTask(true)}>
                          <EditIcon color={"primary"} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setVisibleEditHashtagTask(true);
                          }}
                        >
                          <TagIcon color={"primary"} />
                        </IconButton>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    inputProps={{ maxLength: 100 }}
                    label={"Задача"}
                    onChange={(e) => setTaskText(e.target.value)}
                  />

                  <IconButton
                    onClick={() => editDescriptionTask(task._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    <AddCircleOutlineIcon
                      color={"primary"}
                      style={{ fontSize: 30 }}
                    />
                  </IconButton>
                </div>
              )}
            </>
          )}
        </>
      )}
    </StyledData>
  );
};
