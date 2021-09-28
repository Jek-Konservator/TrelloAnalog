import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { StyledData } from "./styledTask";
import axios from "axios";

export const TaskDescription = ({ task, getTasks }) => {
  const [visibleEditTask, setVisibleEditTask] = useState(false);
  const [taskText, setTaskText] = useState("");

  const editDescriptionTask = async (id) => {
    if (taskText !== "") {
      await axios
        .put(`/api/editTask`, { taskText, id })
        .then(() => {
          getTasks();
        })
        .catch((err) => {
          console.log("Ошибка редактирования описания задачи", err);
        });
    }
    setVisibleEditTask(false);
  };

  return (
    <StyledData>
      {task.task !== "" ? (
        <>
          {visibleEditTask ? (
            <>
              <TextField
                inputProps={{ maxLength: 100 }}
                defaultValue={task.task}
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
                title={task.task}
                style={{
                  maxWidth: " 80%",
                }}
              >
                {task.task}
              </div>
              <IconButton
                onClick={() => setVisibleEditTask(true)}
                style={{ paddingLeft: "10px" }}
              >
                <EditIcon color={"primary"} />
              </IconButton>
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
            <AddCircleOutlineIcon color={"primary"} style={{ fontSize: 30 }} />
          </IconButton>
        </div>
      )}
    </StyledData>
  );
};
