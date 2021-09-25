import React, { useCallback, useEffect, useState } from "react";
import {
  StyledBoards,
  StyledCard,
  StyledData,
  StyledTitle,
} from "./styledIndex";
import { useParams } from "react-router-dom";
import { IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BoardHeader } from "./boardHeader";

export const Board = () => {
  const { idBoard } = useParams();

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [visibleRenameTask, setVisibleRenameTask] = useState(false);
  const [visibleEditTask, setVisibleEditTask] = useState(false);
  const [taskText, setTaskText] = useState("");

  const getTasks = useCallback(async () => {
    const { data } = await axios.get(`/api/getTasks/${idBoard}`);
    if (data !== null) {
      setTasks(data);
    }
  }, [idBoard]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const newTask = async () => {
    await axios.post(`/api/newTask`, { idBoard }).then((r) => getTasks());
  };
  const editTask = async (id) => {
    console.log(id, taskText);
    await axios.put(`/api/editTask`, { id, taskText }).then((r) => getTasks());
  };

  const renameTask = async (name, id) => {
    if (typeof name === "string") {
      setTaskName("");
      if (taskName !== "") {
        await axios.put(`/api/renameTask`, { name: name, id: id }).then((r) => {
          getTasks();
        });
      }
    }
    setVisibleRenameTask(!visibleRenameTask);
  };
  const editTextTask = async (text, id) => {
    if (typeof text === "string") {
      setTaskText("");
      if (taskText !== "") {
        await axios.put(`/api/editTask`, { taskText, id }).then((r) => {
          getTasks();
        });
      }
    }
    setVisibleEditTask(!visibleEditTask);
  };
  return (
    <div>
      <BoardHeader />
      <StyledBoards>
        {tasks.map((task) => (
          <StyledCard key={task._id}>
            <StyledTitle>
              {visibleRenameTask && true ? (
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
                    style={{ position: "sticky", right: "10px" }}
                  >
                    <EditIcon color={"primary"} />
                  </IconButton>
                </>
              )}
            </StyledTitle>

            <StyledData>
              {task.task !== "" ? (
                <>
                  {visibleEditTask && true ? (
                    <>
                      <TextField
                          inputProps={{maxLength: 100}}
                          defaultValue={task.task}
                        label={"Задач"}
                        onChange={(e) => setTaskText(e.target.value)}
                      />
                      <IconButton onClick={() => editTextTask(taskText,task._id)}>
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
                      <IconButton onClick={() => setVisibleEditTask(true)} style={{paddingLeft: "10px"}}>
                        <EditIcon
                          color={"primary"}
                          style={{ position: "sticky", right: "10px" }}
                        />
                      </IconButton>
                    </>
                  )}
                </>
              ) : (
                <div style={{display: "flex", justifyContent: "left",
                  alignItems: "center"}}>
                  <TextField
                    inputProps={{ maxLength: 100 }}
                    label={"Задача"}
                    onChange={(e) => setTaskText(e.target.value)}
                  />
                  <IconButton onClick={() => editTask(task._id)} style={{marginLeft: "10px"}}>
                    <AddCircleOutlineIcon
                      color={"primary"}
                      style={{ fontSize: 30 }}
                    />
                  </IconButton>
                </div>
              )}
            </StyledData>
          </StyledCard>
        ))}
        <NewTask newTask={newTask} />
      </StyledBoards>
    </div>
  );
};

const NewTask = ({ newTask }) => {
  return (
    <StyledCard style={{ justifyContent: "center", alignItems: "center" }}>
      <IconButton onClick={newTask}>
        <AddCircleOutlineIcon style={{ fontSize: "50px" }} color="primary" />
      </IconButton>
    </StyledCard>
  );
};
