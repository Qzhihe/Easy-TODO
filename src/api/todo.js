import dayjs from "dayjs";

import { sendRequest } from "../utils/request";

// export const getTodoList = async () => {
//     let token = localStorage.getItem("authToken");
//     const params = {
//         'token': token,
//     };

//     try {
//         const result = await sendRequest({
//             method: "GET",
//             url: "/schedule/info",
//             params: params,
//         });
//         console.log(result);

//         return result.data.schedule.map((todo) => formatTodoFromResponce(todo));
//     } catch (err) {
//         throw err;
//     }
// };

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
    const { id, date, alarm, ...others } = todo;

    return {
        ...others,
        scheId: id,
        sTime: date && date.toJSON(),
        alarm: alarm && alarm.toJSON(),
        userId: localStorage.getItem('userId')
    };
};

const formatTodoFromResponce = (todo) => {
    const { userId, scheId, sTime, eTime, alarm, ...others } = todo;

    return {
        id: scheId,
        date: sTime && dayjs(sTime).locale("zh-cn"),
        alarm: alarm && dayjs(alarm).locale("zh-cn"),
        ...others,
    };
};
