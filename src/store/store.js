import { useState, createContext } from "react";

const initialStore = {
    todoList: [
        {
            id: "1",
            title: "回顾八股",
            type: "任务",
            isDone: false,
        },
        {
            id: "2",
            title: "睡午觉",
            type: "任务",
            isDone: true,
        },
    ],
};

const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(initialStore);

    return (
        <StoreContext.Provider value={{ store, setStore }}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext };
export default StoreProvider;
