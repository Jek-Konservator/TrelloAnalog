import React, { useCallback, useEffect, useState } from "react";
import { StyledBoards, StyledCard } from "./styledTask";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { BoardTitle } from "./boardTitle";
import { TaskTitle } from "./taskTitle";
import { TaskDescription } from "./taskDescription";

export const Board = () => {
  const { idBoard } = useParams();

  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    await axios
      .get(`/api/getTasks/${idBoard}`)
      .then(({ data }) => {
        if (data) {
          setTasks(data);
        }
      })
      .catch((err) => {
        console.log("Ошибка получения задач", err);
      });
  }, [idBoard]);


  useEffect(() => {
    getTasks().then();
  }, [getTasks]);

  const newTask = async () => {
    await axios
      .post(`/api/newTask`, { idBoard })
      .then(() => getTasks())
      .catch((err) => {
        console.log("Ошибка при создании новой задачи", err);
      });
  };

  return (
    <div>
      <BoardTitle />
      <StyledBoards>
        {tasks.map((task) => (
          <StyledCard key={task._id}>
            <TaskTitle task={task} getTasks={getTasks} />
            <TaskDescription task={task} getTasks={getTasks} />
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
