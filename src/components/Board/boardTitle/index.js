import React, { useCallback, useContext, useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTitleBoard } from "./styled";
import axios from "axios";
import { UserContext } from "../../../context";
import { useParams } from "react-router-dom";

export const BoardTitle = () => {
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
        }
      })
      .catch((err) => {
        console.log("Ошибка получения спика досок", err);
      });
  }, [idBoard]);

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
            <CheckCircleOutlineIcon color={"primary"} />
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
