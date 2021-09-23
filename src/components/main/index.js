import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyledCards } from "./styledIndex";
import { Task, CardNewTable } from "./task";
import { Moadal } from "./modal";
import { UserContext } from "../../context";
import {
  ListItemIcon,
  ListItem,
  SwipeableDrawer,
  ListItemText,
  Box,
  List,
  Button,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import axios from "axios";

import styled from "styled-components";
import { then } from "pg/lib/native/query";

export const Tables = () => {
  const [visibleTemporaryDrawer, setVisibleTemporaryDrawer] = useState(false);
  const [tables, setTables] = useState([]);
  const [notTables, setNotTables] = useState(false);

  const { userId } = useContext(UserContext);

  const getTablesUser = useCallback(async () => {
    const { data } = await axios.get(`/api/getTables/${userId}`);

    if (data.array.length <= 0) {
      setNotTables(true);
    } else {
      setTables(data.array);
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
  const newTable = () => {
    axios.post(`/api/newTable`, { userId });
  };
  const getTable = async (idTable) => {
    const { data } = await axios.get(`/api/getTable/${idTable}`);
    return data.nameTable;
  };

  const TableName = ({ id }) => {
    const [nameTable, setNameTable] = useState("");
    const get = async () => {
      const data = await getTable(id);
      setNameTable(data);
    };

    get().then((r) => r);

    return <div>{nameTable}</div>;
  };


  const Tables = () => (
    <Box
      sx={{ width: "250px" }}
      role="presentation"
      /*onClick={toggleDrawer( false)}*/
    >
      <List>
        {tables.map((id) => (
          <ListItem button key={id}>
            <TableName id={id} />
          </ListItem>
        ))}
        <Button onClick={newTable}>Создать глвую доску</Button>
      </List>
    </Box>
  );

  return (
    <StyledCards>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer(true)}>asdasdasd</Button>
        <SwipeableDrawer
          anchor={"left"}
          open={visibleTemporaryDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {Tables()}
        </SwipeableDrawer>
      </React.Fragment>
    </StyledCards>
  );
};
