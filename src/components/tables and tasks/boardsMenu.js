import React, { useCallback, useContext, useEffect, useState } from "react";
import {StyledBoardsMenu} from "./styledIndex";
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
import useStyles from "../../styledMUI";
import { useHistory } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";

export const BoardMenu = () => {
  const [visibleTemporaryDrawer, setVisibleTemporaryDrawer] = useState(false);
  const [boards, setBoards] = useState([]);
/*
  const [notTables, setNotTables] = useState(false);
*/
  const { userId } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const getBoardsUser = useCallback(async () => {
    const { data } = await axios.get(`/api/getBoards/${userId}`);
    if (data.length <= 0) {
     // setNotTables(true);
    } else {
      setBoards(data);
    }
  }, [userId]);


  useEffect(() => {
    if (userId !== "") {
      getBoardsUser().then((r) => r);
    }
  }, [getBoardsUser, userId]);

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
    const { data } = await axios.post(`/api/newBoard`, { userId });
    if (data.message === "addBoards") {
      const { data } = await axios.get(`/api/getBoards/${userId}`);
      if (data.length <= 0) {
        //setNotTables(true);
      } else {
        setBoards(data);
      }
    }
  };

  const toBoards = (idBoard) => {
    history.replace(`/boards/${idBoard}`);
    setVisibleTemporaryDrawer(false);
  };

  const BoardsUser = () => (
    <Box sx={{ width: "250px" }} role="presentation">
      <List
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {boards.map((docs) => (
          <ListItem
            button
            key={docs._id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemText
              primary={docs.name}
              onClick={() => toBoards(docs._id)}
            />
          </ListItem>
        ))}
        <Button onClick={newBoard} className={classes.buttonLogin}>
          Создать новую доску
        </Button>
      </List>
    </Box>
  );

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
            {BoardsUser()}
          </SwipeableDrawer>
        )}
      </React.Fragment>
    </StyledBoardsMenu>
  );
};
