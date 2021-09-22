import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyledCards } from "./styledIndex";
import { Card, CardNewTable } from "./card";
import { Moadal } from "./modal";
import { UserContext } from "../../context";
import axios from "axios";

export const Cards = () => {
  const [visable, setVisable] = useState(false);
  const [task, setTask] = useState([]);
  const [table, setTable] = useState([]);
  const [notTables, setNotTables] = useState(false);

  const { userId } = useContext(UserContext);

  const getTablesUser = useCallback(async () => {
    const { data } = await axios.get(`/api/getTables/${userId}`);

    if (data.array.length <= 0) {
      setNotTables(true);
    } else {
      setTable(data);
    }
  }, [userId]);

  const openModal = (data) => {
    setTask(data);
    setVisable(true);
  };

  useEffect(() => {
    if (userId !== "") {
      getTablesUser();
    }
  }, [getTablesUser, userId]);

  return (
    <StyledCards>
      {notTables && false
        ? [table].map((e) => (
            <Card
              title={"true"}
              data={[
                "ДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДД",
                "ДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДД",
                "ДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДД",
              ]}
              key={e}
              openModal={openModal}
              notTables={notTables}
            />
          ))
        : ""}
      <CardNewTable />
      {visable && <Moadal data={task} />}
    </StyledCards>
  );
};
