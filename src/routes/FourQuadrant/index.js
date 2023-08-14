import { StoreContext } from "../../store/store";
import { Card, Typography } from "@mui/material";
import TodoList from "../../components/TodoList";
import { Fragment, useRef, useContext } from "react";
import { getPriorityProp } from "../../utils/priority";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendRequest } from "../../utils/request";

const FourQuadrant = () => {
    const { store, setStore } = useContext(StoreContext);

    const { todoList } = store;

    function getTodosByPriority(priority) {
        if (todoList.length === 0) {
            return [];
        }

        return todoList.filter(
            (item) => !item.isDone && item.priority === priority
        );
    }

    return (
        <Fragment>
            <div className="grid grid-rows-2 grid-cols-2 place-items-center gap-4 p-6 overflow-hidden h-full">
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
    const { store, setStore } = useContext(StoreContext);
    const todoList = store.todoList;

    async function handleCplt(todo) {
        const { date, id, ...others } = todo;
        const payload = {
            ...others,
            scheId: id,
            sTime: date && date.toJSON(),
        };
        try {
            const data = await sendRequest({
                method: "PUT",
                url: "/schedule",
                data: payload,
            });
            if (data.code === 20000) {
                const updatedTodoList = todoList.reduce((prev, cur) => {
                    if (cur.id === todo.id) {
                        prev.push(todo);
                    } else {
                        prev.push(cur);
                    }
                    return prev;
                }, []);
                setStore((prev) => ({ ...prev, todoList: updatedTodoList }));
            }
        } catch (err) {
            console.error(err);
        }
    }

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
            <Card
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div className="flex flex-col gap-4 w-full p-4 bg-[#fafafa]">
                    <div className="flex items-center gap-4 h-5">
                        <FontAwesomeIcon icon={faFlag} color={color} />
                        <Typography sx={{ color: color }}>{title}</Typography>
                    </div>

                    <div className="flex flex-col h-full overflow-hidden">
                        {data.length === 0 ? (
                            <p className="m-auto text-zinc-400">没有任务</p>
                        ) : (
                            <TodoList data={data} onHandleCplt={handleCplt} />
                        )}
                    </div>
                </div>
            </Card>
        </Fragment>
    );
};
