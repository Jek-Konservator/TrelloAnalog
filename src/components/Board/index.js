import React, { useCallback, useEffect, useState } from "react";
import { StyledBoards } from "./styledTask";
import { useParams } from "react-router-dom";
import { IconButton, Card } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { BoardTitle } from "./boardTitle/boardTitle";
import { TaskTitle } from "./Task/taskTitle/taskTitle";
import { TaskDescription } from "./Task/taskDescription/taskDescription";
import useStyles from "../../styles/styledMUI";

export const Board = () => {
  const { idBoard } = useParams();
  const classes = useStyles();

  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    await axios
      .get(`/api/getTasks/${idBoard}`)
      .then(({ data }) => {
        setTasks(data);
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

  const getTasksHashtag = async ({taskHashtags} ) => {

    if (taskHashtags.length !== 0) {
      axios
        .get(`/api/getTasksHashtag/${taskHashtags}`)
        .then(({ data }) => {
          setTasks(data);
        })
        .catch((err) => {
          console.log("Ошибка редактирования названия доски", err);
        });
    } else {
        await getTasks()
    }
  };

  return (
    <div>
      <BoardTitle getTasksHashtag={getTasksHashtag} />
      <StyledBoards>
        {tasks.map((task) => (
          <Card
            className={classes.cardTask}
            key={task._id}
            style={{ borderRadius: "20px" }}
          >
            <TaskTitle task={task} getTasks={getTasks} />
            <TaskDescription task={task} getTasks={getTasks} />
          </Card>
        ))}
        <NewTask newTask={newTask} classes={classes} />
      </StyledBoards>
    </div>
  );
};

const NewTask = ({ newTask, classes }) => {
  return (
    <Card
      className={classes.cardTask}
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
      }}
    >
      <IconButton onClick={newTask}>
        <AddCircleOutlineIcon style={{ fontSize: "50px" }} color="primary" />
      </IconButton>
    </Card>
  );
};
