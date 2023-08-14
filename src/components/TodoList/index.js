import { Fragment, memo } from "react";

import { List } from "@mui/material";

import TodoItem from "./TodoItem";

const TodoList = memo((props) => {
    const { data, onHandleSelectTodo, onHandleCplt } = props;

    return (
        <Fragment>
            <List
                disablePadding
                sx={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    gap: "0.5rem 0",
                    width: "100%",
                }}
            >
                {data.map(item => {
                    return (
                        <Fragment key={item?.id}>
                            <TodoItem
                                data={item}
                                onHandleSelectTodo={onHandleSelectTodo}
                                onHandleCplt={onHandleCplt}
                            />
                        </Fragment>
                    );
                })}
            </List>
        </Fragment>
    );
});

export default TodoList;
