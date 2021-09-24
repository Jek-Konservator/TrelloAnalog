import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyledCards } from "./styledIndex";
import { UserContext } from "../../context";
import {ListItem, SwipeableDrawer, Box, List, ListItemText} from "@mui/material";
import { Button} from "@material-ui/core";


import axios from "axios";
import useStyles from "../../styledMUI";
import {useHistory} from "react-router-dom";

export const TablesMenu = () => {
  const [visibleTemporaryDrawer, setVisibleTemporaryDrawer] = useState(false);
  const [tables, setTables] = useState([]);
  const [notTables, setNotTables] = useState(false);

  const { userId } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const getTablesUser = useCallback(async () => {
    const { data } = await axios.get(`/api/getTables/${userId}`);
    if (data.length <= 0) {
      setNotTables(true);
    } else {
      setTables(data);
    }
  }, [userId]);

  useEffect(() => {
    if (userId !== "") {
      getTablesUser().then((r) => r);
    }
  }, [getTablesUser, userId]);

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
  const newTable = async () => {
    const {data} = await axios.post(`/api/newTable`, { userId });
    if(data.message === "addTables"){
      const { data } = await axios.get(`/api/getTables/${userId}`);
      if (data.length <= 0) {
        setNotTables(true);
      } else {
        setTables(data);
      }
    }
  };

  const toTable = (idTAbles) => {
    history.replace(`/tables/${idTAbles}`)

  }

  const TablesUser = () => (
    <Box
      sx={{ width: "250px" }}
      role="presentation"
    >
      <List style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center" }}>
        {tables.map((docs) => (
          <ListItem button key={docs._id} style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center" }}>
            <ListItemText onClick={() => toTable(docs._id)}  primary={docs.name}/>
          </ListItem>
        ))}
        <Button onClick={newTable} className={classes.buttonLogin}>Создать новую доску</Button>
      </List>
    </Box>
  );

  return (
    <StyledCards>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={visibleTemporaryDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {TablesUser()}
        </SwipeableDrawer>
      </React.Fragment>
    </StyledCards>
  );
};

