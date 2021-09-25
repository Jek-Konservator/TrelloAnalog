import React, { useCallback, useEffect, useState } from "react";
import {
  StyledBoards,
  StyledCard,
  StyledData, StyledHeaderBoard,
  StyledTitle,
} from "./styledIndex";
import { useParams } from "react-router-dom";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';




export const Board = () => {
  const { idBoard } = useParams();
  const [tasks, setTasks] = useState([]);
  const [board, setBoard] = useState({});
  const [visibleRenameTextFiled, setVisibleRenameTextFiled] = useState(false);

  const getTasks = useCallback(async () => {
    const { data } = await axios.get(`/api/getTasks/${idBoard}`);
    if (data !== null) {
      setTasks(data);
    }
  }, [idBoard]);

  const getBoard = useCallback(async () => {
    const { data } = await axios.get(`/api/getBoard/${idBoard}`);
    if (data !== null) {
      setBoard(data);
    }
  }, [idBoard]);
  useEffect(() => {
    getTasks();
    getBoard();
  }, [getTasks, getBoard]);

  const newTask = async () => {
    await axios.post(`/api/newTask`, { idBoard }).then((r) => getTasks());
  };

  const renameTable = () => {
    setVisibleRenameTextFiled(!visibleRenameTextFiled);
  }

  return (
    <div>
      <StyledHeaderBoard>
        {board.name}
        <TextField></TextField>
        <IconButton onClick={renameTable}>
          <EditIcon/>
        </IconButton>
      </StyledHeaderBoard>
      <StyledBoards>
        {tasks.map((task) => (
          <StyledCard key={task._id}>
            <StyledTitle>{task._id}</StyledTitle>
            <StyledData>123123</StyledData>
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
