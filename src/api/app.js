import { sendRequest } from "../utils/request";

export const doSignup = async (data) => {
    const result = await sendRequest({
        method: "POST",
        url: "/user/register",
        data: data,
    });
    console.log(result);
    return result;
};

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

export const doLogout = async () => {
    let token = localStorage.getItem("authToken");
    const result = await sendRequest({
        method: "POST",
        url: "/user/logout",
        headers: { "X-Token": token },
    });

    return result;
};

export const getUserInfo = async () => {
    let token = localStorage.getItem("authToken");
    const params = {
        token: token,
    };
    const result = await sendRequest({
        method: "GET",
        url: `user/info`,
        params: params,
    });
    return result;
};
