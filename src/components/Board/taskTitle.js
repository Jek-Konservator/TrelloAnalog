import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTitle } from "./styledTask";
import axios from "axios";

export const TaskTitle = ({ task, getTasks }) => {
  const [visibleRenameTask, setVisibleRenameTask] = useState(false);
  const [taskName, setTaskName] = useState("");

  const renameTask = async (name, id) => {
    if (taskName !== "") {
      await axios
        .put(`/api/renameTask`, { name: name, id: id })
        .then(() => {
          getTasks();
        })
        .catch((err) => {
          console.log("Ошибка редактирования названия задачи", err);
        });
    }
    setVisibleRenameTask(false);
  };

  return (
    <StyledTitle>
      {visibleRenameTask ? (
        <>
          <TextField
            label={"Название задачи"}
            defaultValue={task.name}
            style={{ margin: "10px 0 10px 0", width: "80%" }}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          <IconButton onClick={() => renameTask(taskName, task._id)}>
            <CheckCircleOutlineIcon
              style={{ fontSize: 30, marginRight: 15 }}
              color={"primary"}
            />
          </IconButton>
        </>
      ) : (
        <>
          <div
            title={task.name}
            style={{
              maxWidth: " 80%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {task.name}
          </div>
          <IconButton
            onClick={() => setVisibleRenameTask(true)}
            style={{ marginRight: 15 }}
          >
            <EditIcon color={"primary"} />
          </IconButton>
        </>
      )}
    </StyledTitle>
  );
};
