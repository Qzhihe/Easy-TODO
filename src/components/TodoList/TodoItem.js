import { Fragment, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    // faCircleCheck,
    // faChevronDown,
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import { Box, Card, List, Typography } from "@mui/material";

import { getCalendarDate } from "../../utils/date";
import { getPriorityProp } from "../../utils/priority";

const TodoItem = ({ data }) => {
    const todoProps = useRef(["date", "alarm", "priority", "category"]);

    const todo = data;

    return (
        <Fragment>
            <Card
                component="li"
                sx={{
                    height: "4rem",
                    padding: "0 24px",
                    userSelect: "none",
                    cursor: "pointer",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "0 1rem",
                        height: "100%",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <FontAwesomeIcon
                            size="lg"
                            icon={faCircleNotch}
                            style={{
                                color: "rgb(255, 128, 0)",
                            }}
                            onClick={() => {}}
                        />
                    </Box>

                    <Box>
                        <Typography>{todo.title}</Typography>
                        <List
                            disablePadding
                            sx={{ display: "flex", gap: "0 0.5rem" }}
                        >
                            {todoProps.current.map((prop, idx) => {
                                return (
                                    todo[prop] && (
                                        <Box
                                            key={idx}
                                            component="li"
                                            sx={{ listStyle: "none" }}
                                        >
                                            <TodoItemProp
                                                data={{ prop, val: todo[prop] }}
                                            />
                                        </Box>
                                    )
                                );
                            })}
                        </List>
                    </Box>
                </Box>
            </Card>
        </Fragment>
    );
};

export default TodoItem;

const TodoItemProp = ({ data }) => {
    const {prop, val} = data;

    let styles = {},
        children = null;

    switch (prop) {
        case "priority":
            children = getPriorityProp(val, "title");
            styles.color = getPriorityProp(val, "color");
            break;
        case "date":
            children = getCalendarDate(val);
            break;
        case "alarm":
            break;
        case "category":
            break;
        default:
            break;
    }

    return (
        <Typography fontSize="0.75rem" {...styles} sx={{ opacity: 0.8 }}>
            {children}
        </Typography>
    );
};
