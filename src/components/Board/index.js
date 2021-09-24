import React, { useCallback, useEffect, useState } from "react";
import {
  StyledBoards,
  StyledCard,
  StyledData,
  StyledTitle,
} from "./styledBoard";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

export const Board = () => {
  const { idBoard } = useParams();
  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    const { data } = await axios.get(`/api/getTasks${idBoard}`);

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

  return (
    <StyledBoards>
      {tasks.map((task) => (
        <StyledCard key={task._id}>
          <StyledTitle>{task._id}</StyledTitle>
          <StyledData>123123</StyledData>
        </StyledCard>
      ))}
      <NewTask newTask={newTask} />
    </StyledBoards>
  );
};

const NewTask = ({ newTask }) => {
  return (
    <StyledCard style={{ justifyContent: "center", alignItems: "center" }}>
      <IconButton id={"hui"} onClick={newTask}>
        <AddCircleOutlineIcon style={{ fontSize: "50px" }} color="primary" />
      </IconButton>
    </StyledCard>
  );
};
