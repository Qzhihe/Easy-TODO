import Quadrant from "./Quadrant";
import { Fragment, useContext } from "react";
import { StoreContext } from "../../store/store";

const FourQuadrant = () => {
    const { store } = useContext(StoreContext);

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
