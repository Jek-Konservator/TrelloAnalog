import React, {useCallback, useEffect, useState } from "react";
import { StyledBoards } from "./styledTask";
import { useParams } from "react-router-dom";
import { IconButton, Card } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { BoardTitle } from "./boardTitle";
import { TaskTitle } from "./Task/taskTitle";
import { TaskDescription } from "./Task/taskDescription";
import useStyles from "../../styles/styledMUI";
import { FilterNavigation } from "./FilterNavigation";
import { StyleContent } from "../../styles/GlobalStyle";

export const Board = () => {
  const { idBoard } = useParams();
  const classes = useStyles();

  const [tasks, setTasks] = useState([]);
  const [textSearch, setTextSearch] = useState("");

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

  const searchTask = async () => {
    if (textSearch.text !== "" && textSearch) {
      axios
        .get(`/api/searchTask/${textSearch.text}/${idBoard}`)
        .then(({ data }) => setTasks(data))
        .catch((err) => console.log(err));
    } else {
     await getTasks()
    }
  };

  const getTasksHashtag = async ({ taskHashtags }) => {
      if (taskHashtags) {
    if (taskHashtags.length !== 0) {
      axios
        .get(`/api/getTasksHashtag/${taskHashtags}/${idBoard}`)
        .then(({ data }) => {
          setTasks(data);
        })
        .catch((err) => {
          console.log("Ошибка фильтрации по тегам", err);
        });
    } else {
      await getTasks();
    }
      }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{ width: "85%", display: "flex", justifyContent: "flex-end" }}
      >
        <StyleContent>
          <BoardTitle />
          <StyledBoards>
            {tasks.map((task) => (
              <Card
                className={classes.cardTask}
                key={task._id}
                style={{ borderRadius: "8px" }}
              >
                <TaskTitle task={task} getTasks={getTasks} />
                <TaskDescription task={task} getTasks={getTasks} />
              </Card>
            ))}
            <NewTask newTask={newTask} classes={classes} />
          </StyledBoards>
        </StyleContent>
      </div>
      <div style={{ width: "15%", display: "flex", justifyContent: "center" }}>
        <FilterNavigation
          textSearch={textSearch}
          setTextSearch={setTextSearch}
          searchTask={searchTask}
          getTasksHashtag={getTasksHashtag}
        />
      </div>
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
        borderRadius: "8px",
      }}
    >
      <IconButton onClick={newTask}>
        <AddCircleOutlineIcon style={{ fontSize: "50px" }} color="primary" />
      </IconButton>
    </Card>
  );
};
