import React, {useCallback, useContext, useEffect, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import {StyledHeaderBoard} from "./styledIndex";
import axios from "axios";
import {UserContext} from "../../context";
import {useParams} from "react-router-dom";

// TODO:  опять renameTable какой нахуй тейбл?)))

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
            // TODO: name:name  как думаешь что надо с этим сделать?))
            await axios.put(`/api/renameBoard`, { name: name, idBoard }).then((r) => {
                // TODO: почему Р не используется? сделай везде обработку ошибок и completed
                getBoard();
                getUser();
            });
        }
        // TODO: то есть если будет ошибка то всё равно статус поменяется и нихуя не изменится?
        setVisibleRenameTextFiled(!visibleRenameTextFiled);
    };

    return(
        <StyledHeaderBoard>
            {/*// TODO: зачем ты проверяешь на тру?  ты же можешь просто написать visibleRenameTextFiled ?  */}
            {/*// TODO: это не хедер а тайтл*/}
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