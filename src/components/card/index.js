import React, { useState } from "react";
import { StyledCards } from "./styledIndex";
import { Card } from "./card";
import { Moadal } from "./modal";

export const Cards = () => {
  const [visable, setVisable] = useState(false);
  const [data, setData] = useState([]);

  const openModal = (data) => {
     setData(data)
    setVisable(true)
  };

  return (
    <StyledCards>
      {[1, 2, 3].map((e) => (
        <Card
          title={"Работа дела и ещё много всего"}
          data={[
            "ДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДД",
            "ДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДД",
            "ДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДДД",
          ]}
          key={e}
          openModal={openModal}
        />
      ))}

      {visable && <Moadal data={data} />}
    </StyledCards>
  );
};

