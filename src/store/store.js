import { useState, createContext } from "react";

const initialStore = {
    todoList: [
        {
            id: "1",
            title: "回顾八股",
            type: "1",
            msg: "随便一看吧",
            state: "0",
        },
        {
            id: "2",
            title: "准备下午五点面试",
            type: "2",
            msg: "555",
            state: "0",
        },
        {
            id: "3",
            title: "今晚吃啥？",
            type: "3",
            msg: "好想嗦粉",
            state: "0",
        },
        {
            id: "4",
            title: "刷算法题",
            type: "3",
            msg: "二叉树+DFS，难死我了",
            state: "1",
        },
        {
            id: "5",
            title: "做项目",
            type: "1",
            msg: "全部改成function格式，哭哭",
            state: "1",
        },
        {
            id: "6",
            title: "买饭",
            type: "2",
            msg: "今天中午吃烤肉饭外卖咯！",
            state: "1",
        },
        {
            id: "7",
            title: "可恶被这么多人围观就跟动物园的猴子一样",
            type: "3",
            msg: "还有两袋猫粮",
            state: "0",
        },
        {
            id: "8",
            title: "真离谱",
            type: "1",
            msg: "啊啊啊啊啊啊",
            state: "0",
        },
        {
            id: "9",
            title: "太搞笑了",
            type: "2",
            msg: "杀杀杀！",
            state: "0",
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
