import React, { useContext, useState } from "react";
import { StyledBoardsMenu } from "./styledBoardsMenu";
import { UserContext } from "../../../context";
import {
  ListItem,
  SwipeableDrawer,
  Box,
  List,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Button } from "@material-ui/core";

import axios from "axios";
import useStyles from "../../../styles/styledMUI";
import { useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export const BoardMenu = () => {
  const [visibleTemporaryDrawer, setVisibleTemporaryDrawer] = useState(false);
  const { user, getUser } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();



  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setVisibleTemporaryDrawer(open);
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

  const toBoards = (idBoard) => {
    setVisibleTemporaryDrawer(false);
    history.replace(`/boards/${idBoard}`);
  };

  return (
    <StyledBoardsMenu>
      <React.Fragment key={"left"}>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        {visibleTemporaryDrawer && (
          <SwipeableDrawer
            anchor={"left"}
            open={visibleTemporaryDrawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <BoardsUser
              newBoard={newBoard}
              classes={classes}
              boards={(user.boards).sort((a, b) => a.time < b.time ? 1 : -1)}
              toBoards={toBoards}
            />
          </SwipeableDrawer>
        )}
      </React.Fragment>
    </StyledBoardsMenu>
  );
};

const BoardsUser = ({ newBoard, classes, boards, toBoards }) => (
  <Box sx={{ width: "250px" }} role="presentation">
    <List className={classes.listMenuBoards}>
      <Button
        onClick={newBoard}
        style={{ width: 250, borderRadius: 0 }}
        className={classes.buttonLogin}
      >
        Создать новую доску
      </Button>
      {boards.map((board) => (
        <ListItem
          button
          onClick={() => toBoards(board._id)}
          key={board._id}
          className={classes.listMenuBoards}
        >
          <ListItemText
            style={{
              maxWidth: " 80%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {board.name}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </Box>
);
