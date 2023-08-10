import { sendRequest } from "../utils/request";

export const doLogin = async (username, password) => {
    const result = await sendRequest({
        method: "POST",
        url: "/user/login",
        data: {
            username,
            password,
        },
    });

    return result;
};

export const doLogout = async() => {
    let token = localStorage.getItem('authToken');
    const result = await sendRequest({
        method: 'POST',
        url: '/user/logout',
        headers: {'X-Token': token,}
    });

    return result;
};
