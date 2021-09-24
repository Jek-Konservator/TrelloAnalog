import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyledBoardsMenu } from "./styledIndex";
import { UserContext } from "../../context";
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
import useStyles from "../../styles/styledMUI";
import { useHistory, useParams } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";

export const BoardMenu = () => {
  const [visibleTemporaryDrawer, setVisibleTemporaryDrawer] = useState(false);
  const [boards, setBoards] = useState([]);
  /*
  const [notTables, setNotTables] = useState(false);
*/
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const { idBoard } = useParams();

  console.log(idBoard);
  const getBoardsUser = useCallback(async () => {
    console.log(user);
    const { data } = await axios.get(`/api/getBoards/${user.id}`);
    // TODO: перепиши на обработку ошибок
    if (data.length <= 0) {
      // setNotTables(true);
    } else {
      setBoards(data);
    }
  }, [user]);

  useEffect(() => {
    if (user !== undefined) {
      getBoardsUser().then((r) => r);
    }
  }, [getBoardsUser, user]);

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

  const newBoard = async () => {
    const { data } = await axios.post(`/api/newBoard`, { userId: user.id });
    if (data.message === "addBoards") {
      const { data } = await axios.get(`/api/getBoards/${user.id}`);
      if (data.length <= 0) {
        //setNotTables(true);
      } else {
        setBoards(data);
      }
    }
  };

  const toBoards = (idBoard) => {
    setVisibleTemporaryDrawer(false);
    history.replace(`/boards/${idBoard}`);
  };

  return (
    <StyledBoardsMenu>
      <React.Fragment key={"left"}>
        <IconButton onClick={toggleDrawer(true)}>
          <ReorderIcon />
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
              boards={boards}
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
    <List
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ListItemText>{board.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  </Box>
);
