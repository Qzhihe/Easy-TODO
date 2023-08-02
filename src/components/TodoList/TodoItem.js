import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faCircleCheck,
    faCircleNotch,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { Box, Card, Typography } from "@mui/material";

const TodoItem = (props) => {
    const { data } = props;

    const { title, type, isDone } = data;

    return (
        <Fragment>
            <Card
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "4rem",
                    padding: "0 24px",
                    margin: "20px 0",
                    userSelect: "none",
                    cursor: "pointer",
                }}
            >
                <FontAwesomeIcon
                    icon={faCircleNotch}
                    size="lg"
                    style={{
                        color: "rgb(255, 128, 0)",
                    }}
                    onClick={() => {}}
                />
                <Box sx={{ ml: "12px" }}>
                    <Typography>{title}</Typography>
                    <Typography
                        sx={{ fontSize: "12px", color: "rgba(0, 0, 0, .6)" }}
                    >
                        {type}
                    </Typography>
                </Box>
            </Card>
        </Fragment>
    );
};

export default TodoItem;
