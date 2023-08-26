import { Card } from "@mui/material";
import { StoreContext } from "../../store/store";
import TodoList from "../../components/TodoList";
import { sendRequest } from "../../utils/request";
import { Fragment, useRef, useContext } from "react";
import { getPriorityProp } from "../../utils/priority";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faPlus } from "@fortawesome/free-solid-svg-icons";

const Quadrant = (props) => {
    const { priority, data } = props;

    const { store, setStore } = useContext(StoreContext);

    const titleMapping = useRef(
        new Map([
            [0, "不重要不紧急"],
            [1, "不重要但紧急"],
            [2, "重要不紧急"],
            [3, "重要且紧急"],
        ])
    );

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
                        <p className={`text-priority-${priority} grow`}>
                            {title}
                        </p>
                        <FontAwesomeIcon
                            className={`text-priority-${priority} cursor-pointer shrink`}
                            size="lg"
                            icon={faPlus}
                        />
                    </div>

                    <div className="flex flex-col h-full overflow-auto">
                        {data.length === 0 ? (
                            <p className="m-auto text-zinc-400">没有任务</p>
                        ) : (
                            <TodoList data={data} onHandleCplt={handleCplt} />
                        )}
                    </div>
                </div>
            </Card>

            {/* <Menu>
                
            </Menu> */}
        </Fragment>
    );
};

export default Quadrant;
