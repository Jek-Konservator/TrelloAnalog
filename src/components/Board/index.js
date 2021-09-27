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

  // TODO: у тебя тут фолс но ты передаёшь айди, тайпскрипт сказал привет
  const [visibleRenameTask, setVisibleRenameTask] = useState(false);


  const [visibleEditTask, setVisibleEditTask] = useState(false);
  const [taskText, setTaskText] = useState("");

  const getTasks = useCallback(async () => {
    const { data } = await axios.get(`/api/getTasks/${idBoard}`);
    // TODO: тут опять же таки нужна обработка ошибок как и во всем проекте
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
    // TODO: опять же если что то пошло не так и оно не переименуется то почему статус поменяется?
    setVisibleRenameTask(false);
  };
  const editTextTask = async (text, id) => {
    // TODO: почему эдит текст таск если это у тебя было в прошлой функции а запрос просто на редактирование таски?
    if (typeof text === "string") {
      setTaskText("");
      // TODO: смысл от условия? ты меняешь стейт на пустую строку и снизу что-то сравниваешь если не пустая строка? так ты только что пустую строку сделал))))))
      if (taskText !== "") {
        await axios.put(`/api/editTask`, { taskText, id }).then((r) => {
          getTasks();
        });
      }
    }
    setVisibleEditTask(false);
  };
  return (
    <div>
      <BoardHeader />
      <StyledBoards>
        {tasks.map((task) => (
          <StyledCard key={task._id}>
            <StyledTitle>
              {visibleRenameTask === task._id ? (
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
                    onClick={() => setVisibleRenameTask(task._id)}
                    style={{ position: "sticky", right: "10px" }}
                  >
                    <EditIcon color={"primary"} />
                  </IconButton>
                </>
              )}
            </StyledTitle>
            {/*// TODO: опять таск таск зачем дублирование, ну стили пиздец невозможно чиатть я отписалуже что так лучше не делать*/}
            <StyledData>
              {task.task !== "" ? (
                <>
                  {visibleEditTask === task._id ? (
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
                      <IconButton onClick={() => setVisibleEditTask(task._id)} style={{paddingLeft: "10px"}}>
                        {/*// TODO: а зачем тут стики? и райт 10 , маргинов с паддингами не существует?)*/}
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
