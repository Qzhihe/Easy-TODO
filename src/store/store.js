import { useState, createContext } from "react";

const initialStore = {
    todoList: [],
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
