import { Fragment, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Card, Typography } from "@mui/material";

import { faFlag } from "@fortawesome/free-solid-svg-icons";

import { getPriorityProp } from "../../utils/priority";

import "./index.css";
import TodoList from "../../components/TodoList";
import { StoreContext } from "../../store/store";

const FourQuadrant = () => {
    const { store, setStore } = useContext(StoreContext);

    const { todoList } = store;

    function getTodosByPriority(priority) {
        if (todoList.length === 0) {
            return [];
        }

        return todoList.filter((item) => item.priority === priority);
    }

    return (
        <Fragment>
            <div
                style={{
                    display: "grid",
                    gridTemplate: "1fr 1fr / 1fr 1fr",
                    placeItems: "center",
                    gap: "1rem",
                    height: "100%",
                    padding: "1.5rem",
                    overflow: "hidden",
                }}
            >
                <Quadrant priority={3} data={getTodosByPriority(3)} />
                <Quadrant priority={2} data={getTodosByPriority(2)} />
                <Quadrant priority={1} data={getTodosByPriority(1)} />
                <Quadrant priority={0} data={getTodosByPriority(0)} />
            </div>
        </Fragment>
    );
};

export default FourQuadrant;

const Quadrant = (props) => {
    const { priority, data } = props;

    const titleMapping = useRef(
        new Map([
            [0, "不重要不紧急"],
            [1, "不重要但紧急"],
            [2, "重要不紧急"],
            [3, "重要且紧急"],
        ])
    );

    const title = titleMapping.current.get(priority),
        color = `rgb(${getPriorityProp(priority, "color")})`;

    return (
        <Fragment>
            <Card sx={{ display: "flex", width: "100%", height: "100%" }}>
                <div className="quadrant">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            height: "1.25rem",
                        }}
                    >
                        <FontAwesomeIcon icon={faFlag} color={color} />
                        <Typography sx={{ color: color }}>{title}</Typography>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            overflow: "auto",
                        }}
                    >
                        {data.length === 0 ? (
                            <Typography
                                sx={{
                                    margin: "auto",
                                    color: "rgba(0, 0, 0, 0.4)",
                                }}
                            >
                                没有任务
                            </Typography>
                        ) : (
                            <TodoList data={data} />
                        )}
                    </div>
                </div>
            </Card>
        </Fragment>
    );
};
