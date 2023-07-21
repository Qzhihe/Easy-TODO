import { Fragment, memo, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faCircleCheck,
    faCircleNotch,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import { Card, CardContent, Typography } from "@mui/material";

import { StoreContext } from "../../store/store";

const TodoItem = memo((props) => {
    // 日程信息列表
    const { store, setStore } = useContext(StoreContext);

    const { todoList } = store;

    useEffect(() => {
        console.log('index.js变了');
    });

    // 完成日程
    function handleComplete(id) {
        console.log(id + "这条日程要完成了，该发请求了");
        const taskIndex = todoList.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
            const updatedList = [...todoList];
            updatedList[taskIndex].state = "1";

            setStore((prev) => ({ ...prev, todoList: updatedList }));
        }
    }

    const todo = todoList
        .filter((item) => {
            return item.state === "0";
        })
        .map((item) => {
            let type =
                item.type === "1"
                    ? "很重要"
                    : item.type === "2"
                    ? "重要"
                    : "一般";
            return (
                <Card
                    key={item.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "4rem",
                        padding: "0 24px",
                        margin: "20px 0",
                        userSelect: "none",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCircleNotch}
                        size="lg"
                        style={{
                            color: "rgb(255, 128, 0)",
                            cursor: "pointer",
                        }}
                        onClick={() => handleComplete(item.id)}
                    />
                    <CardContent>
                        <Typography>{item.title}</Typography>
                        <Typography
                            sx={{ fontSize: "12px" }}
                            color="text.secondary"
                        >
                            🔔今天 · {type} · {item.msg}
                        </Typography>
                    </CardContent>
                </Card>
            );
        });

    const done = todoList
        .filter((item) => {
            return item.state === "1";
        })
        .map((item) => {
            let type =
                item.type === "1"
                    ? "很重要"
                    : item.type === "2"
                    ? "重要"
                    : "一般";
            return (
                <Card
                    key={item.id}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "4rem",
                        padding: "0 24px",
                        margin: "20px 0",
                        userSelect: "none",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        size="lg"
                        style={{
                            color: "rgb(255, 128, 0)",
                        }}
                    />
                    <CardContent>
                        <Typography>{item.title}</Typography>
                        <Typography
                            sx={{ fontSize: "12px" }}
                            color="text.secondary"
                        >
                            🔔今天 · {type} · {item.msg}
                        </Typography>
                    </CardContent>
                </Card>
            );
        });

    return (
        <Fragment>
            <FontAwesomeIcon icon={faChevronDown} size="lg" />
            &nbsp;&nbsp;待完成&nbsp;&nbsp;{todo.length}&nbsp;&nbsp;&nbsp;&nbsp;
            {todo}
            <FontAwesomeIcon icon={faChevronDown} size="lg" />
            &nbsp;&nbsp;已完成&nbsp;&nbsp;{done.length}&nbsp;&nbsp;&nbsp;&nbsp;
            {done}
        </Fragment>
    );
});
export default TodoItem;
