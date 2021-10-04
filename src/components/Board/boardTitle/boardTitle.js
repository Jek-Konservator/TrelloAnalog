import React, { useCallback, useContext, useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTitleBoard } from "./styledBoardTitle";
import axios from "axios";
import { UserContext } from "../../../context";
import { useParams } from "react-router-dom";

export const BoardTitle = ({setError}) => {
  const { idBoard } = useParams();
  const { getUser } = useContext(UserContext);
  const [board, setBoard] = useState({});
  const [boardName, setBoardName] = useState("");
  const [visibleRenameTextFiled, setVisibleRenameTextFiled] = useState(false);

  const getBoard = useCallback(async () => {
    await axios
      .get(`/api/getBoard/${idBoard}`)
      .then(({ data }) => {
        if ({ data }) {
          setBoard(data);
          setError("");
        }
      })
      .catch((err) => {
        console.log("Ошибка получения спика досок", err);
      });
  }, [idBoard, setError]);

  useEffect(() => {
    getBoard().then();
  }, [getBoard]);

  const renameBoard = async (name) => {
    if (name !== "") {
      await axios
        .put(`/api/renameBoard`, { name, idBoard })
        .then(() => {
          getBoard();
          getUser();
        })
        .catch((err) => {
          console.log("Ошибка редактирования названия доски", err);
        });
    }

    setVisibleRenameTextFiled(false);
  };
  return (
    <StyledTitleBoard>
      {visibleRenameTextFiled ? (
        <>
          <TextField
            label={"Название доски"}
            defaultValue={board.name}
            onChange={(e) => {
              setBoardName(e.target.value);
            }}
          />
          <IconButton onClick={() => renameBoard(boardName)}>
            <CheckCircleOutlineIcon
              style={{ fontSize: 30 }}
              color={"primary"}
            />
          </IconButton>
        </>
      ) : (
        <>
          <div
            title={board.name}
            style={{
              maxWidth: "500px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {board.name}
          </div>
          <IconButton onClick={() => setVisibleRenameTextFiled(true)}>
            <EditIcon color={"primary"} />
          </IconButton>
        </>
      )}
    </StyledTitleBoard>
  );
};
