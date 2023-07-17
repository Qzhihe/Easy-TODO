import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleNotch,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, Typography } from "@mui/material";
import { Fragment } from "react";

const TodoItem = (props) => {
    const todoList = props.todoList;
    console.log(todoList);

    function handleComplete(index) {
        console.log(index+'这条日程要完成了，该发请求了');
    }

    // 日期判断先放在这
    // function formatDate(date) {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, "0");
    //     const day = String(date.getDate()).padStart(2, "0");
    //     return `${year}-${month}-${day}`;
    // }
    // const today = formatDate(new Date());
    // console.log(today);

    const todo = todoList
        .filter((item) => {
            return item.state === "0";
        })
        .map((item, index) => {
            let type =
                item.type === "1"
                    ? "很重要"
                    : item.type === "2"
                    ? "重要"
                    : "一般";
            return (
                <Card
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "4rem",
                        padding: "0 24px",
                        margin: "20px 0",   
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCircleNotch}
                        size="lg"
                        style={{
                            color: "rgb(255, 128, 0)",
                        }}
                        onClick={() => handleComplete(index)}
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
        .map((item, index) => {
            let type =
                item.type === "1"
                    ? "很重要"
                    : item.type === "2"
                    ? "重要"
                    : "一般";
            return (
                <Card
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "4rem",
                        padding: "0 24px",
                        margin: "20px 0",
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
            <FontAwesomeIcon
                icon={faChevronDown}
                size="lg"
            />&nbsp;&nbsp;待完成&nbsp;&nbsp;{todo.length}
            {todo}
            <FontAwesomeIcon
                icon={faChevronDown}
                size="lg"
            />&nbsp;&nbsp;已完成&nbsp;&nbsp;{done.length}
            {done}
        </Fragment>
    );
};
export default TodoItem;
