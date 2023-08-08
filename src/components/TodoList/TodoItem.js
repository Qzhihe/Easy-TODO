import { Fragment, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    // faCircleCheck,
    // faChevronDown,
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import { Card } from "@mui/material";

import { getCalendarDate } from "../../utils/date";
import { getPriorityProp } from "../../utils/priority";

import "./index.css";

const TodoItem = (props) => {
    const { data, handleSelectTodo } = props;

    const todoProps = useRef(["priority", "date", "alarm", "category"]);

    const todo = data;

    function handleClick(todo) {
        handleSelectTodo(todo);
    }

    return (
        <Fragment>
            <Card
                component="li"
                className="todo_item"
                onClick={() => handleClick(todo)}
                style={{
                    backgroundColor: '',
                }}
            >
                <FontAwesomeIcon
                    size="lg"
                    icon={faCircleNotch}
                    color="rgb(255, 128, 0)"
                    onClick={() => {}}
                />

                <div>
                    <p>{todo.title}</p>
                    <ul className="todo_item_props">
                        <li>
                            <p className="todo_item_prop">任务</p>
                        </li>
                        {todoProps.current.map((prop, idx) => {
                            return (
                                !!todo[prop] && (
                                    <li key={idx}>
                                        <TodoItemProp
                                            data={{ prop, val: todo[prop] }}
                                        />
                                    </li>
                                )
                            );
                        })}
                    </ul>
                </div>
            </Card>
        </Fragment>
    );
};

export default TodoItem;

const TodoItemProp = ({ data }) => {
    const { prop, val } = data;

    let className = "",
        children = null;

    switch (prop) {
        case "priority":
            className = `priority priority-${val}`;
            children = getPriorityProp(val, "title");
            break;
        case "date":
            const date = getCalendarDate(val);
            children = date;
            break;
        case "alarm":
            break;
        case "category":
            break;
        default:
            break;
    }

    return <p className={`todo_item_prop ${className}`}>{children}</p>;
};
