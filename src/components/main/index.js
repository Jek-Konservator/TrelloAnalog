import React, { useContext } from "react";
import { UserContext } from "../../context";
import {
  StyledDescriptionMainCard,
  StyledMain,
  StyledTitleMainCard,
} from "./styled";
import { Card, IconButton } from "@mui/material";
import { Button } from "@material-ui/core";
import useStyles from "../../styles/styledMUI";
import { useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

export const Main = () => {
  const { user, getUser } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const toBoards = (idBoard) => {
    history.replace(`/boards/${idBoard}`);
  };

  const newBoard = () => {
    axios
      .post(`/api/newBoard`, { userId: user.user.id })
      .then(({ data }) => {
        getUser();
        console.log(data.message);
      })
      .catch((err) => {
        console.log("Ошибка добавления новой доски", err);
      });
  };

  return (
    <StyledMain>
      {user &&
      (user.boards).sort((a, b) => a.time < b.time ? 1 : -1).map((board) => (
          <Card
            key={board._id}
            className={classes.cardMain}
            style={{ borderRadius: "20px" }}
          >
            <StyledTitleMainCard>
              <div
                title={board.name}
                style={{
                  padding: "0 25px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {board.name}
              </div>
            </StyledTitleMainCard>
            <StyledDescriptionMainCard>
              <Button
                className={classes.buttonMain}
                onClick={() => toBoards(board._id)}
              >
                Открыть доску
              </Button>
            </StyledDescriptionMainCard>
          </Card>
        ))}

      <Card
        className={classes.cardMain}
        style={{
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={newBoard}>
          <AddCircleOutlineIcon style={{ fontSize: "50px" }} color="primary" />
        </IconButton>
      </Card>
    </StyledMain>
  );
};
