import { Fragment, memo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    // faCircleCheck,
    // faCircleNotch,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { Box, Card, List, Typography } from "@mui/material";

import TodoItem from "./TodoItem";

import { StoreContext } from "../../store/store";

const TodoList = memo((props) => {
    const {
        store: { todoList },
        // setStore,
    } = useContext(StoreContext);

    const todo = todoList.filter((item) => !item.isDone);
    const done = todoList.filter((item) => item.isDone);

    // function handleComplete(id) {
    //     console.log(id + "这条日程要完成了，该发请求了");
    //     const taskIndex = todoList.findIndex((task) => task.id === id);
    //     if (taskIndex !== -1) {
    //         const updatedList = [...todoList];
    //         updatedList[taskIndex].state = "1";

    //         setStore((prev) => ({ ...prev, todoList: updatedList }));
    //     }
    // }

    return (
        <Fragment>
            <Box
                sx={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    gap: "1rem 0",
                    mt: "20px",
                }}
            >
                <Catalog title="未完成" count={todo.length} />
                <List
                    disablePadding
                    sx={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        gap: "1rem 0",
                    }}
                >
                    {todo.map((item) => {
                        return (
                            <Fragment key={item.id}>
                                <TodoItem data={item} />
                            </Fragment>
                        );
                    })}
                </List>

                <Catalog title="已完成" count={done.length} />
                <List
                    disablePadding
                    sx={{
                        display: "flex",
                        flexFlow: "column nowrap",
                        gap: "1rem 0",
                    }}
                >
                    {done.map((item) => {
                        return (
                            <Fragment key={item.id}>
                                <TodoItem data={item} />
                            </Fragment>
                        );
                    })}
                </List>
            </Box>
        </Fragment>
    );
});
export default TodoList;

const Catalog = (props) => {
    const { title, count } = props;
    return (
        <Fragment>
            <Card
                sx={{
                    boxShadow: "none",
                    backgroundColor: "rgb(245, 245, 245)",
                }}
            >
                <Box
                    onClick={() => {}}
                    sx={{
                        display: "grid",
                        gridTemplate: "1fr / auto auto auto",
                        columnGap: "12px",
                        width: "fit-content",
                        userSelect: "none",
                        cursor: "pointer",
                    }}
                >
                    <FontAwesomeIcon icon={faChevronDown} size="lg" />
                    <Typography>{title}</Typography>
                    <Typography>{count}</Typography>
                </Box>
            </Card>
        </Fragment>
    );
};
