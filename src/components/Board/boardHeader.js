import React, {useCallback, useContext, useEffect, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import {StyledHeaderBoard} from "./styledIndex";
import axios from "axios";
import {UserContext} from "../../context";
import {useParams} from "react-router-dom";

export const BoardHeader = () => {

    const { idBoard } = useParams();
    const { getUser } = useContext(UserContext);
    const [board, setBoard] = useState({});
    const [boardName, setBoardName] = useState("");
    const [visibleRenameTextFiled, setVisibleRenameTextFiled] = useState(false);


    const getBoard = useCallback(async () => {
        const { data } = await axios.get(`/api/getBoard/${idBoard}`);
        if (data !== null) {
            setBoard(data);
        }
    }, [idBoard]);
    useEffect(() => {
        getBoard();
    }, [ getBoard]);

    const renameTable = async (name) => {
        if (typeof name === "string") {
            setBoardName("");
            await axios.put(`/api/renameBoard`, { name: name, idBoard }).then((r) => {
                getBoard();
                getUser();
            });
        }
        setVisibleRenameTextFiled(!visibleRenameTextFiled);
    };

    return(
        <StyledHeaderBoard>
            {visibleRenameTextFiled && true ? (
                <>
                    <TextField
                        label={"Название доски"}
                        defaultValue={board.name}
                        onChange={(e) => {
                            setBoardName(e.target.value);
                        }}
                    />
                    <IconButton onClick={() => renameTable(boardName)}>
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
                    <IconButton onClick={renameTable}>
                        <EditIcon color={"primary"} />
                    </IconButton>
                </>
            )}
        </StyledHeaderBoard>
    )
}