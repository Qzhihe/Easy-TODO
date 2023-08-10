import dayjs from "dayjs";

import { sendRequest } from "../utils/request";

export const getTodoList = async () => {
    try {
        const result = await sendRequest({
            method: "GET",
            url: "/schedule/all",
        });

        return result.data.map((todo) => formatTodoFromResponce(todo));
    } catch (err) {
        throw err;
    }
};

export const addTodo = async (todo) => {
    try {
        const result = await sendRequest({
            method: "POST",
            url: "/schedule",
            data: formatTodoForRequest(todo),
            // headers: {
            //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            // },
        });

        return result;
    } catch (err) {
        throw err;
    }
};

export const updateTodo = async (todo) => {
    try {
        const result = await sendRequest({
            method: "PUT",
            url: "/schedule",
            data: formatTodoForRequest(todo),
        });

        return result.code === 20000;
    } catch (err) {
        throw err;
    }
};

export const deleteTodo = async (todo) => {
    try {
        const result = await sendRequest({
            method: "DELETE",
            url: `/schedule/${todo.id}`,
        });

        return result.code === 20000;
    } catch (err) {
        throw err;
    }
};

const formatTodoForRequest = (todo) => {
    const { id, date, ...others } = todo;

    return {
        ...others,
        scheId: id,
        sTime: date && date.toJSON(),
    };
};

const formatTodoFromResponce = (todo) => {
    const { userId, scheId, sTime, eTime, ...others } = todo;

    return {
        id: todo.scheId,
        date: todo.sTime && dayjs(todo.sTime).locale("zh-cn"),
        ...others,
    };
};
