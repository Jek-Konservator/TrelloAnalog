import React, { useCallback, useEffect, useState } from "react";
import { StyledBoards, StyledCard, StyledTitle } from "./styledBoard";
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
    const data = await axios
      .post(`/api/newTask`, { idBoard })
      .then((r) => getTasks());
    console.log(data)
  };

  const NewBoard = () => {
    return (
      <StyledCard style={{ justifyContent: "center", alignItems: "center" }}>
        <IconButton onClick={newTask}>
          <AddCircleOutlineIcon style={{ fontSize: "50px" }} />
        </IconButton>
      </StyledCard>
    );
  };

  return (
    <StyledBoards>
      {tasks.map((task) => (
          <StyledCard key={task._id}>
            <StyledTitle>{task._id}</StyledTitle>
            <div>
              {/*  <StyledData>{data[0]}</StyledData>
        <StyledData>{data[1]}</StyledData>
        <StyledData>{data[2]}</StyledData>*/}
            </div>
          </StyledCard>
      ))}
      <NewBoard />
    </StyledBoards>
  );
};
