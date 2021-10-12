import React, {useContext, useState} from "react";
import { IconButton, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTitle } from "./styled";
import axios from "axios";
import {UserContext} from "../../../../context";

export const TaskTitle = ({ task, getTasks }) => {
  const { setDataSnackBar } = useContext(UserContext);
  const [visibleRenameTask, setVisibleRenameTask] = useState(false);
  const [taskName, setTaskName] = useState("");


  const renameTask = async (name, id) => {
    if (taskName !== "") {
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      // TODO: tut
      await axios
        .put(`/api/renameTask`, { name: name, id: id })
        .then(() => {
          getTasks();
          setVisibleRenameTask(false);
          setDataSnackBar({
            type: "success",
            massage: "Задача успешно переименована",
          });
        })
        .catch((err) => {
          setDataSnackBar({
            type: "error",
            massage: "Ошибка редактирования названия задачи",
          });
          console.log(err);
        });
    } else {
      setVisibleRenameTask(false);
    }
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
          <IconButton
            style={{ marginLeft: "10px", boxSizing: "border-box" }}
            onClick={() => setVisibleRenameTask(false)}
          >
            <CancelIcon style={{ fontSize: 30 }} color={"primary"} />
          </IconButton>
          <IconButton
            style={{ marginRight: "20px" }}
            onClick={() => renameTask(taskName, task._id)}
          >
            <CheckCircleOutlineIcon
              style={{ fontSize: 30 }}
              color={"primary"}
            />
          </IconButton>
        </>
      ) : (
        <>
          <div
            title={task.name}
            style={{
              maxWidth: "80%",
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
