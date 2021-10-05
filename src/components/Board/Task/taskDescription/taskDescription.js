import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import TagIcon from "@mui/icons-material/Tag";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { StyledData } from "./styledTaskDescription";
import axios from "axios";
import { Hashtags } from "../../FilterNavigation/hashtags/hashtags";

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
                    <>
                      <TextField
                        inputProps={{ maxLength: 100 }}
                        defaultValue={task.description}
                        label={"Задач"}
                        onChange={(e) => setTaskText(e.target.value)}
                      />
                      <IconButton onClick={() => editDescriptionTask(task._id)}>
                        <CheckCircleOutlineIcon
                          style={{ fontSize: 30 }}
                          color={"primary"}
                        />
                      </IconButton>
                    </>
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
                        <div>
                          {task.hashtags.map((hashtag) => {
                            return " #" + hashtag;
                          })}
                        </div>
                        <div>{task.description}</div>
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
          )}{" "}
        </>
      )}
    </StyledData>
  );
};
