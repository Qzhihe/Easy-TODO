import { Fragment, memo } from "react";

import { Box, List } from "@mui/material";

import TodoItem from "./TodoItem";

const TodoList = memo((props) => {
    const { data, handleSelectTodo } = props;

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
            <List
                disablePadding
                sx={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    gap: "1rem 0",
                    width: "100%",
                }}
            >
                {data.map((item) => {
                    return (
                        <Fragment key={item.id}>
                            <TodoItem
                                data={item}
                                handleSelectTodo={handleSelectTodo}
                            />
                        </Fragment>
                    );
                })}
            </List>
        </Fragment>
    );
});

export default TodoList;
